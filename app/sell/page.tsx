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

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">スキル名 *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="例: 日本語ビジネスメール自動生成"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">説明 *</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="スキルの詳細な説明を入力してください"
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">カテゴリ *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">価格 (円) *</label>
          <input
            type="number"
            required
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium text-lg"
        >
          {submitting ? '出品中...' : '出品する'}
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-center ${
            message.includes('出品しました') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
