import React from 'react';
import { ShieldCheck, Zap, Terminal, Users, PieChart, Lock, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#07070b] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-widest text-white font-['JetBrains_Mono']">
              ZENGI
            </span>
            <span className="bg-[#bd00ff] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase">
              REBEL
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            The premier high-stakes crowd bidding arena, investor terminal, and venture match network for the Digital Rebel ecosystem.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited Smart Escrow Protocols</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">ARENA ECOSYSTEM</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-amber-300 transition">Live Crowdfund Bidding</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition">Investor Orderbook Terminal</a></li>
            <li><a href="#" className="hover:text-emerald-300 transition">Syndicate Match Engine</a></li>
            <li><a href="#" className="hover:text-rose-300 transition">Curated Venture Pipeline</a></li>
          </ul>
        </div>

        {/* Institutional */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">GOVERNANCE & TRUST</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">Rebel Score Vetting</a></li>
            <li><a href="#" className="hover:text-white transition">Non-Custodial Escrow</a></li>
            <li><a href="#" className="hover:text-white transition">Pro-Rata Secondary Market</a></li>
            <li><a href="#" className="hover:text-white transition">API & WebSocket Feeds</a></li>
          </ul>
        </div>

        {/* Live Network Metrics */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">NETWORK STATUS</h4>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> OPERATIONAL
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">BLOCK LATENCY:</span>
              <span className="text-white">120ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">TOTAL VOLUME:</span>
              <span className="text-amber-300 font-bold">$142.8M</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <div>© 2026 ZENGI Digital Rebel Ecosystem. All Rights Reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-300">Privacy Protocol</a>
          <a href="#" className="hover:text-gray-300">Terms of Allocation</a>
          <a href="#" className="hover:text-gray-300">Risk Disclosure</a>
        </div>
      </div>
    </footer>
  );
};
