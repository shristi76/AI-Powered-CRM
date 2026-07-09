"use client";

import { Database, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-md shadow-teal-700/20">
            <Database size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              GrowEasy AI Import
            </h1>

            <p className="hidden text-sm text-slate-500 sm:block">
              Smart CRM CSV Import Assistant
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 md:flex">
          <ShieldCheck size={16} className="text-emerald-600" />

          <span className="text-sm font-medium text-emerald-700">
            Secure Import with GrowEasy
          </span>
        </div>
      </div>
    </header>
  );
}