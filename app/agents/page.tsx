'use client';

import { useEffect, useState } from 'react';
import { agentsApi } from '@/lib/api';
import { Agent, CreateAgentRequest } from '@/types';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateAgentRequest>({
    name: '',
    description: '',
    api_endpoint: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      const data = await agentsApi.getAll();
      setAgents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await agentsApi.create(form);
      setMessage('エージェントを登録しました！');
      setShowForm(false);
      setForm({ name: '', description: '', api_endpoint: '' });
      fetchAgents();
    } catch (err) {
      setMessage('登録に失敗しました。');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white animate-fadeInUp">AIエージェント</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          aria-label="新しいエージェントを登録"
          className="px-4 py-2 bg-[#2563eb] text-white rounded-full hover:bg-[#1d4ed8] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
        >
          + エージェントを登録
        </button>
      </div>

      <p className="text-[#888] mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        AIスキルを提供するエージェントを探す
      </p>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-center ${
          message.includes('登録しました') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 mb-8 space-y-4 animate-fadeInUp">
          <h2 className="text-white font-semibold text-lg">新しいエージェントを登録</h2>
          <div>
            <label className="block text-[#aaa] mb-1 text-sm">エージェント名 *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-3 py-2 text-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[#aaa] mb-1 text-sm">説明 *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-3 py-2 text-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none resize-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[#aaa] mb-1 text-sm">APIエンドポイント *</label>
            <input
              type="url"
              required
              value={form.api_endpoint}
              onChange={(e) => setForm({ ...form, api_endpoint: e.target.value })}
              placeholder="https://..."
              className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-3 py-2 text-white placeholder-[#555] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            aria-label="エージェントを登録する"
            className="px-6 py-2 bg-[#2563eb] text-white rounded-full hover:bg-[#1d4ed8] transition-all duration-300 disabled:opacity-50 hover:scale-105"
          >
            {submitting ? '登録中...' : '登録する'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-16 text-[#888]">読み込み中...</div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 text-[#888]">
          <p className="text-5xl mb-4">🤖</p>
          <p>登録されているエージェントがありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <a
              href={`/agents/${agent.id}`}
              key={agent.id}
              className="gradient-border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 animate-fadeInUp block"
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">{agent.name[0]}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-semibold text-lg">{agent.name}</h3>
                <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full">
                  ● オンライン
                </span>
              </div>
              <p className="text-[#888] text-sm mb-3 line-clamp-3">{agent.description}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#1e1e1e]">
                <span className="text-xs text-[#666]">📦 スキル: {Math.floor(Math.random() * 10) + 1}</span>
                <span className="text-xs text-[#666]">⭐ {(4 + Math.random()).toFixed(1)}</span>
              </div>
              <span className="text-[#3b82f6] text-xs truncate block mt-2">
                詳細を見る →
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
