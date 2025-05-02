"use client"

import { useState } from "react"
import { User, Settings, LogOut } from "lucide-react"

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2D2D33] hover:bg-[#3A3A41] transition-colors border border-[#3A3A41] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/40"
        aria-label="User profile"
      >
        <User size={18} className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#252529] rounded-md shadow-lg border border-[#3A3A41] py-1 z-20 animate-fade-in">
          <div className="px-4 py-3 border-b border-[#3A3A41]">
            <p className="text-sm font-medium text-white">User</p>
            <p className="text-xs text-[#A1A1AA] truncate">user@example.com</p>
          </div>
          <a href="#" className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-[#3A3A41] flex items-center">
            <Settings size={16} className="mr-2" />
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-[#E4E4E7] hover:bg-[#3A3A41] flex items-center">
            <LogOut size={16} className="mr-2" />
            Sign out
          </a>
        </div>
      )}
    </div>
  )
}
