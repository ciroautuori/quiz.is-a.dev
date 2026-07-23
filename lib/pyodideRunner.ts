export interface RunResult {
    output: string;
    error?: string;
    durationMs: number;
    memoryEstimation: number;
}

let pyodideInstance: any = null;

export async function getPyodide(): Promise<any> {
    if (!pyodideInstance && typeof window !== 'undefined' && (window as any).loadPyodide) {
        pyodideInstance = await (window as any).loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" });
    }
    return pyodideInstance;
}

export async function runPythonCode(code: string): Promise<RunResult> {
    const start = performance.now();
    let output = '';
    let error: string | undefined = undefined;
    try {
        const pyodide = await getPyodide();
        if (pyodide) {
            pyodide.setStdout({ batched: (msg: string) => output += msg + '\n' });
            pyodide.setStderr({ batched: (msg: string) => error = (error || '') + msg + '\n' });
            await pyodide.runPythonAsync(code);
        } else {
            output = "Pyodide mock output\n";
        }
    } catch (err: any) {
        error = err.message || String(err);
    }
    return { output, error, durationMs: performance.now() - start, memoryEstimation: code.length * 2 };
}
