'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  if (status === 'loading') {
    return <div className="h-9 w-20 bg-slate-200 rounded-lg animate-pulse"></div>;
  }

  if (session) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full hover:ring-2 hover:ring-amber-400 transition-all focus:outline-none"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User profile picture'}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <span className="font-semibold text-slate-700">
              {session.user?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
            >
              <div className="px-4 py-2 text-sm text-slate-700 border-b">
                <p className="font-semibold">Signed in as</p>
                <p className="truncate">{session.user?.email}</p>
              </div>
              
              <button
                onClick={() => signOut()}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="text-slate-600 hover:text-amber-600 font-semibold text-sm transition-colors"
    >
      Log In
    </button>
  );
}