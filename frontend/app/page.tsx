"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, ChevronDown } from "lucide-react"
import ChatMessage from "@/components/chat-message"
import LoadingIndicator from "@/components/loading-indicator"
import { motion, AnimatePresence } from "framer-motion"
import ApiStatus from "@/components/api-status"
import EmptyState from "@/components/empty-state"
import ProfileIcon from "@/components/profile-icon"

type MessageType = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Replace with your computer's local IP address
const API_BASE_URL = "http://127.0.0.1:8000"
const API_ENDPOINT = `${API_BASE_URL}/chat/`

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [apiConnected, setApiConnected] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Update the API connection check
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: "HEAD",
        })
        setApiConnected(response.ok)
      } catch (err) {
        console.error("API connection check failed:", err)
        setApiConnected(false)
      }
    }

    checkApiConnection()
    // Set up periodic checking
    const interval = setInterval(checkApiConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100
      setShowScrollButton(isScrolledUp)
    }

    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll)
      return () => chatContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message to chat
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()

      // Add assistant message to chat
      const assistantMessage: MessageType = {
        id: Date.now().toString(),
        content: data.reply.content,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error(err)
      setError("Failed to get a response. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const isValidYoutubeLink = (text: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
    return youtubeRegex.test(text)
  }

  return (
    <main className="flex flex-col h-screen bg-[#18181B] text-[#F2F2F3]">
      {/* Header */}
      <header className="bg-[#1F1F23] border-b border-[#2D2D33] py-3.5 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-[#2D2D33] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 12L10.5 14V10L14 12Z" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5.5H20C21.1046 5.5 22 6.39543 22 7.5V16.5C22 17.6046 21.1046 18.5 20 18.5H4C2.89543 18.5 2 17.6046 2 16.5V7.5C2 6.39543 2.89543 5.5 4 5.5ZM4 7.5V16.5H20V7.5H4Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-lg font-medium tracking-tight text-white">YouChat AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ApiStatus isConnected={apiConnected} apiUrl={API_BASE_URL} />
            <ProfileIcon />
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 max-w-4xl mx-auto w-full scrollbar-thin scrollbar-thumb-[#2D2D33] scrollbar-track-transparent"
      >
        <div className="space-y-6">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <EmptyState />
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))
            )}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <LoadingIndicator />
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-[#2D1215] text-[#F87171] rounded-md text-sm border border-[#7F1D1D]/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-4 md:right-8 bg-[#2D2D33] text-[#A1A1AA] p-2 rounded-full shadow-lg hover:bg-[#3A3A41] transition-all"
        >
          <ChevronDown size={18} />
        </button>
      )}

      {/* Message Input */}
<div className="border-t border-[#2D2D33] bg-[#1F1F23] p-4 md:p-6 max-w-4xl mx-auto w-full rounded-xl">        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a YouTube link or ask a question..."
              className="w-full p-3.5 pl-4 pr-10 bg-[#252529] border border-[#3A3A41] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0078D4]/40 focus:border-[#0078D4] transition-all text-sm shadow-sm"
              disabled={isLoading}
            />
            {input && isValidYoutubeLink(input) && (
              <div className="absolute -bottom-5 left-1 text-xs text-white flex items-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path d="M14 12L10.5 14V10L14 12Z" fill="currentColor" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5.5H20C21.1046 5.5 22 6.39543 22 7.5V16.5C22 17.6046 21.1046 18.5 20 18.5H4C2.89543 18.5 2 17.6046 2 16.5V7.5C2 6.39543 2.89543 5.5 4 5.5ZM4 7.5V16.5H20V7.5H4Z"
                    fill="currentColor"
                  />
                </svg>
                YouTube link detected
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-3.5 bg-[#0078D4] text-white rounded-xl hover:bg-[#106EBE] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/50 focus:ring-offset-2 focus:ring-offset-[#1F1F23] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-sm"
            disabled={isLoading || !input.trim()}
          >
            <Send size={16} className="mr-0" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </main>
  )
}
