import { cn } from "@/lib/utils"
import { format } from "date-fns"

type MessageProps = {
  message: {
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
}

// Add this function to detect YouTube links
const isYoutubeLink = (text: string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
  return youtubeRegex.test(text)
}

// Add this function to format YouTube links
const formatMessageContent = (content: string) => {
  if (isYoutubeLink(content)) {
    return (
      <div className="flex items-center">
        <svg
          className="h-3.5 w-3.5 mr-1.5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 12L10.5 14V10L14 12Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5.5H20C21.1046 5.5 22 6.39543 22 7.5V16.5C22 17.6046 21.1046 18.5 20 18.5H4C2.89543 18.5 2 17.6046 2 16.5V7.5C2 6.39543 2.89543 5.5 4 5.5ZM4 7.5V16.5H20V7.5H4Z"
            fill="currentColor"
          />
        </svg>
        <span className="break-all">{content}</span>
      </div>
    )
  }
  return <p className="whitespace-pre-wrap">{content}</p>
}

export default function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === "user"
  const formattedTime = format(new Date(message.timestamp), "h:mm a")

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-[85%]">
        <div
          className={cn(
            "rounded-xl p-3.5 shadow-sm",
            isUser ? "bg-[#0078D4] text-white" : "bg-[#252529] text-[#F2F2F3] border border-[#3A3A41]",
          )}
        >
          {formatMessageContent(message.content)}
        </div>
        <div className={cn("text-xs text-[#71717A] mt-1.5", isUser ? "text-right" : "text-left")}>{formattedTime}</div>
      </div>
    </div>
  )
}
