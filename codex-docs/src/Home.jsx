import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './navItems.js';

export default function Home({ searchQuery, searchResults }) {
  const firstDoc = navItems[0];
  const hasQuery = searchQuery?.trim().length > 0;

  return (
    <div className="max-w-3xl space-y-4">
      {!hasQuery && (
        <>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            OpenAI Codex 常见问题文档
          </h1>
          <p className="text-slate-700 leading-relaxed mb-4">
            这里整理了在使用 Codex 过程中常见的问题与解决方案，涵盖账号权限、登录与工作区、CLI 和 VSCode 插件、网络环境等。建议从左侧目录选择主题，按需查阅对应章节。
          </p>
          {firstDoc && (
            <div className="mt-2 text-sm text-slate-600">
              可以从 <span className="underline">{firstDoc.title}</span> 开始阅读。
            </div>
          )}
        </>
      )}

      {hasQuery && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">搜索结果</h2>
          {searchResults.length === 0 ? (
            <div className="text-slate-600 text-sm">没有找到匹配的文档。</div>
          ) : (
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/docs/${item.id}`}
                  className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500">{item.category}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
