import React, { useState } from 'react';
import { FounderMatch } from '../types';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  Check, 
  Building2, 
  MapPin, 
  Award, 
  DollarSign, 
  Filter, 
  MessageSquare,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface MatchNetworkProps {
  matches: FounderMatch[];
  searchQuery: string;
}

export const MatchNetwork: React.FC<MatchNetworkProps> = ({ matches, searchQuery }) => {
  const [filterTag, setFilterTag] = useState<string>('ALL');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [selectedFounderForMsg, setSelectedFounderForMsg] = useState<FounderMatch | null>(null);
  const [customProposalText, setCustomProposalText] = useState<string>('');
  const [proposalSentMsg, setProposalSentMsg] = useState<string | null>(null);

  const filteredMatches = matches.filter(m => {
    const matchesTag = filterTag === 'ALL' || m.tags.some(t => t.toLowerCase().includes(filterTag.toLowerCase()));
    const matchesSearch = searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFounderForMsg) return;
    
    setConnectedIds(prev => [...prev, selectedFounderForMsg.id]);
    setProposalSentMsg(`Co-investment proposal sent to ${selectedFounderForMsg.name}!`);
    setSelectedFounderForMsg(null);
    setCustomProposalText('');
    setTimeout(() => setProposalSentMsg(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast Alert */}
      {proposalSentMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 text-black px-6 py-3.5 rounded-2xl font-bold shadow-[0_0_30px_rgba(52,211,153,0.5)] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-black" />
          <span>{proposalSentMsg}</span>
        </div>
      )}

      {/* Hero Match Engine Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1726] via-[#122036] to-[#0a0a0f] border border-emerald-500/30 p-6 lg:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              AI MATCH ALGORITHM v4.2
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              REBEL FOUNDER <span className="text-emerald-400">&</span> SYNDICATE NETWORK
            </h1>
            <p className="text-gray-300 text-sm max-w-2xl">
              Algorithmic matchmaking pairing verified high-alpha founders with strategic syndicate leads, co-investors, and LP operators based on portfolio synergy.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/10 font-mono text-xs">
            <div>
              <div className="text-gray-400 text-[10px]">VERIFIED MATCHES</div>
              <div className="text-xl font-bold text-white">1,240 Active</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div>
              <div className="text-gray-400 text-[10px]">AVG CAPITAL RAISED</div>
              <div className="text-xl font-bold text-emerald-400">$2.8M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] p-3 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-emerald-400 ml-2" />
          {['ALL', 'QUANTUM AI', 'SPACE-TECH', 'GPU CLUSTERS', 'ROBOTICS'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterTag === tag
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_#10b981]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-gray-400">
          Showing <strong className="text-white">{filteredMatches.length} Founders</strong>
        </div>
      </div>

      {/* Founders Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((founder) => {
          const isConnected = connectedIds.includes(founder.id);

          return (
            <div
              key={founder.id}
              className="relative rounded-2xl bg-[#100e1f] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 p-6 space-y-5 shadow-xl group hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              {/* Compatibility Badge */}
              <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{founder.compatibilityScore}% MATCH</span>
              </div>

              {/* Founder Profile Info */}
              <div className="flex items-start gap-4">
                <img 
                  src={founder.avatar} 
                  alt={founder.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/40"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {founder.name}
                    </h3>
                    {founder.verifiedRebel && (
                      <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                        VERIFIED REBEL
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono font-semibold">{founder.role} @ {founder.company}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2 font-mono">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {founder.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {founder.fundingStage}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {founder.tags.map((t, idx) => (
                  <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono px-2.5 py-1 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Bio & Superpower */}
              <p className="text-xs text-gray-300 leading-relaxed">
                {founder.bio}
              </p>

              {/* Synergy Highlights */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono text-gray-400 uppercase">PORTFOLIO SYNERGY HIGHLIGHTS</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {founder.synergyHighlights.map((s, i) => (
                    <span key={i} className="text-emerald-300 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capital & Action Row */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono">
                <div>
                  <div className="text-[10px] text-gray-500">TARGET CAPITAL</div>
                  <div className="text-sm font-bold text-amber-300">{founder.capitalNeeded}</div>
                </div>

                <button
                  onClick={() => {
                    if (!isConnected) {
                      setSelectedFounderForMsg(founder);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                    isConnected
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300 cursor-default'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>PROPOSAL SENT</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-black" />
                      <span>PROPOSE CO-INVESTMENT</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Direct Proposal Modal Drawer */}
      {selectedFounderForMsg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#120f26] border border-emerald-400/50 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-400" />
                Send Proposal to {selectedFounderForMsg.name}
              </h3>
              <button 
                onClick={() => setSelectedFounderForMsg(null)}
                className="text-gray-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-gray-300 space-y-2">
              <p>Pitch co-investment syndicate terms or direct ticket allocation directly to {selectedFounderForMsg.company}.</p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 font-mono">
                <div>Target Capital: <strong className="text-amber-300">{selectedFounderForMsg.capitalNeeded}</strong></div>
                <div>Stage: <strong className="text-white">{selectedFounderForMsg.fundingStage}</strong></div>
              </div>
            </div>

            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">PROPOSAL MEMO / TICKET OFFER</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g., We are offering a $250k lead ticket with syndicate follow-on rights..."
                  value={customProposalText}
                  onChange={(e) => setCustomProposalText(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFounderForMsg(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-extrabold uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  SEND MATCH PROPOSAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
