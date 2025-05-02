export default function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="bg-[#252529] rounded-xl p-4 border border-[#3A3A41] shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "600ms" }}></div>
          </div>
        </div>
        <div className="text-xs text-[#71717A] mt-1.5">Processing...</div>
      </div>
    </div>
  )
}
