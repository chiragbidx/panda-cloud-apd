// Dev-only Next.js HMR + runtime error bridge → Bubble
// Calls Bubble JS-to-Bubble function: window.error(...)

type DevErrorPayload = {
  kind: 'runtime' | 'promise' | 'hmr';
  message: string;
  stack?: string;
  module?: string;
  file?: string;
  line?: number;
  column?: number;
  raw?: unknown;
};

function sendToBubble(payload: DevErrorPayload) {
  if (typeof window === 'undefined') return;

  const bubbleFn = (window as any).error;
  if (typeof bubbleFn !== 'function') return;

  bubbleFn(
    payload.kind,
    payload.message,
    payload.stack ?? '',
    payload.module ?? '',
    payload.file ?? '',
    payload.line ?? 0,
    payload.column ?? 0,
    payload.raw ? JSON.stringify(payload.raw).slice(0, 5000) : ''
  );
  void fetch(
    'https://buildx-53025.bubbleapps.io/version-test/api/1.1/wf/error/initialize',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  ).catch(() => {
    // ignore network hiccups for the dev bridge
  });
}

export function initDevErrorBridge() {
  if (process.env.NODE_ENV !== 'production') return;
  if ((window as any).__DEV_ERROR_BRIDGE_INIT__) return;
  (window as any).__DEV_ERROR_BRIDGE_INIT__ = true;

  window.addEventListener('error', (event) => {
    sendToBubble({
      kind: 'runtime',
      message: event.message,
      file: event.filename,
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason =
      typeof event.reason === 'string'
        ? event.reason
        : event.reason?.message || 'Unhandled promise rejection';

    sendToBubble({
      kind: 'promise',
      message: reason,
      stack: event.reason?.stack,
      raw: event.reason
    });
  });

  const OriginalWebSocket = window.WebSocket;

  window.WebSocket = function (url: string | URL, protocols?: string | string[]) {
    const ws = protocols
      ? new OriginalWebSocket(url, protocols)
      : new OriginalWebSocket(url);

    ws.addEventListener('message', (event) => {
      if (typeof event.data !== 'string') return;

      try {
        const data = JSON.parse(event.data);

        if (
          data?.action === 'error' ||
          data?.type === 'error' ||
          data?.type === 'webpackErrors'
        ) {
          sendToBubble({
            kind: 'hmr',
            message: data.message || 'HMR error',
            module: data.moduleName,
            stack: data.stack,
            raw: data
          });
        }
      } catch {
        // non-JSON HMR frames — ignore
      }
    });

    return ws;
  } as any;
}
