import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6 animate-float">🦀</div>
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-[#888] text-lg mb-8">
        このページは見つかりませんでした
      </p>
      <Link
        href="/"
        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
      >
        🏠 トップに戻る
      </Link>
    </div>
  );
}
