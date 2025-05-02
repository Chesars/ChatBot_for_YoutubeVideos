export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-[#2D2D33] rounded-xl flex items-center justify-center mb-6 border border-[#3A3A41] shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 12L10.5 14V10L14 12Z" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5.5H20C21.1046 5.5 22 6.39543 22 7.5V16.5C22 17.6046 21.1046 18.5 20 18.5H4C2.89543 18.5 2 17.6046 2 16.5V7.5C2 6.39543 2.89543 5.5 4 5.5ZM4 7.5V16.5H20V7.5H4Z"
            fill="white"
          />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-white mb-2 tracking-tight">YouChat AI</h2>
      <p className="text-[#A1A1AA] mb-8 max-w-sm text-sm leading-relaxed">
        Get AI-powered analysis and insights from YouTube videos
      </p>
      <div className="bg-[#252529] rounded-xl p-5 text-left w-full max-w-sm border border-[#3A3A41] shadow-sm">
        <p className="text-sm font-medium text-white mb-3">How to use:</p>
        <ol className="text-sm text-[#A1A1AA] space-y-3 pl-5 list-decimal leading-relaxed">
          <li>Paste a YouTube link to extract the transcript</li>
          <li>Ask questions about the video content</li>
        </ol>
      </div>
    </div>
  )
}
