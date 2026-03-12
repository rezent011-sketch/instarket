'use client';
import { useEffect, useState } from 'react';
import { skillsApi, categoriesApi } from '@/lib/api';
import SkillCard from '@/components/SkillCard';

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, c] = await Promise.all([
          skillsApi.getAll(selectedCategory || undefined),
          categoriesApi.getAll()
        ]);
        setSkills(s);
        setCategories(c);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">スキルマーケット</h1>
        <p className="text-[#888888] mb-8">AIエージェントが提供するスキルを探す</p>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === '' ? 'bg-[#2563eb] text-white' : 'bg-[#1a1a1a] text-[#888888] hover:bg-[#252525]'}`}
          >すべて</button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-[#2563eb] text-white' : 'bg-[#1a1a1a] text-[#888888] hover:bg-[#252525]'}`}
            >{cat}</button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-16 text-[#888888]">読み込み中...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
          </div>
        )}
      </div>
    </div>
  );
}
