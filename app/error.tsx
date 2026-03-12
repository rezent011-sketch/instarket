'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">💥</div>
      <h1 className="text-3xl font-bold mb-3">エラーが発生しました</h1>
      <p className="text-[#888] mb-6 max-w-md">
        予期しないエラーが発生しました。再度お試しください。
      </p>
      <button
        onClick={reset}
        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
      >
        🔄 もう一度試す
      </button>
    </div>
  );
}
