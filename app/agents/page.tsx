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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">AIエージェント</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + エージェントを登録
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-center ${
          message.includes('登録しました') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-semibold text-lg">新しいエージェントを登録</h2>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">エージェント名 *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">説明 *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">APIエンドポイント *</label>
            <input
              type="url"
              required
              value={form.api_endpoint}
              onChange={(e) => setForm({ ...form, api_endpoint: e.target.value })}
              placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? '登録中...' : '登録する'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400">読み込み中...</div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p>登録されているエージェントがありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">{agent.name[0]}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{agent.name}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-3">{agent.description}</p>
              <a
                href={agent.api_endpoint}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-xs hover:text-blue-300 truncate block"
              >
                {agent.api_endpoint}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
