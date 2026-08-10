import * as React from "react"
import { Brain, Code, FileText, MessageSquare, MoreHorizontal, Paperclip, Globe, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GlassInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  onFilterSelect?: (filter: string) => void
}

export function GlassInput({
  placeholder = "Ask Anything",
  onSubmit,
  onFilterSelect,
}: GlassInputProps) {
  const [value, setValue] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("Brainstorm")

  const filters = [
    { name: "Brainstorm", icon: <Brain className="h-4 w-4" /> },
    { name: "Code", icon: <Code className="h-4 w-4" /> },
    { name: "Text", icon: <FileText className="h-4 w-4" /> },
    { name: "Advice", icon: <MessageSquare className="h-4 w-4" /> },
    { name: "More", icon: <MoreHorizontal className="h-4 w-4" /> },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value)
      setValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <>
      <style>{`
        @keyframes border-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes smoke-1 {
          0% { transform: translateX(-5px) translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateX(5px) translateY(-1px) scale(1.05); opacity: 0.7; }
          100% { transform: translateX(-5px) translateY(0px) scale(1); opacity: 0.4; }
        }
        @keyframes smoke-2 {
          0% { transform: translateX(5px) translateY(0px) scale(1.05); opacity: 0.5; }
          50% { transform: translateX(-5px) translateY(-0.5px) scale(0.95); opacity: 0.8; }
          100% { transform: translateX(5px) translateY(0px) scale(1.05); opacity: 0.5; }
        }
        @keyframes smoke-3 {
          0% { transform: translateX(0px) translateY(0.5px) scale(0.95); opacity: 0.6; }
          50% { transform: translateX(8px) translateY(-0.5px) scale(1.05); opacity: 0.4; }
          100% { transform: translateX(0px) translateY(0.5px) scale(0.95); opacity: 0.6; }
        }
      `}</style>
      <div className="w-full max-w-[760px] mx-auto flex flex-col gap-5">
        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.name
            return (
              <button
                key={filter.name}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.name)
                  if (onFilterSelect) onFilterSelect(filter.name)
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-medium transition-all cursor-pointer backdrop-blur-md",
                  isActive
                    ? "bg-zinc-950 text-white shadow-md"
                    : "bg-[#FDFBF7]/80 text-zinc-600 hover:bg-white hover:text-zinc-900 border border-white/40 shadow-sm"
                )}
              >
                {filter.icon}
                <span>{filter.name}</span>
              </button>
            )
          })}
        </div>

        {/* Input container wrapper to let glow bleed outside overflow-hidden */}
        <div className="relative w-full">
          {/* Animated subtle ambient glow under the input box (Premium Rainbow Smoke) */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[2px] w-[75%] h-3 pointer-events-none z-0 opacity-50 group-hover:opacity-80 transition-opacity duration-700">
            {/* Base sliding glow */}
            <div 
              className="absolute inset-0 rounded-full blur-[8px]"
              style={{
                background: 'linear-gradient(90deg, #f87171, #fbbf24, #a3e635, #38bdf8, #818cf8, #c084fc, #f472b6, #f87171)',
                backgroundSize: '200% 100%',
                animation: 'border-slide 6s linear infinite',
              }}
            />
            {/* Independent Smoke Wisps for small detailing */}
            <div 
              className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[30%] h-[150%] rounded-full blur-[6px]"
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f87171)',
                animation: 'smoke-1 4s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute left-[40%] top-1/2 -translate-y-1/2 w-[25%] h-[120%] rounded-full blur-[5px]"
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #a3e635)',
                animation: 'smoke-2 5s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[30%] h-[140%] rounded-full blur-[6px]"
              style={{
                background: 'linear-gradient(90deg, #c084fc, #f472b6)',
                animation: 'smoke-3 4.5s ease-in-out infinite',
              }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative w-full rounded-[32px] bg-[#FDFBF7]/80 backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] group overflow-hidden z-10"
          >
            {/* Top/Left subtle white border for glass effect */}
            <div className="absolute inset-0 rounded-[32px] border-[1.5px] border-white/60 pointer-events-none" />

            {/* The animated bottom border line inside the container (Rainbow) */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
              <div 
                className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, #f87171, #fbbf24, #a3e635, #38bdf8, #818cf8, #c084fc, #f472b6, #f87171)',
                  backgroundSize: '200% 100%',
                  animation: 'border-slide 6s linear infinite',
                }}
              />
            </div>

            {/* Text Area */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={2}
              className="w-full bg-transparent text-zinc-800 placeholder-zinc-400 text-[16px] font-medium outline-none resize-none pt-1 relative z-10"
            />

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-6 relative z-10">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white shadow-sm text-zinc-600 hover:text-zinc-900 hover:scale-105 transition-all cursor-pointer"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white shadow-sm text-zinc-600 hover:text-zinc-900 hover:scale-105 transition-all cursor-pointer"
                >
                  <Globe className="h-5 w-5" />
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-zinc-950 hover:bg-zinc-800 text-white shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
