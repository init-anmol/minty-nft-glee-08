
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TransferModal from './TransferModal';

interface NFTCardProps {
  nft: {
    address: { toString: () => string };
    name?: string;
    image?: string | null;
    symbol?: string;
    collection?: { name?: string };
    mintAddress?: { toString: () => string };
  };
  onTransfer: (nft: any, recipient: string) => Promise<void>;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onTransfer }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
    setImageLoaded(true);
  };

  const nftAddress = nft.address.toString();
  const shortAddress = `${nftAddress.substring(0, 4)}...${nftAddress.substring(nftAddress.length - 4)}`;

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted/20">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-shimmer rounded w-full h-full" />
            </div>
          )}
          <img
            src={nft.image || '/placeholder.svg'}
            alt={nft.name || 'NFT'}
            className={cn(
              "h-full w-full object-cover transition-all duration-300",
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium line-clamp-1">{nft.name || 'Unnamed NFT'}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">{nft.symbol || shortAddress}</span>
            {nft.collection?.name && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {nft.collection.name}
              </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-3 group"
            onClick={() => setShowTransferModal(true)}
          >
            Transfer
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <TransferModal
        nft={nft}
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransfer={onTransfer}
      />
    </>
  );
};

export default NFTCard;
