'use client';

export interface PyodideWorkerResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
}

let workerInstance: Worker | null = null;
let msgIdCounter = 0;
const pendingCallbacks = new Map<number, (res: PyodideWorkerResult) => void>();

function getWorker(): Worker | null {
  if (typeof window === 'undefined') return null;

  if (!workerInstance) {
    try {
      workerInstance = new Worker('/pyodide.worker.js');
      workerInstance.onmessage = (event) => {
        const { id, success, output, error, executionTimeMs } = event.data;
        const callback = pendingCallbacks.get(id);
        if (callback) {
          callback({ success, output, error, executionTimeMs });
          pendingCallbacks.delete(id);
        }
      };
    } catch (e) {
      console.warn('Failed to initialize Pyodide Web Worker:', e);
      return null;
    }
  }

  return workerInstance;
}

export function runPythonInWorker(code: string, timeoutMs = 10000): Promise<PyodideWorkerResult> {
  return new Promise((resolve) => {
    const worker = getWorker();

    if (!worker) {
      resolve({
        success: false,
        output: '',
        error: 'Web Workers are not supported in this environment.',
        executionTimeMs: 0
      });
      return;
    }

    const id = ++msgIdCounter;

    // Timeout safety
    const timer = setTimeout(() => {
      if (pendingCallbacks.has(id)) {
        pendingCallbacks.delete(id);
        // Terminate stuck worker and re-create
        if (workerInstance) {
          workerInstance.terminate();
          workerInstance = null;
        }
        resolve({
          success: false,
          output: '',
          error: 'Execution timed out (exceeded 10 seconds limit).',
          executionTimeMs: timeoutMs
        });
      }
    }, timeoutMs);

    pendingCallbacks.set(id, (res) => {
      clearTimeout(timer);
      resolve(res);
    });

    worker.postMessage({
      id,
      type: 'RUN_PYTHON',
      code
    });
  });
}
