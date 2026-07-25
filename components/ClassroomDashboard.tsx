'use client';

import React, { useState, useEffect } from 'react';
import { Users, BookOpen, BarChart3, Download } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface StudentData {
  id: string;
  name: string;
  progress: number;
  assignments: number;
  grade: string;
}

// Converte un punteggio in lettera voto
function scoreToGrade(score: number): string {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

export default function ClassroomDashboard() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const q = query(collection(db, 'leaderboard'), orderBy('punteggio', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const data: StudentData[] = snapshot.docs.map((doc, idx) => {
          const d = doc.data();
          const punteggio = (d.punteggio as number) || 0;
          const accuratezza = (d.accuratezza as number) || 0;
          const nome = (d.nome as string) || (d.nome as string) || `Student ${idx + 1}`;
          return {
            id: doc.id,
            name: nome,
            progress: Math.round(accuratezza),
            assignments: Math.floor(punteggio / 100),
            grade: scoreToGrade(accuratezza),
          };
        });
        setStudents(data);
      } catch (err) {
        setError('Unable to load classroom data');
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Progress (%)', 'Assignments', 'Grade'];
    const csvContent = [
      headers.join(','),
      ...students.map(s => [s.id, s.name, s.progress, s.assignments, s.grade].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'classroom_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl shadow border h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t.noStudents || 'No students enrolled yet'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.classroomTitle}</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" /> {t.exportCsv}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">{t.totalStudents}</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">{t.avgProgress}</p>
              <p className="text-2xl font-bold">
                {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">{t.assignments}</p>
              <p className="text-2xl font-bold">
                {students.reduce((acc, s) => acc + s.assignments, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm font-semibold text-gray-700">
              <th className="p-4">{t.student}</th>
              <th className="p-4">{t.progressHeatmap}</th>
              <th className="p-4">{t.assignments}</th>
              <th className="p-4">{t.grade}</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{student.name}</td>
                <td className="p-4 w-1/3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${student.progress > 80 ? 'bg-green-500' : student.progress > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{student.assignments}</td>
                <td className="p-4 font-bold text-gray-900">{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
