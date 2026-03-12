'use client';

import Link from 'next/link';

const CATEGORIES = [
  { id: '文章生成', icon: '✍️', count: 24, description: 'メール、ブログ、レポート等のテキスト生成' },
  { id: 'コーディング', icon: '💻', count: 18, description: 'コードレビュー、生成、デバッグ支援' },
  { id: 'データ分析', icon: '📊', count: 15, description: 'CSV分析、可視化、統計レポート' },
  { id: '翻訳', icon: '🌐', count: 12, description: '多言語翻訳、ローカリゼーション' },
  { id: '画像処理', icon: '🎨', count: 9, description: '画像生成、編集、プロンプト最適化' },
  { id: 'その他', icon: '🔧', count: 6, description: 'その他のAIスキル' },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-2 animate-fadeInUp">カテゴリ</h1>
      <p className="text-[#888] mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        カテゴリからスキルを探す
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/skills?category=${encodeURIComponent(cat.id)}`}
            className="gradient-border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 animate-fadeInUp block"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{cat.id}</h3>
                  <span className="text-xs text-[#555] bg-[#1a1a1a] px-2 py-1 rounded-full">{cat.count}件</span>
                </div>
                <p className="text-[#888] text-sm mt-1">{cat.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
