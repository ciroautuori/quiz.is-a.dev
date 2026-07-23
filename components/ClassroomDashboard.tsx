'use client';

import React, { useState } from 'react';
import { Users, BookOpen, BarChart3, Download } from 'lucide-react';

const MOCK_STUDENTS = [
  { id: 1, name: 'Alice Smith', progress: 85, assignments: 12, grade: 'A' },
  { id: 2, name: 'Bob Johnson', progress: 42, assignments: 5, grade: 'C' },
  { id: 3, name: 'Charlie Davis', progress: 100, assignments: 15, grade: 'A+' },
];

export default function ClassroomDashboard() {
  const [students] = useState(MOCK_STUDENTS);

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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Classroom Portal</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Avg Progress</p>
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
              <p className="text-sm text-gray-500">Assignments</p>
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
              <th className="p-4">Student</th>
              <th className="p-4">Progress Heatmap</th>
              <th className="p-4">Assignments</th>
              <th className="p-4">Grade</th>
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
