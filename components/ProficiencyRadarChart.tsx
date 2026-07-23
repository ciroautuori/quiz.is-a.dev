'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllQuestions } from '../lib/questions';
import { getCompletedQuestionIds } from '../lib/storage';
import { useLanguage } from '../lib/LanguageContext';
import { Award, Zap, Code2, Terminal, GitBranch, Sparkles } from 'lucide-react';

interface ProficiencyRadarChartProps {
  completedQuestionIds?: string[];
}

export default function ProficiencyRadarChart({ completedQuestionIds }: ProficiencyRadarChartProps) {
  const { t } = useLanguage();

  const trackStats = useMemo(() => {
    const ids = completedQuestionIds || (typeof window !== 'undefined' ? getCompletedQuestionIds() : []);
    const all = getAllQuestions();

    const pythonTotal = all.filter(q => (q.trackId || 'python') === 'python').length || 1;
    const pythonCompleted = all.filter(q => (q.trackId || 'python') === 'python' && ids.includes(q.id)).length;

    const tsTotal = all.filter(q => q.trackId === 'typescript').length || 1;
    const tsCompleted = all.filter(q => q.trackId === 'typescript' && ids.includes(q.id)).length;

    const gitTotal = all.filter(q => q.trackId === 'git').length || 1;
    const gitCompleted = all.filter(q => q.trackId === 'git' && ids.includes(q.id)).length;

    // Minimum visual score of 10% so the radar polygon is always nicely visible
    const pythonPct = Math.max(10, Math.round((pythonCompleted / pythonTotal) * 100));
    const tsPct = Math.max(10, Math.round((tsCompleted / tsTotal) * 100));
    const gitPct = Math.max(10, Math.round((gitCompleted / gitTotal) * 100));

    return [
      {
        id: 'python',
        name: 'Python',
        icon: Code2,
        color: 'var(--ctp-mauve)',
        colorRgb: '203, 166, 247',
        pct: pythonPct,
        completed: pythonCompleted,
        total: pythonTotal,
        angle: -90, // Top vertex
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: Terminal,
        color: 'var(--ctp-blue)',
        colorRgb: '137, 180, 250',
        pct: tsPct,
        completed: tsCompleted,
        total: tsTotal,
        angle: 30, // Bottom right vertex
      },
      {
        id: 'git',
        name: 'Git & GitHub',
        icon: GitBranch,
        color: 'var(--ctp-peach)',
        colorRgb: '250, 179, 135',
        pct: gitPct,
        completed: gitCompleted,
        total: gitTotal,
        angle: 150, // Bottom left vertex
      },
    ];
  }, [completedQuestionIds]);

  // Geometry calculations for 3-axis Radar Chart
  const size = 300;
  const center = size / 2;
  const radius = 100;

  const polarToCartesian = (angleInDegrees: number, r: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  // Concentric grid polygon points (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map(level => {
    return trackStats.map(stat => {
      const { x, y } = polarToCartesian(stat.angle, radius * level);
      return `${x},${y}`;
    }).join(' ');
  });

  // User Proficiency polygon points based on percentages
  const userPointsArray = trackStats.map(stat => {
    const r = radius * (stat.pct / 100);
    return polarToCartesian(stat.angle, r);
  });

  const userPolygonString = userPointsArray.map(pt => `${pt.x},${pt.y}`).join(' ');

  // Level status helper
  const getLevelTitle = (pct: number) => {
    if (pct >= 90) return { title: t.levelMaster, badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (pct >= 60) return { title: t.levelSenior, badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    if (pct >= 30) return { title: t.levelIntermediate, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
    return { title: t.levelNovice, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  };

  return (
    <div className="ctp-card border rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
              {t.radarTitle}
            </h3>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              {t.radarSubtitle}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border-[var(--ctp-surface1)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.radarCompetency}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radar Chart SVG Area */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative py-2">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] h-auto drop-shadow-md">
            <defs>
              <linearGradient id="radarFillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cba6f7" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#89b4fa" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#fab387" stopOpacity="0.35" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid Circles & Concentric Polygons */}
            {gridPolygons.map((pts, idx) => (
              <polygon
                key={idx}
                points={pts}
                fill="none"
                stroke="var(--ctp-surface1)"
                strokeWidth="1.2"
                strokeDasharray={idx < 3 ? "3 3" : "none"}
              />
            ))}

            {/* Axis Lines from center */}
            {trackStats.map((stat, idx) => {
              const outer = polarToCartesian(stat.angle, radius);
              return (
                <line
                  key={idx}
                  x1={center}
                  y1={center}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="var(--ctp-surface2)"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Filled User Polygon with Framer Motion entry animation */}
            <motion.polygon
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              points={userPolygonString}
              fill="url(#radarFillGradient)"
              stroke="var(--ctp-mauve)"
              strokeWidth="2.5"
              filter="url(#glow)"
            />

            {/* Data Vertex Points and Glowing Nodes */}
            {userPointsArray.map((pt, idx) => {
              const stat = trackStats[idx];
              return (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="6"
                    fill={stat.color}
                    stroke="var(--ctp-base)"
                    strokeWidth="2"
                    className="transition-all hover:scale-125 cursor-pointer"
                  />
                  {/* Inner pulse */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="10"
                    fill={stat.color}
                    opacity="0.25"
                    className="animate-ping"
                  />
                </g>
              );
            })}

            {/* Vertex Labels & Icons */}
            {trackStats.map((stat, idx) => {
              const labelPos = polarToCartesian(stat.angle, radius + 28);
              return (
                <text
                  key={idx}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--ctp-text)"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {stat.name} ({stat.pct}%)
                </text>
              );
            })}
          </svg>
        </div>

        {/* Detailed Stats Breakdown Side */}
        <div className="md:col-span-6 space-y-3">
          {trackStats.map((stat) => {
            const Icon = stat.icon;
            const levelInfo = getLevelTitle(stat.pct);

            return (
              <div
                key={stat.id}
                className="p-3.5 rounded-xl border ctp-card-mantle flex flex-col gap-2 transition-all hover:border-[var(--ctp-surface2)]"
                style={{ borderColor: 'var(--ctp-border)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `rgba(${stat.colorRgb}, 0.15)`, color: stat.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                        {stat.name}
                      </span>
                      <span className="text-[10px] block" style={{ color: 'var(--ctp-subtext0)' }}>
                        {stat.completed} / {stat.total} {t.question}s
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${levelInfo.badgeColor}`}>
                      {levelInfo.title}
                    </span>
                    <span className="text-xs font-bold font-mono" style={{ color: stat.color }}>
                      {stat.pct}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--ctp-surface0)] border border-[var(--ctp-surface1)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
