import * as React from "react"
import { Brain, Code, FileText, MessageSquare, MoreHorizontal, Paperclip, Globe, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GlassInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  onFilterSelect?: (filter: string) => void
  showFilters?: boolean
}

export function GlassInput({
  placeholder = "Ask Anything",
  onSubmit,
  onFilterSelect,
  showFilters = true,
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
          0% { transform: translateX(-8px) translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateX(8px) translateY(-2px) scale(1.1); opacity: 0.8; }
          100% { transform: translateX(-8px) translateY(0px) scale(1); opacity: 0.5; }
        }
        @keyframes smoke-2 {
          0% { transform: translateX(8px) translateY(0px) scale(1.1); opacity: 0.6; }
          50% { transform: translateX(-8px) translateY(-1px) scale(0.95); opacity: 0.9; }
          100% { transform: translateX(8px) translateY(0px) scale(1.1); opacity: 0.6; }
        }
        @keyframes smoke-3 {
          0% { transform: translateX(0px) translateY(1px) scale(0.95); opacity: 0.7; }
          50% { transform: translateX(12px) translateY(-1px) scale(1.1); opacity: 0.5; }
          100% { transform: translateX(0px) translateY(1px) scale(0.95); opacity: 0.7; }
        }
      `}</style>
      <div className="w-full max-w-[760px] mx-auto flex flex-col gap-3">
        {/* Filters Row */}
        {showFilters && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-[1.25rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] w-fit mx-auto relative z-10">
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
                    "group flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/50"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-white/60"
                  )}
                >
                  {React.cloneElement(filter.icon as React.ReactElement<{ className?: string }>, {
                    className: cn(
                      "h-4 w-4 transition-all duration-300", 
                      isActive ? "text-amber-500 scale-110 drop-shadow-sm" : "text-zinc-400 group-hover:text-zinc-600 group-hover:scale-110"
                    )
                  })}
                  <span>{filter.name}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Input container wrapper to let glow bleed outside overflow-hidden */}
        <div className="relative w-full">
          {/* Animated subtle ambient glow under the input box (Premium Rainbow Smoke) */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4px] w-[85%] h-5 pointer-events-none z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
            {/* Base sliding glow */}
            <div 
              className="absolute inset-0 rounded-full blur-[10px]"
              style={{
                background: 'linear-gradient(90deg, #f87171, #fbbf24, #a3e635, #38bdf8, #818cf8, #c084fc, #f472b6, #f87171)',
                backgroundSize: '200% 100%',
                animation: 'border-slide 6s linear infinite',
              }}
            />
            {/* Independent Smoke Wisps for small detailing */}
            <div 
              className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[35%] h-[160%] rounded-full blur-[8px]"
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f87171)',
                animation: 'smoke-1 4s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute left-[35%] top-1/2 -translate-y-1/2 w-[30%] h-[140%] rounded-full blur-[8px]"
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #a3e635)',
                animation: 'smoke-2 5s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[35%] h-[160%] rounded-full blur-[8px]"
              style={{
                background: 'linear-gradient(90deg, #c084fc, #f472b6)',
                animation: 'smoke-3 4.5s ease-in-out infinite',
              }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative w-full rounded-[32px] bg-[#FDFBF7]/80 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] group overflow-hidden z-10"
          >
            {/* Top/Left subtle white border for glass effect */}
            <div className="absolute inset-0 rounded-[32px] border-[1.5px] border-white/60 pointer-events-none" />

            {/* The animated bottom border line inside the container (Rainbow) */}
            <div className="absolute bottom-0 left-8 right-8 h-[1px] z-20">
              <div 
                className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, #f87171, #fbbf24, #a3e635, #38bdf8, #818cf8, #c084fc, #f472b6, #f87171)',
                  backgroundSize: '200% 100%',
                  animation: 'border-slide 6s linear infinite',
                  maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
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
            <div className="flex items-center justify-between mt-4 relative z-10">
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
