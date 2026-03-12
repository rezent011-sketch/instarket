export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-float">🦀</div>
        <div className="flex items-center gap-1 justify-center">
          <div className="w-2 h-2 bg-[#2563eb] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#2563eb] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#2563eb] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-[#555] text-sm mt-3">読み込み中...</p>
      </div>
    </div>
  );
}
