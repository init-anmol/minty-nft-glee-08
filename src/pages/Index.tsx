
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import NFTGallery from '@/components/NFTGallery';
import MintNFT from '@/components/MintNFT';
import AnimatedContainer from '@/components/AnimatedContainer';
import { fetchUserNFTs, mintNFT, transferNFT } from '@/lib/nft';

const Index = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const wallet = useWallet();
  const { connected, publicKey } = wallet;

  useEffect(() => {
    if (connected && publicKey) {
      fetchNFTs();
    } else {
      setNfts([]);
    }
  }, [connected, publicKey]);

  const fetchNFTs = async () => {
    setIsLoading(true);
    try {
      const userNFTs = await fetchUserNFTs(wallet);
      setNfts(userNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      toast.error("Failed to load your NFTs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMintNFT = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsMinting(true);
    try {
      await mintNFT(wallet);
      toast.success("NFT minted successfully!");
      fetchNFTs();
    } catch (error) {
      console.error("Minting error:", error);
      toast.error("Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  };

  const handleTransferNFT = async (nft: any, recipientAddress: string) => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await transferNFT(wallet, nft, recipientAddress);
      toast.success("NFT transferred successfully!");
      fetchNFTs();
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Failed to transfer NFT");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-7xl pt-24 pb-16 px-4 sm:px-6">
        <AnimatedContainer animation="fade" className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Solana NFT Gallery
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Collect, Create, and Transfer NFTs
            </h1>
            <p className="text-muted-foreground text-lg">
              Mint, view, and manage your Solana NFT collection with a beautiful and intuitive interface.
            </p>
          </div>
        </AnimatedContainer>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <NFTGallery 
              nfts={nfts} 
              isLoading={isLoading} 
              onTransferNFT={handleTransferNFT} 
            />
          </div>
          
          <div className="md:col-span-1">
            <MintNFT onMintNFT={handleMintNFT} isMinting={isMinting} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
