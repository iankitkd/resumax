"use client"

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { Button } from "../ui/Button";
import { navItems } from "@/data";


export default function MobileNav({isLoggedIn = false} : {isLoggedIn: boolean}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col space-y-1.5 z-20"
      >
        <span className={`w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{duration: 0.3, ease: [ "easeInOut"],}}
            className="fixed top-12 left-0 w-full z-10 pt-6 pb-6 md:hidden bg-gradient-to-br from-indigo-50 to-purple-200 shadow-md"
          >
            <div className="px-6 flex flex-col text-center space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-xl font-medium py-1 border-b border-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {isLoggedIn ? (
                <Link href={"/profile"} className="md:hidden text-center pt-2">
                  <Button variant="gradient" className="px-6 py-1 w-1/2">Profile</Button>
                </Link>
              ) : (
                <Link href={"/login"} className="md:hidden text-center pt-2">
                  <Button variant="gradient" className="px-6 py-1 w-1/2">Login</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
