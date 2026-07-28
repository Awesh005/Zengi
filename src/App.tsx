import React, { useState } from 'react';
import { ActiveTab, Deal, OrderBookEntry, MarketActivity } from './types';
import { 
  INITIAL_DEALS, 
  FOUNDER_MATCHES, 
  PORTFOLIO_INVESTMENTS, 
  INITIAL_ORDERBOOK, 
  LIVE_ACTIVITIES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BiddingArena } from './components/BiddingArena';
import { InvestorTerminal } from './components/InvestorTerminal';
import { MatchNetwork } from './components/MatchNetwork';
import { VenturePortfolio } from './components/VenturePortfolio';
import { DealFlow } from './components/DealFlow';
import { OrderModal } from './components/OrderModal';
import { CreateSyndicateModal } from './components/CreateSyndicateModal';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('arena');
  const [walletBalance, setWalletBalance] = useState<number>(128450.00);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [orderBook, setOrderBook] = useState<OrderBookEntry[]>(INITIAL_ORDERBOOK);
  const [activities, setActivities] = useState<MarketActivity[]>(LIVE_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedOrderDeal, setSelectedOrderDeal] = useState<Deal | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Total TVL calculation
  const totalTVL = deals.reduce((sum, d) => sum + d.valuationNum, 0);

  // Handle new bid/order execution
  const handleConfirmBid = (dealId: string, amount: number, perSharePrice: number) => {
    // Deduct from wallet if enough
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
    }

    // Update deal state
    setDeals(prevDeals => prevDeals.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          totalFunded: d.totalFunded + amount,
          participantsCount: d.participantsCount + 1,
          currentBidPerShare: perSharePrice
        };
      }
      return d;
    }));

    // Insert into Orderbook
    const newEntry: OrderBookEntry = {
      price: perSharePrice,
      amount: Math.floor(amount / perSharePrice),
      total: amount,
      type: 'buy'
    };
    setOrderBook(prev => [newEntry, ...prev.slice(0, 7)]);

    // Log Activity
    const targetDeal = deals.find(d => d.id === dealId);
    const newAct: MarketActivity = {
      id: `act-${Date.now()}`,
      user: 'You (Rebel_Operator)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      action: 'PLACED BID',
      target: targetDeal?.title || 'VENTURE DEAL',
      amount: `$${amount.toLocaleString()} @ $${perSharePrice.toFixed(2)}/sh`,
      timeAgo: 'Just now',
      badge: 'YOUR TICKET'
    };
    setActivities(prev => [newAct, ...prev.slice(0, 3)]);
  };

  // Handle Terminal order creation
  const handleTerminalOrder = (dealId: string, amount: number, price: number, type: 'buy' | 'sell') => {
    handleConfirmBid(dealId, amount, price);
  };

  // Handle listing new deal
  const handleCreateDeal = (newDeal: Deal) => {
    setDeals(prev => [newDeal, ...prev]);
    setActiveTab('arena');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e4e1e9] font-['Inter'] selection:bg-[#bd00ff] selection:text-white flex flex-col justify-between">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletBalance={walletBalance}
        totalTVL={totalTVL}
        activeDealsCount={deals.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-grow w-full">
        {activeTab === 'arena' && (
          <BiddingArena
            deals={deals}
            activities={activities}
            onOpenOrderModal={(deal) => setSelectedOrderDeal(deal)}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'terminal' && (
          <InvestorTerminal
            deals={deals}
            orderBook={orderBook}
            onPlaceOrder={handleTerminalOrder}
          />
        )}

        {activeTab === 'matches' && (
          <MatchNetwork
            matches={FOUNDER_MATCHES}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'portfolio' && (
          <VenturePortfolio
            portfolio={PORTFOLIO_INVESTMENTS}
          />
        )}

        {activeTab === 'dealflow' && (
          <DealFlow
            deals={deals}
            onOpenOrderModal={(deal) => setSelectedOrderDeal(deal)}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Order & Bid Placement Modal */}
      {selectedOrderDeal && (
        <OrderModal
          deal={selectedOrderDeal}
          onClose={() => setSelectedOrderDeal(null)}
          onConfirmBid={handleConfirmBid}
        />
      )}

      {/* Create Syndicate Modal */}
      {showCreateModal && (
        <CreateSyndicateModal
          onClose={() => setShowCreateModal(false)}
          onCreateDeal={handleCreateDeal}
        />
      )}

    </div>
  );
}

export default App;
