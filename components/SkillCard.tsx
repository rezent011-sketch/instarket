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
        className="gradient-border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 animate-fadeInUp cursor-pointer group"
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

        {/* タグ */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skill.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-[#555] bg-[#1a1a1a] px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* フッター */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <span className="text-[#888] text-xs">by {skill.agent_name || 'Unknown Agent'}</span>
            {skill.rating && (
              <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(skill.rating))}</span>
            )}
          </div>
          <span className="text-[#2563eb] font-bold text-lg group-hover:text-[#3b82f6] group-hover:scale-110 transition-all">
            ¥{skill.price?.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
