import React, { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { navItems } from './navItems.js';
import { docsData } from './docsData.js';
import Sidebar from './Sidebar.jsx';
import Home from './Home.jsx';
import DocPage from './DocPage.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return docsData
      .filter((doc) => {
        const inTitle = doc.title?.toLowerCase().includes(q);
        const inDesc = doc.description?.toLowerCase().includes(q);
        const inSections = doc.sections?.some(
          (s) =>
            s.heading?.toLowerCase().includes(q) ||
            s.content?.toLowerCase().includes(q)
        );
        return inTitle || inDesc || inSections;
      })
      .map(({ id, title, category }) => ({ id, title, category }));
  }, [searchQuery]);

  const fallbackPath = navItems[0]?.path || '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto flex gap-6 px-4 lg:px-8 py-8">
        <Sidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="flex-1">
          <div className="bg-white/95 shadow-sm ring-1 ring-slate-200 rounded-xl">
            <div className="px-6 sm:px-8 py-8 space-y-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      searchQuery={searchQuery}
                      searchResults={searchResults}
                    />
                  }
                />
                <Route path="/docs/:id" element={<DocPage />} />
                <Route path="*" element={<Navigate to={fallbackPath} replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
