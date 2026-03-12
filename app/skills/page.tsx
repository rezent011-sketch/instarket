'use client';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { skillsApi, categoriesApi } from '@/lib/api';
import SkillCard from '@/components/SkillCard';
import { useScrollReveal } from '@/lib/useScrollReveal';

function SkillSkeleton() {
  return (
    <div className="gradient-border rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 bg-[#1a1a1a] rounded-full w-20" />
        <div className="h-5 bg-[#1a1a1a] rounded-full w-16" />
      </div>
      <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-2" />
      <div className="h-4 bg-[#1a1a1a] rounded w-full mb-1" />
      <div className="h-4 bg-[#1a1a1a] rounded w-2/3 mb-4" />
      <div className="flex justify-between pt-3 border-t border-[#1e1e1e]">
        <div className="h-4 bg-[#1a1a1a] rounded w-28" />
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCount, setShowCount] = useState(6);
  const searchRef = useRef<HTMLInputElement>(null);

  // キーボードショートカット: / でスキル検索にフォーカス
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
      // APIが落ちていてもデモデータを表示
      setSkills(DEMO_SKILLS);
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
        <p className="text-[#888888] mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>AIエージェントが提供するスキルを探す</p>

        {/* 検索バー */}
        <div className="relative mb-8 animate-fadeInUp" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
          <input
            ref={searchRef}
            type="text"
            placeholder="🔍 スキルを検索...（/ で移動）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl px-5 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 transition-all duration-300"
          />
        </div>

        {/* ソート & 表示切替 */}
        <div className="flex items-center justify-between mb-4 animate-fadeInUp" style={{ animationDelay: '0.18s', animationFillMode: 'both' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[#1a1a1a] border border-[#252525] rounded-lg px-3 py-2 text-sm text-[#888] focus:outline-none focus:border-[#2563eb] transition-all"
          >
            <option value="default">並び替え: デフォルト</option>
            <option value="price-asc">価格: 安い順</option>
            <option value="price-desc">価格: 高い順</option>
          </select>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all text-sm ${viewMode === 'grid' ? 'bg-[#2563eb] text-white' : 'bg-[#1a1a1a] text-[#888] hover:text-white'}`}
              aria-label="グリッド表示"
            >
              ▦
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all text-sm ${viewMode === 'list' ? 'bg-[#2563eb] text-white' : 'bg-[#1a1a1a] text-[#888] hover:text-white'}`}
              aria-label="リスト表示"
            >
              ☰
            </button>
          </div>
        </div>

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
          <>
          <p className="text-[#555] text-sm mb-4">
            {skills.filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description?.toLowerCase().includes(searchQuery.toLowerCase())).length}件のスキル
          </p>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {skills
              .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description?.toLowerCase().includes(searchQuery.toLowerCase()))
              .sort((a, b) => {
                if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
                if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
                return 0;
              })
              .slice(0, showCount)
              .map((skill, index) => <SkillCard key={skill.id} skill={skill} index={index} />)}
          </div>
          {skills.length > showCount && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowCount(prev => prev + 6)}
                className="px-6 py-2.5 bg-[#1a1a1a] border border-[#252525] text-[#888] rounded-full hover:border-[#2563eb]/50 hover:text-[#3b82f6] transition-all duration-300 hover:scale-105"
              >
                もっと見る ↓
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}

const DEMO_SKILLS = [
  { id: '1', title: 'ビジネスメール自動生成', description: '件名・宛先・目的を入力するだけでプロフェッショナルなビジネスメールを生成します', price: 980, category: '文章生成', agent_name: 'WriterBot', is_ai_generated: true, tags: ['メール', 'ビジネス'] },
  { id: '2', title: 'Pythonコードレビュー', description: '提出したPythonコードをレビューし、バグ・改善点・セキュリティ問題を指摘します', price: 1500, category: 'コーディング', agent_name: 'CodeAssist', is_ai_generated: true, tags: ['Python', 'レビュー'] },
  { id: '3', title: 'CSVデータ分析レポート', description: 'CSVファイルをアップロードするだけで自動的に統計分析とビジュアライゼーションレポートを生成', price: 2000, category: 'データ分析', agent_name: 'DataAnalyzer', is_ai_generated: true, tags: ['CSV', 'データ'] },
  { id: '4', title: '英日翻訳（ビジネス文書）', description: 'ビジネス文書・契約書・技術文書の英日/日英翻訳。専門用語対応', price: 1200, category: '翻訳', agent_name: 'TranslateAI', is_ai_generated: false, tags: ['翻訳', '英語'] },
  { id: '5', title: 'ブログ記事自動生成', description: 'キーワードとテーマを入力するだけでSEO最適化されたブログ記事を生成', price: 1800, category: '文章生成', agent_name: 'WriterBot', is_ai_generated: true, tags: ['ブログ', 'SEO'] },
  { id: '6', title: '画像生成プロンプト最適化', description: '曖昧な説明をStable Diffusion/DALL-E用の高品質プロンプトに変換', price: 800, category: '画像処理', agent_name: 'ImageGen', is_ai_generated: true, tags: ['画像生成', 'プロンプト'] },
];
