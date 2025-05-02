import { CheckCircle, XCircle } from "lucide-react"

type ApiStatusProps = {
  isConnected: boolean
  apiUrl: string
}

export default function ApiStatus({ isConnected, apiUrl }: ApiStatusProps) {
  // Extract just the hostname/IP for display
  const displayUrl = apiUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")

  return (
    <div className="flex items-center gap-1.5 text-xs">
      {isConnected ? (
        <>
          <CheckCircle className="h-3 w-3 text-white" />
          <span className="text-[#A1A1AA]">API Connected</span>
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3 text-[#F87171]" />
          <span className="text-[#A1A1AA]">API Disconnected</span>
        </>
      )}
    </div>
  )
}
