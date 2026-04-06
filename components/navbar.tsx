"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Waves } from "lucide-react"

const navLinks = [
  { label: "Trending", href: "#trending" },
  { label: "Vibes", href: "#vibes" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Hides when scrolling down, shows when scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }
    
    // Performance optimization for scroll events
    window.addEventListener('scroll', controlNavbar, { passive: true })
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <nav className={`mx-auto flex max-w-6xl items-center justify-between p-4 md:px-6 transition-all duration-300 ${
        lastScrollY > 20 ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : ""
      }`}>
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent transition-transform group-hover:scale-105 shadow-lg shadow-primary/10">
            <Waves className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-black italic uppercase tracking-tighter text-white">VibeMachine</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-primary/20">
            Get App
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="bg-black border-b border-white/10 md:hidden overflow-hidden backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-4 text-xs font-black uppercase tracking-widest text-black">
                Get App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}