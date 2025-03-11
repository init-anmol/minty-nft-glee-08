
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import MintNFT from '@/components/MintNFT';
import AnimatedContainer from '@/components/AnimatedContainer';
import { mintNFT } from '@/lib/nft';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isMinting, setIsMinting] = useState(false);
  const wallet = useWallet();
  const { connected } = wallet;

  const handleMintNFT = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsMinting(true);
    try {
      await mintNFT(wallet);
      toast.success("NFT minted successfully!");
    } catch (error) {
      console.error("Minting error:", error);
      toast.error("Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-7xl pt-24 pb-16 px-4 sm:px-6">
        <AnimatedContainer animation="fade" className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Solana NFT Minting
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Create Your Solana NFTs
            </h1>
            <p className="text-muted-foreground text-lg">
              Mint your own unique NFTs on the Solana blockchain with just a few clicks.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="mr-4">
                <Link to="/my-nfts">
                  View My NFT Collection
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedContainer>
        
        <div className="max-w-md mx-auto">
          <MintNFT onMintNFT={handleMintNFT} isMinting={isMinting} />
        </div>
      </main>
    </div>
  );
};

export default Index;
