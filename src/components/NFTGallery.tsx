
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import NFTCard from './NFTCard';
import EmptyState from './EmptyState';
import AnimatedContainer from './AnimatedContainer';

interface NFTGalleryProps {
  nfts: any[];
  isLoading: boolean;
  onTransferNFT: (nft: any, recipient: string) => Promise<void>;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts, isLoading, onTransferNFT }) => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <EmptyState
        title="Connect Your Wallet"
        description="Connect your Solana wallet to view your NFTs."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-12 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M16 14V10" />
            <path d="M12 14V10" />
            <path d="M8 14V10" />
          </svg>
        }
      />
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-6">Your NFT Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-border/40 overflow-hidden">
              <div className="aspect-square loading-shimmer"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 w-2/3 rounded loading-shimmer"></div>
                <div className="h-4 w-1/2 rounded loading-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <EmptyState
        title="No NFTs Found"
        description="You don't have any NFTs in your wallet yet. Mint your first NFT to get started!"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-12 text-muted-foreground"
          >
            <path d="M11 5h4a2 2 0 0 1 2 2v1c0 2-2 3-2 3" />
            <path d="M14 16h-4a2 2 0 0 1-2-2v-1c0-2 2-3 2-3" />
            <line x1="12" x2="12" y1="19" y2="19" />
            <line x1="12" x2="12" y1="1" y2="3" />
          </svg>
        }
      />
    );
  }

  return (
    <div className="w-full">
      <AnimatedContainer animation="fade">
        <h2 className="text-2xl font-semibold mb-6">Your NFT Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => (
            <AnimatedContainer 
              key={nft.address.toString()} 
              animation="slide-up" 
              delay={index * 100}
            >
              <NFTCard nft={nft} onTransfer={onTransferNFT} />
            </AnimatedContainer>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default NFTGallery;
