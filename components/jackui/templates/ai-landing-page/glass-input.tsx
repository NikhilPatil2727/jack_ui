import * as React from "react"
import { Sparkles } from "lucide-react"

export interface GlassInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  onFilterSelect?: (filter: string) => void
  showFilters?: boolean
}

export function GlassInput({
  placeholder = "A cat, orange fur, playful — chibi style",
  onSubmit,
}: GlassInputProps) {
  const [value, setValue] = React.useState("")

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


      <div className="w-full max-w-[680px] mx-auto">
        {/* Input container wrapper to let glow bleed outside overflow-hidden */}
        <div className="relative w-full">
          {/* Animated subtle ambient glow under the input box (Preserved Rainbow Smoke) */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4px] w-[88%] h-6 pointer-events-none z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
            {/* Base sliding glow */}
            <div
              className="absolute inset-0 rounded-full blur-[12px]"
              style={{
                background: 'linear-gradient(90deg, #f87171, #fbbf24, #a3e635, #38bdf8, #818cf8, #c084fc, #f472b6, #f87171)',
                backgroundSize: '200% 100%',
                animation: 'border-slide 6s linear infinite',
              }}
            />
            {/* Independent Smoke Wisps */}
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
            className="relative w-full rounded-[20px] bg-[#262220] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.8)] group overflow-hidden z-10 border border-white/10"
          >
            {/* Subtle glass highlight border */}
            <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10 pointer-events-none" />

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

            {/* TEXTAREA */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className="w-full bg-transparent text-zinc-200 placeholder-zinc-400 text-[16px] font-normal outline-none resize-none pt-0.5 relative z-10 leading-relaxed tracking-normal min-h-[34px]"
            />

            {/* BOTTOM ROW SPACING */}
            <div className="flex items-center justify-end mt-3.5 relative z-10">
              {/* CUSTOMIZABLE: Generate Button Size & Padding (Adjust px-5 py-2, text-[15px]) */}
              <div className="p-1 rounded-[20px] bg-[#9A3B18]/60 border border-[#C84E20]/40 flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-[14px] bg-gradient-to-r from-[#FF6529] to-[#FF5519] text-white text-[15px] font-bold tracking-tight shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_12px_rgba(255,85,25,0.4)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span className="font-semibold text-white">Generate</span>
                  <Sparkles className="h-4 w-4 fill-white text-white shrink-0" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

