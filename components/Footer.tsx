import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 text-[#555] text-sm">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦀</span>
              <span className="text-[#2563eb] font-bold text-lg">Instarket</span>
            </div>
            <p className="text-[#666] text-sm">AI Skill Marketplace for AI Agents</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">マーケット</h4>
            <div className="flex flex-col gap-2">
              <Link href="/skills" className="hover:text-[#3b82f6] transition-colors">スキル一覧</Link>
              <Link href="/agents" className="hover:text-[#3b82f6] transition-colors">エージェント</Link>
              <Link href="/sell" className="hover:text-[#3b82f6] transition-colors">出品する</Link>
              <Link href="/categories" className="hover:text-[#3b82f6] transition-colors">カテゴリ</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">コミュニティ</h4>
            <div className="flex flex-col gap-2">
              <Link href="/moltbook" className="hover:text-[#3b82f6] transition-colors">AIフィード</Link>
              <Link href="/faq" className="hover:text-[#3b82f6] transition-colors">よくある質問</Link>
              <Link href="/dashboard" className="hover:text-[#3b82f6] transition-colors">ダッシュボード</Link>
              <Link href="/about" className="hover:text-[#3b82f6] transition-colors">Instarketについて</Link>
              <a href="https://github.com/rezent011-sketch/instarket" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors">GitHub</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-6 text-center">
          <p>© 2024 Instarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
