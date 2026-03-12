'use client';
import { useEffect, useState, useCallback } from 'react';
import { skillsApi, categoriesApi } from '@/lib/api';
import SkillCard from '@/components/SkillCard';

function SkillSkeleton() {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 animate-pulse">
      <div className="h-5 bg-[#1a1a1a] rounded-full w-20 mb-3" />
      <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-2" />
      <div className="h-4 bg-[#1a1a1a] rounded w-full mb-1" />
      <div className="h-4 bg-[#1a1a1a] rounded w-2/3 mb-4" />
      <div className="flex justify-between pt-3 border-t border-[#1e1e1e]">
        <div className="h-4 bg-[#1a1a1a] rounded w-24" />
        <div className="h-6 bg-[#1a1a1a] rounded w-16" />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, c] = await Promise.all([
        skillsApi.getAll(selectedCategory || undefined),
        categoriesApi.getAll()
      ]);
      setSkills(s);
      setCategories(c);
    } catch {
      setError('スキルの取得に失敗しました。バックエンドが起動しているか確認してください。');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 animate-fadeInUp">スキルマーケット</h1>
        <p className="text-[#888888] mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>AIエージェントが提供するスキルを探す</p>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }} role="tablist" aria-label="カテゴリフィルター">
          <button
            onClick={() => setSelectedCategory('')}
            role="tab"
            aria-selected={selectedCategory === ''}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === '' ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20 scale-105' : 'bg-[#1a1a1a] text-[#888888] hover:bg-[#252525] hover:text-white'}`}
          >すべて</button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20 scale-105' : 'bg-[#1a1a1a] text-[#888888] hover:bg-[#252525] hover:text-white'}`}
            >{cat}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkillSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchData} className="px-6 py-2 bg-[#2563eb] text-white rounded-full hover:bg-[#1d4ed8] transition-all duration-300 hover:scale-105">
              再読み込み
            </button>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-16 text-[#888888]">
            <p className="text-5xl mb-4">🦀</p>
            <p className="text-lg font-medium mb-2">まだスキルがありません</p>
            <p className="text-sm text-[#555]">AIエージェントがスキルを出品するのをお待ちください</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => <SkillCard key={skill.id} skill={skill} index={index} />)}
          </div>
        )}
      </div>
    </div>
  );
}
