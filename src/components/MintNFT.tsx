
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import AnimatedContainer from './AnimatedContainer';
import { Sparkles } from 'lucide-react';

interface MintNFTProps {
  onMintNFT: () => Promise<void>;
  isMinting: boolean;
}

const MintNFT: React.FC<MintNFTProps> = ({ onMintNFT, isMinting }) => {
  const { connected } = useWallet();
  const [mintCount, setMintCount] = useState(1);
  const [nftName, setNftName] = useState('My Solana NFT');

  const handleMintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setMintCount(1);
    } else if (value > 10) {
      setMintCount(10);
      toast.warning('Maximum 10 NFTs can be minted at once');
    } else {
      setMintCount(value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftName(e.target.value);
  };

  const handleMint = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    try {
      await onMintNFT();
    } catch (error) {
      console.error('Minting error:', error);
    }
  };

  return (
    <Card className="border border-border/50 shadow-subtle overflow-hidden">
      <CardHeader className="pb-4 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <CardTitle className="text-2xl">Mint New NFT</CardTitle>
        <CardDescription>
          Create your exclusive NFT on the Solana blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <div className="aspect-square relative bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
            <div className="text-center z-10 p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 mx-auto"
              >
                <Sparkles className="h-16 w-16 text-primary/70" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-1">{nftName || 'My Solana NFT'}</h3>
              <p className="text-sm text-muted-foreground">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end">
            <div className="p-4 w-full">
              <span className="text-xs uppercase tracking-wider text-white/90">Preview</span>
              <h4 className="text-white font-medium">Solana NFT Collection</h4>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nftName">NFT Name</Label>
            <Input
              id="nftName"
              placeholder="Enter a name for your NFT"
              value={nftName}
              onChange={handleNameChange}
              disabled={isMinting}
              className="transition-all focus:ring-1 focus:ring-primary/50"
            />
          </div>
          
          <div className="grid gap-2 mt-2">
            <Label htmlFor="mintCount">Quantity (max 10)</Label>
            <Input
              id="mintCount"
              type="number"
              min={1}
              max={10}
              value={mintCount}
              onChange={handleMintChange}
              disabled={isMinting || !connected}
              className="transition-all focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full relative overflow-hidden group"
          onClick={handleMint}
          disabled={isMinting || !connected}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isMinting ? 'Minting...' : 'Mint NFT'} 
            <Sparkles className="h-4 w-4" />
          </span>
          <motion.div 
            className="absolute inset-0 bg-primary-foreground/10" 
            initial={{ x: '-100%' }}
            animate={isMinting ? { x: '0%' } : { x: '-100%' }}
            transition={{ duration: 1, repeat: isMinting ? Infinity : 0 }}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MintNFT;
