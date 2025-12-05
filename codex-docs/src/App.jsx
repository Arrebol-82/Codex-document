import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { navItems } from './navItems.js';
import { docsData } from './docsData.js';
import Sidebar from './Sidebar.jsx';
import Home from './Home.jsx';
import DocPage from './DocPage.jsx';
import SearchBar from './SearchBar.jsx';
import MobileNav from './MobileNav.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  const headerRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setIsHeaderStuck(rect.top <= 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <header
          ref={headerRef}
          className={[
            'lg:hidden sticky top-0 z-30 rounded-xl px-3 py-3 border transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out',
            isHeaderStuck
              ? 'bg-white/95 backdrop-blur border-slate-200/80 shadow-sm'
              : 'bg-transparent border-transparent shadow-none backdrop-blur-0 space-y-3',
          ].join(' ')}
        >
          {isHeaderStuck ? (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} sticky />
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.97] transition-transform duration-300 ease-out"
                aria-label="展开目录"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 12h14M5 17h14" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                  Codex FAQ
                </div>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.97] transition"
                  aria-label="展开目录"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 12h14M5 17h14" />
                  </svg>
                </button>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </>
          )}
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <main className="flex-1">
            <div className="bg-white/95 shadow-sm ring-1 ring-slate-200 rounded-xl">
              <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
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
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
}

export default App;
