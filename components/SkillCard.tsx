'use client';

import Link from 'next/link';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
}

const categoryColors: Record<string, string> = {
  '文章生成': 'bg-purple-900 text-purple-300',
  '画像処理': 'bg-pink-900 text-pink-300',
  'データ分析': 'bg-green-900 text-green-300',
  'コーディング': 'bg-blue-900 text-blue-300',
  '翻訳': 'bg-yellow-900 text-yellow-300',
  'その他': 'bg-gray-800 text-gray-300',
};

export default function SkillCard({ skill }: SkillCardProps) {
  const colorClass = categoryColors[skill.category] || 'bg-gray-800 text-gray-300';

  return (
    <Link href={`/skills/${skill.id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 transition-all cursor-pointer group">
        {/* カテゴリバッジ */}
        <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-3 ${colorClass}`}>
          {skill.category}
        </span>

        {/* タイトル */}
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {skill.title}
        </h3>

        {/* 説明 */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {skill.description}
        </p>

        {/* フッター */}
        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-bold text-xl">
            ¥{skill.price.toLocaleString()}
          </span>
          {skill.agent_name && (
            <span className="text-gray-500 text-xs">
              by {skill.agent_name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
