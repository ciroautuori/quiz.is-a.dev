'use client';

import React from 'react';
import { Terminal, Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: 'python' | 'typescript' | 'bash' | 'sql' | 'dockerfile';
}

export default function CodeBlock({ code, title, language = 'python' }: CodeBlockProps) {
  const { syntaxTheme, toggleSyntaxTheme } = useTheme();

  if (!code || !code.trim()) return null;

  const isMocha = syntaxTheme === 'mocha';

  // Syntax highlighter for tokens using centralized Catppuccin CSS Variables
  const highlightCode = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Comments
      if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
        return (
          <span key={lIdx} className="comment">
            {line}{'\n'}
          </span>
        );
      }

      // Tokenize
      const tokens = line.split(/(\s+|[()[\]{},.:=+*-/\\]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g);
      
      const renderedTokens = tokens.map((token, tIdx) => {
        if (!token) return null;

        // Strings
        if (
          (token.startsWith('"') && token.endsWith('"')) || 
          (token.startsWith("'") && token.endsWith("'")) ||
          (token.startsWith("`") && token.endsWith("`"))
        ) {
          return (
            <span key={tIdx} className="string">
              {token}
            </span>
          );
        }

        // Language-dependent Keywords
        const pythonKeywords = [
          'def', 'return', 'if', 'else', 'elif', 'while', 'for', 'in', 
          'break', 'continue', 'pass', 'class', 'import', 'from', 'as', 
          'True', 'False', 'None', 'and', 'or', 'not', 'is', 'try', 'except', 'raise'
        ];

        const tsKeywords = [
          'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'in', 'of',
          'interface', 'type', 'readonly', 'export', 'import', 'from', 'as', 'extends', 'implements',
          'enum', 'class', 'new', 'typeof', 'instanceof', 'try', 'catch', 'throw', 'async', 'await',
          'true', 'false', 'null', 'undefined'
        ];

        const bashKeywords = [
          'git', 'init', 'add', 'commit', 'push', 'pull', 'branch', 'checkout', 'switch',
          'merge', 'rebase', 'stash', 'reset', 'revert', 'remote', 'status', 'log', 'diff',
          'cherry-pick', 'fetch', 'clone', 'origin', 'main', 'master'
        ];

        const keywords = language === 'typescript' ? tsKeywords : language === 'bash' ? bashKeywords : pythonKeywords;

        if (keywords.includes(token)) {
          return (
            <span key={tIdx} className="keyword">
              {token}
            </span>
          );
        }

        // Language-dependent Builtins / Types
        const pythonBuiltins = [
          'print', 'type', 'len', 'range', 'int', 'str', 'float', 'bool', 
          'list', 'dict', 'tuple', 'set', 'isinstance', 'super', 'append', 
          'remove', 'pop', 'get'
        ];

        const tsBuiltins = [
          'string', 'number', 'boolean', 'any', 'unknown', 'never', 'void',
          'Array', 'Record', 'Partial', 'Readonly', 'Pick', 'Omit', 'Promise',
          'console', 'log', 'JSON', 'parse', 'stringify', 'Math', 'Object'
        ];

        const bashBuiltins = [
          '-m', '-u', '-b', '-c', '-a', '-f', '--oneline', '--staged', '--hard', 'HEAD', 'HEAD~1'
        ];

        const builtins = language === 'typescript' ? tsBuiltins : language === 'bash' ? bashBuiltins : pythonBuiltins;

        if (builtins.includes(token)) {
          return (
            <span key={tIdx} className="builtin">
              {token}
            </span>
          );
        }

        // Numbers
        if (/^\d+(\.\d+)?$/.test(token)) {
          return (
            <span key={tIdx} className="number">
              {token}
            </span>
          );
        }

        return token;
      });

      return <span key={lIdx}>{renderedTokens}{'\n'}</span>;
    });
  };

  const badgeText = language === 'typescript' ? 'ts' : language === 'bash' ? 'git' : 'py';

  return (
    <div className="my-3 rounded-xl overflow-hidden border shadow-lg python-code-box transition-all duration-200">
      <div className="flex items-center justify-between px-3.5 py-2 border-b text-xs font-mono python-code-header transition-all duration-200">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--ctp-mauve)]" />
          <span className="font-semibold text-[var(--ctp-text)]">{title || `${language} snippet`}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dynamic Toggle button between Catppuccin Mocha and Catppuccin Latte */}
          <button
            onClick={toggleSyntaxTheme}
            type="button"
            title={`Passa a Catppuccin ${isMocha ? 'Latte (Chiaro)' : 'Mocha (Scuro)'}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border shadow-sm python-code-pill cursor-pointer"
          >
            {isMocha ? (
              <>
                <Moon className="w-3 h-3 text-[var(--ctp-mauve)]" />
                <span className="font-mono">Catppuccin Mocha</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-[var(--ctp-peach)]" />
                <span className="font-mono">Catppuccin Latte</span>
              </>
            )}
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-mono python-code-pill">
            {badgeText}
          </span>
        </div>
      </div>

      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed python-code selection:bg-[var(--ctp-surface1)]">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}

