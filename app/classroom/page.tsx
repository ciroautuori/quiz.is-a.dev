'use client';

import React from 'react';
import ClassroomDashboard from '../../components/ClassroomDashboard';
import { LanguageProvider } from '../../lib/LanguageContext';

export default function ClassroomPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 py-8">
        <ClassroomDashboard />
      </div>
    </LanguageProvider>
  );
}
