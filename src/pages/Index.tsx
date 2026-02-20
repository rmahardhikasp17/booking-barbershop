import { useSearchParams } from 'react-router-dom';
import { useQueue } from '@/hooks/useQueue';
import { NowServing } from '@/components/NowServing';
import { TakeQueueForm } from '@/components/TakeQueueForm';
import { VirtualTicket } from '@/components/VirtualTicket';
import { Scissors } from 'lucide-react';

const Index = () => {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticket');
  const { nowServing, nextQueue, totalWaiting, lastQueueNumber, loading } = useQueue();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="relative border-b border-border bg-card pt-6 pb-4 px-4 text-center">
        <div className="absolute top-0 left-0 w-full h-2 barber-pole-stripe z-10"></div>
        <div className="flex items-center justify-center gap-2">
          <Scissors className="w-6 h-6 text-primary animate-pulse-gold" />
          <h1 className="text-3xl font-display font-bold tracking-wide text-foreground drop-shadow-md">
            BARBER<span className="text-primary">SHOP</span>
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mt-2 tracking-[0.2em] uppercase font-medium">Sistem Antrean Digital</p>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat antrean...</p>
          </div>
        ) : ticketId ? (
          <>
            <NowServing nowServing={nowServing} nextQueue={nextQueue} />
            <VirtualTicket ticketId={ticketId} />
          </>
        ) : (
          <>
                <div className="grid grid-cols-2 gap-4 animate-slide-up">
                  <div className="bg-card border border-primary/20 p-4 rounded-xl text-center shadow-[0_4px_20px_-10px_rgba(212,175,55,0.1)]">
                    <p className="text-[10px] text-primary/80 uppercase font-bold tracking-wider mb-1">Total Antrean</p>
                    <p className="text-3xl font-display font-bold text-foreground">
                      {totalWaiting} <span className="text-xs text-muted-foreground font-sans font-normal ml-0.5">Orang</span>
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 p-4 rounded-xl text-center shadow-[0_4px_20px_-10px_rgba(212,175,55,0.1)]">
                    <p className="text-[10px] text-primary/80 uppercase font-bold tracking-wider mb-1">Nomor Terakhir</p>
                    <p className="text-3xl font-display font-bold text-foreground">
                      #{String(lastQueueNumber).padStart(3, '0')}
                    </p>
                  </div>
                </div>

            <NowServing nowServing={nowServing} nextQueue={nextQueue} />
            <TakeQueueForm />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-3 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">Powered by Digital Queue System</p>
      </footer>
    </div>
  );
};

export default Index;
