import React, { useState } from 'react';
import { Deal } from '../types';
import { PlusCircle, X, Sparkles, Building2, ShieldCheck, Flame } from 'lucide-react';

interface CreateSyndicateModalProps {
  onClose: () => void;
  onCreateDeal: (newDeal: Deal) => void;
}

export const CreateSyndicateModal: React.FC<CreateSyndicateModalProps> = ({
  onClose,
  onCreateDeal
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'CROWDFUND' | 'SYNDICATE' | 'PRE-SEED' | 'SERIES A'>('SYNDICATE');
  const [valuationNum, setValuationNum] = useState<number>(15000000);
  const [fundTarget, setFundTarget] = useState<number>(2000000);
  const [minTicketNum, setMinTicketNum] = useState<number>(1000);
  const [leadInvestor, setLeadInvestor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Deal = {
      id: `deal-custom-${Date.now()}`,
      title: title.toUpperCase() || 'NEW REBEL VENTURE',
      tagline: tagline || 'Next-Generation Autonomous Tech Ecosystem',
      category: category,
      valuation: `$${valuationNum.toLocaleString()}`,
      valuationNum: valuationNum,
      minTicket: `$${minTicketNum.toLocaleString()}`,
      minTicketNum: minTicketNum,
      leadInvestor: leadInvestor || 'Rebel Lead Syndicate',
      totalFunded: 0,
      fundTarget: fundTarget,
      participantsCount: 1,
      timeLeftSeconds: 86400 * 7,
      featured: false,
      hot: true,
      liveBidding: true,
      currentBidPerShare: 25.00,
      imageUrl: imageUrl,
      tractionMetric: '$500k ARR Pilot',
      description: description || 'High-growth tech venture seeking syndicate capital through the Zengi Crowd Arena.',
      rebelScore: 92,
      badges: ['COMMUNITY SYNDICATE', 'VERIFIED']
    };

    onCreateDeal(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#120f24] border border-purple-500/50 rounded-3xl p-6 lg:p-8 max-w-xl w-full space-y-6 shadow-2xl relative my-8 font-sans">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold">
            <PlusCircle className="w-3.5 h-3.5 text-purple-300" />
            LIST NEW VENTURE SYNDICATE
          </div>
          <h2 className="text-2xl font-black text-white">Create Arena Deal</h2>
          <p className="text-xs text-gray-400">Launch a syndicate or crowdfund allocation in the Zengi Arena.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-gray-300 block mb-1">VENTURE TITLE / NAME</label>
            <input 
              type="text" 
              required
              placeholder="e.g. CYBERNETIC MESH PROTOCOL"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1">TAGLINE / ONE-LINER PITCH</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Autonomous AI Neural Mesh for Next-Gen Infrastructure"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 block mb-1">ROUND CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="SYNDICATE">SYNDICATE</option>
                <option value="CROWDFUND">CROWDFUND</option>
                <option value="PRE-SEED">PRE-SEED</option>
                <option value="SERIES A">SERIES A</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300 block mb-1">LEAD INVESTOR</label>
              <input 
                type="text" 
                placeholder="e.g. Sovereign Rebel Ventures"
                value={leadInvestor}
                onChange={(e) => setLeadInvestor(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-gray-300 block mb-1">VALUATION ($)</label>
              <input 
                type="number" 
                value={valuationNum}
                onChange={(e) => setValuationNum(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">FUND TARGET ($)</label>
              <input 
                type="number" 
                value={fundTarget}
                onChange={(e) => setFundTarget(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">MIN TICKET ($)</label>
              <input 
                type="number" 
                value={minTicketNum}
                onChange={(e) => setMinTicketNum(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-1">PITCH DESCRIPTION</label>
            <textarea
              rows={3}
              placeholder="Detail the technical breakthrough, revenue model, and competitive moat..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(189,0,255,0.4)] transition"
          >
            LAUNCH SYNDICATE TO ARENA
          </button>
        </form>

      </div>
    </div>
  );
};
