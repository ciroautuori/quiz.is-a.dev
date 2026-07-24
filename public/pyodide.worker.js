// Pyodide Web Worker - Dedicated isolated thread execution
self.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/';
importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodideReadyPromise = null;

async function loadPyodideEngine() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = self.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    });
  }
  return await pyodideReadyPromise;
}

self.onmessage = async (event) => {
  const { id, code, type } = event.data;

  if (type === 'RUN_PYTHON') {
    try {
      const pyodide = await loadPyodideEngine();

      // Capture stdout
      let stdoutBuffer = [];
      pyodide.setStdout({
        batched: (str) => {
          stdoutBuffer.push(str);
        }
      });

      const startTime = performance.now();
      const result = await pyodide.runPythonAsync(code);
      const endTime = performance.now();

      const output = stdoutBuffer.join('\n') || (result !== undefined && result !== null ? String(result) : '');

      self.postMessage({
        id,
        success: true,
        output,
        executionTimeMs: Math.round(endTime - startTime)
      });
    } catch (err) {
      self.postMessage({
        id,
        success: false,
        output: '',
        error: err.message || String(err),
        executionTimeMs: 0
      });
    }
  }
};
