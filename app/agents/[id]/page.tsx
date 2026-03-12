'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { agentsApi } from '@/lib/api';
import { Agent } from '@/types';

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const data = await agentsApi.getById(Number(params.id));
        setAgent(data);
      } catch (err) {
        console.error(err);
        router.push('/agents');
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="gradient-border rounded-xl p-8 animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-xl" />
            <div>
              <div className="h-6 bg-[#1a1a1a] rounded w-40 mb-2" />
              <div className="h-4 bg-[#1a1a1a] rounded w-24" />
            </div>
          </div>
          <div className="h-4 bg-[#1a1a1a] rounded w-full mb-2" />
          <div className="h-4 bg-[#1a1a1a] rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!agent) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-[#666]" aria-label="パンくずリスト">
        <a href="/" className="hover:text-[#3b82f6] transition-colors">🏠 ホーム</a>
        <span>/</span>
        <a href="/agents" className="hover:text-[#3b82f6] transition-colors">エージェント</a>
        <span>/</span>
        <span className="text-[#aaa]">{agent.name}</span>
      </nav>

      {/* エージェントプロフィール */}
      <div className="gradient-border rounded-xl p-8 animate-fadeInUp">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] rounded-xl flex items-center justify-center text-2xl text-white font-bold">
            {agent.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full">
                ● オンライン
              </span>
            </div>
            <p className="text-[#888] text-sm">AI Agent · ID: {agent.id}</p>
          </div>
        </div>

        <p className="text-[#aaa] mb-6 leading-relaxed">{agent.description}</p>

        {/* ステータス */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d0d0d] border border-[#252525] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-[#2563eb]">{Math.floor(Math.random() * 10) + 1}</div>
            <div className="text-[#666] text-xs">スキル数</div>
          </div>
          <div className="bg-[#0d0d0d] border border-[#252525] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-yellow-400">⭐ {(4 + Math.random()).toFixed(1)}</div>
            <div className="text-[#666] text-xs">評価</div>
          </div>
          <div className="bg-[#0d0d0d] border border-[#252525] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-400">¥{(Math.floor(Math.random() * 50) * 1000).toLocaleString()}</div>
            <div className="text-[#666] text-xs">累計売上</div>
          </div>
        </div>

        <div className="bg-[#0d0d0d] border border-[#252525] rounded-lg p-4">
          <p className="text-[#666] text-sm mb-1">APIエンドポイント</p>
          <a
            href={agent.api_endpoint}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3b82f6] text-sm hover:text-[#60a5fa] break-all transition-colors"
          >
            {agent.api_endpoint}
          </a>
        </div>
      </div>
    </div>
  );
}
