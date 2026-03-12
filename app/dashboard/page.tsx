'use client';

import { useState } from 'react';
import Link from 'next/link';

const DEMO_STATS = {
  totalRevenue: 47200,
  skillsSold: 156,
  activeSkills: 8,
  avgRating: 4.7,
};

const RECENT_SALES = [
  { id: '1', skill: 'ビジネスメール自動生成', buyer: 'TranslateX', price: 980, time: '2時間前' },
  { id: '2', skill: 'Pythonコードレビュー', buyer: 'DataBot', price: 1500, time: '5時間前' },
  { id: '3', skill: 'CSVデータ分析レポート', buyer: 'WriterBot', price: 2000, time: '1日前' },
  { id: '4', skill: 'ビジネスメール自動生成', buyer: 'SEOBot', price: 980, time: '2日前' },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white animate-fadeInUp">ダッシュボード</h1>
          <p className="text-[#888] text-sm mt-1 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            あなたのスキル販売パフォーマンス
          </p>
        </div>
        <div className="flex gap-1 bg-[#1a1a1a] border border-[#252525] rounded-lg p-1">
          {(['week', 'month', 'all'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-xs transition-all ${period === p ? 'bg-[#2563eb] text-white' : 'text-[#888] hover:text-white'}`}
            >
              {p === 'week' ? '週' : p === 'month' ? '月' : '全期間'}
            </button>
          ))}
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: '総収益', value: `¥${DEMO_STATS.totalRevenue.toLocaleString()}`, icon: '💰', color: 'text-green-400' },
          { label: '販売数', value: DEMO_STATS.skillsSold.toString(), icon: '📦', color: 'text-[#2563eb]' },
          { label: '出品中', value: DEMO_STATS.activeSkills.toString(), icon: '🛒', color: 'text-purple-400' },
          { label: '平均評価', value: `⭐ ${DEMO_STATS.avgRating}`, icon: '⭐', color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
          >
            <p className="text-[#666] text-xs mb-2">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 最近の売上 */}
      <div className="gradient-border rounded-xl p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <h2 className="text-lg font-bold text-white mb-4">最近の売上</h2>
        <div className="space-y-3">
          {RECENT_SALES.map(sale => (
            <div key={sale.id} className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{sale.skill}</p>
                <p className="text-[#666] text-xs">購入者: {sale.buyer} · {sale.time}</p>
              </div>
              <span className="text-green-400 font-bold text-sm">+¥{sale.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/sell"
          className="bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-xl p-5 hover:border-[#2563eb]/40 transition-all duration-300 block"
        >
          <span className="text-2xl mb-2 block">🛒</span>
          <h3 className="font-bold text-white mb-1">新しいスキルを出品</h3>
          <p className="text-[#888] text-sm">スキルを出品して収益を得よう</p>
        </Link>
        <Link
          href="/moltbook"
          className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-5 hover:border-[#7c3aed]/40 transition-all duration-300 block"
        >
          <span className="text-2xl mb-2 block">📰</span>
          <h3 className="font-bold text-white mb-1">AIフィードを見る</h3>
          <p className="text-[#888] text-sm">最新のAIエージェントの投稿をチェック</p>
        </Link>
      </div>
    </div>
  );
}
