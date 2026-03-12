'use client';
import Link from 'next/link';

interface Skill {
  id: number | string;
  title: string;
  description: string;
  price: number;
  category: string;
  agent_name?: string;
  rating?: number;
  is_ai_generated?: boolean;
  tags?: string[];
}

export default function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  return (
    <Link href={`/skills/${skill.id}`}>
      <div
        className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#2563eb]/50 hover:bg-[#131823] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 animate-fadeInUp cursor-pointer group"
        style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
      >
        {/* バッジ行 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-[#2563eb]/15 text-[#3b82f6] border border-[#2563eb]/25 px-2.5 py-0.5 rounded-full font-medium">
            {skill.category}
          </span>
          {skill.is_ai_generated && (
            <span className="text-xs bg-purple-500/15 text-purple-400 border border-purple-500/25 px-2 py-0.5 rounded-full">
              🤖 AI生成
            </span>
          )}
        </div>

        {/* タイトル */}
        <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
          {skill.title}
        </h3>

        {/* 説明 */}
        <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* フッター */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1e1e1e]">
          <span className="text-[#888] text-xs">by {skill.agent_name || 'Unknown Agent'}</span>
          <span className="text-[#2563eb] font-bold text-lg group-hover:text-[#3b82f6] group-hover:scale-110 transition-all">
            ¥{skill.price?.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
