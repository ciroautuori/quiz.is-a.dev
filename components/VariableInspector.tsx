'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { runPythonCode } from '../lib/pyodideRunner';
import { 
  Bug, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sliders, 
  Layers, 
  Variable as VariableIcon, 
  Info,
  Maximize2,
  Minimize2,
  X,
  Play
} from 'lucide-react';

interface VariableState {
  name: string;
  type: string;
  value: string;
  previousValue?: string;
  changed?: boolean;
}

interface StepFrame {
  lineIndex: number;
  lineContent: string;
  variables: VariableState[];
  explanation?: string;
}

interface VariableInspectorProps {
  code: string;
  isOpen: boolean;
  onToggle: () => void;
}

// Helper to generate step-by-step frame simulation for a given Python/Code snippet
function parseCodeExecutionSteps(code: string): StepFrame[] {
  const lines = code.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  const steps: StepFrame[] = [];
  const currentVars: Map<string, { value: string; type: string }> = new Map();

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Simple assignment regex parsing (e.g., x = 10, total += i, name = "Python")
    const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(=|\+=|-=|\*=|\/=)\s*(.+)$/);
    
    let explanation = `Esecuzione riga ${idx + 1}`;

    if (assignMatch) {
      const varName = assignMatch[1];
      const op = assignMatch[2];
      const expr = assignMatch[3].split('#')[0].trim();

      let varType = 'int';
      let valStr = expr;

      if (expr.startsWith('[') || expr.startsWith('(')) {
        varType = 'list';
      } else if (expr.startsWith('{')) {
        varType = 'dict';
      } else if (expr.startsWith('"') || expr.startsWith("'")) {
        varType = 'str';
      } else if (expr === 'True' || expr === 'False') {
        varType = 'bool';
      } else if (!isNaN(Number(expr))) {
        varType = Number.isInteger(Number(expr)) ? 'int' : 'float';
      }

      if (op === '+=') {
        explanation = `Incremento della variabile '${varName}' con ${expr}`;
      } else if (op === '=') {
        explanation = `Assegnazione di ${expr} alla variabile '${varName}'`;
      }

      currentVars.set(varName, { value: valStr, type: varType });
    } else if (trimmed.startsWith('for ')) {
      const forMatch = trimmed.match(/for\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+(.+):/);
      if (forMatch) {
        const iterVar = forMatch[1];
        currentVars.set(iterVar, { value: '0', type: 'int' });
        explanation = `Inizio ciclo 'for' iterando con indice '${iterVar}'`;
      }
    } else if (trimmed.startsWith('def ')) {
      const funcMatch = trimmed.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (funcMatch) {
        explanation = `Dichiarazione della funzione '${funcMatch[1]}()'`;
      }
    } else if (trimmed.startsWith('return ')) {
      explanation = `Restituzione del valore: ${trimmed.replace('return ', '')}`;
    }

    // Build frame variables
    const varsArray: VariableState[] = Array.from(currentVars.entries()).map(([name, data]) => {
      const prevStep = steps[steps.length - 1];
      const prevVar = prevStep?.variables.find(v => v.name === name);
      return {
        name,
        type: data.type,
        value: data.value,
        previousValue: prevVar?.value,
        changed: prevVar ? prevVar.value !== data.value : true
      };
    });

    steps.push({
      lineIndex: idx,
      lineContent: line,
      variables: varsArray.length > 0 ? varsArray : [
        { name: 'sys.args', type: 'list', value: '[]' },
        { name: '__name__', type: 'str', value: '"__main__"' }
      ],
      explanation
    });
  });

  return steps;
}

export default function VariableInspector({
  code,
  isOpen,
  onToggle
}: VariableInspectorProps) {
  const steps = useMemo(() => parseCodeExecutionSteps(code), [code]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex] || {
    lineIndex: 0,
    lineContent: code.split('\n')[0] || '',
    variables: [],
    explanation: 'Avvia l\'ispezione riga per riga.'
  };

  const lines = code.split('\n');

  return (
    <div className="mt-4 border border-[var(--ctp-surface1)] rounded-2xl bg-[var(--ctp-mantle)] overflow-hidden shadow-lg transition-all">
      {/* Inspector Header Toggle */}
      <div 
        onClick={onToggle}
        className="p-3 bg-[var(--ctp-surface0)] hover:bg-[var(--ctp-surface1)]/50 cursor-pointer flex items-center justify-between gap-2 border-b border-[var(--ctp-surface1)] transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[var(--ctp-blue)]/15 text-[var(--ctp-blue)] border border-[var(--ctp-blue)]/30">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--ctp-text)] flex items-center gap-1.5">
              Variable Inspector & Debugger Step-by-Step
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--ctp-blue)]/20 text-[var(--ctp-blue)] font-semibold border border-[var(--ctp-blue)]/30">
                Interactive
              </span>
            </span>
            <p className="text-[11px] text-[var(--ctp-subtext0)]">
              Ispeziona lo stato della memoria e delle variabili ad ogni riga di codice
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="p-1.5 text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] rounded-lg hover:bg-[var(--ctp-surface1)] transition-colors"
        >
          {isOpen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Panel Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 space-y-3 font-mono text-xs"
          >
            {/* Step Controls Toolbar */}
            <div className="p-2 rounded-xl bg-[var(--ctp-crust)] border border-[var(--ctp-surface1)] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex(0)}
                  disabled={currentStepIndex === 0}
                  className="p-1.5 rounded-lg bg-[var(--ctp-surface0)] hover:bg-[var(--ctp-surface1)] disabled:opacity-40 text-[var(--ctp-text)] cursor-pointer disabled:cursor-not-allowed transition-colors"
                  title="Reset al primo step"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className="p-1.5 rounded-lg bg-[var(--ctp-surface0)] hover:bg-[var(--ctp-surface1)] disabled:opacity-40 text-[var(--ctp-text)] cursor-pointer disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-[11px]"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Passo Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStepIndex >= steps.length - 1}
                  className="px-2.5 py-1.5 rounded-lg bg-[var(--ctp-mauve)] text-white font-bold hover:opacity-90 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-[11px] shadow-sm"
                >
                  <span>Passo Succ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, steps.length - 1)}
                  value={currentStepIndex}
                  onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
                  className="w-full h-1.5 bg-[var(--ctp-surface1)] rounded-lg appearance-none cursor-pointer accent-[var(--ctp-mauve)]"
                />
                <span className="text-[11px] text-[var(--ctp-overlay0)] font-bold shrink-0">
                  {currentStepIndex + 1}/{Math.max(1, steps.length)}
                </span>
              </div>
            </div>

            {/* Explanation Banner */}
            <div className="p-2.5 rounded-xl bg-[var(--ctp-blue)]/10 border border-[var(--ctp-blue)]/20 text-[var(--ctp-blue)] text-[11px] flex items-center gap-2">
              <Info className="w-4 h-4 text-[var(--ctp-blue)] shrink-0" />
              <span>{currentStep.explanation}</span>
            </div>

            {/* Code stepping view & Variable table split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Code Line Stepper */}
              <div className="p-2.5 rounded-xl bg-[var(--ctp-crust)] border border-[var(--ctp-surface1)] overflow-x-auto space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[var(--ctp-overlay0)] font-bold mb-1.5 flex items-center gap-1">
                  <Play className="w-3 h-3 text-[var(--ctp-mauve)]" />
                  <span>Esecuzione Codice</span>
                </div>
                {lines.map((l, idx) => {
                  const isActive = idx === currentStep.lineIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        const matchedStep = steps.findIndex(s => s.lineIndex === idx);
                        if (matchedStep !== -1) setCurrentStepIndex(matchedStep);
                      }}
                      className={`flex items-start gap-2 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-[var(--ctp-mauve)]/20 border-l-2 border-[var(--ctp-mauve)] text-[var(--ctp-text)] font-bold' 
                          : 'hover:bg-[var(--ctp-surface0)] text-[var(--ctp-subtext0)]'
                      }`}
                    >
                      <span className="text-[10px] text-[var(--ctp-overlay0)] select-none w-5 text-right shrink-0">
                        {idx + 1}
                      </span>
                      <code className="text-[11px] whitespace-pre font-mono leading-relaxed">
                        {l}
                      </code>
                    </div>
                  );
                })}
              </div>

              {/* Memory / Variable Table */}
              <div className="p-2.5 rounded-xl bg-[var(--ctp-crust)] border border-[var(--ctp-surface1)] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--ctp-overlay0)] font-bold mb-2 flex items-center gap-1">
                    <VariableIcon className="w-3 h-3 text-[var(--ctp-green)]" />
                    <span>Ispettore Memoria & Variabili</span>
                  </div>

                  {currentStep.variables.length === 0 ? (
                    <div className="p-4 text-center text-xs text-[var(--ctp-overlay0)] italic">
                      Nessuna variabile allocata a questo punto dell'esecuzione.
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {currentStep.variables.map((v) => (
                        <div
                          key={v.name}
                          className={`p-2 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                            v.changed 
                              ? 'bg-[var(--ctp-green)]/10 border-[var(--ctp-green)]/30 text-[var(--ctp-green)]' 
                              : 'bg-[var(--ctp-surface0)] border-[var(--ctp-surface1)] text-[var(--ctp-text)]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[var(--ctp-mauve)]">{v.name}</span>
                            <span className="px-1.5 py-0.2 text-[9px] rounded bg-[var(--ctp-surface1)] text-[var(--ctp-subtext0)]">
                              {v.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold">
                            {v.changed && v.previousValue && (
                              <span className="line-through opacity-40 text-[10px]">{v.previousValue} →</span>
                            )}
                            <span className="text-[var(--ctp-green)]">{v.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-[var(--ctp-surface1)]/50 text-[10px] text-[var(--ctp-overlay0)] flex items-center justify-between">
                  <span>Scope: <strong className="text-[var(--ctp-subtext0)]">Local / Function</strong></span>
                  <span>Frame Status: <strong className="text-[var(--ctp-green)]">Active</strong></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
