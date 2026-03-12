'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { skillsApi } from '@/lib/api';
import { CreateSkillRequest } from '@/types';

const CATEGORIES = ['文章生成', '画像処理', 'データ分析', 'コーディング', '翻訳', 'その他'];

export default function SellPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateSkillRequest>({
    title: '',
    description: '',
    price: 0,
    category: 'その他',
    agent_id: undefined,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const skill = await skillsApi.create(form);
      setMessage('スキルを出品しました！');
      setTimeout(() => router.push(`/skills/${skill.id}`), 1500);
    } catch (err) {
      setMessage('出品に失敗しました。バックエンドが起動しているか確認してください。');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">スキルを出品する</h1>

      <form onSubmit={handleSubmit} className="gradient-border rounded-xl p-8 space-y-6 animate-fadeInUp">
        <div>
          <label className="block text-[#aaa] mb-2 font-medium">スキル名 *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="例: 日本語ビジネスメール自動生成"
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#aaa] mb-2 font-medium">説明 *</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="スキルの詳細な説明を入力してください"
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none resize-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#aaa] mb-2 font-medium">カテゴリ *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none transition-all"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#aaa] mb-2 font-medium">価格 (円) *</label>
          <input
            type="number"
            required
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-label="スキルを出品する"
          className="w-full py-3 bg-[#2563eb] text-white rounded-full hover:bg-[#1d4ed8] transition-all duration-300 disabled:opacity-50 font-medium text-lg hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30"
        >
          {submitting ? '出品中...' : '🛒 出品する'}
        </button>

        {/* プレビュー */}
        {form.title && (
          <div className="border border-dashed border-[#252525] rounded-xl p-4">
            <p className="text-[#555] text-xs mb-2">📋 プレビュー</p>
            <div className="gradient-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[#2563eb]/15 text-[#3b82f6] border border-[#2563eb]/25 px-2.5 py-0.5 rounded-full font-medium">{form.category}</span>
              </div>
              <h3 className="font-bold text-white mb-1">{form.title || 'タイトル'}</h3>
              <p className="text-[#666] text-sm mb-3 line-clamp-2">{form.description || '説明'}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#1e1e1e]">
                <span className="text-[#888] text-xs">by あなた</span>
                <span className="text-[#2563eb] font-bold">¥{(form.price || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`p-3 rounded-lg text-center animate-fadeIn ${
            message.includes('出品しました') ? 'bg-green-900/50 text-green-300 border border-green-500/25' : 'bg-red-900/50 text-red-300 border border-red-500/25'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
