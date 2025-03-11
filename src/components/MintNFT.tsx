
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

interface MintNFTProps {
  onMintNFT: () => Promise<void>;
  isMinting: boolean;
}

const MintNFT: React.FC<MintNFTProps> = ({ onMintNFT, isMinting }) => {
  const { connected } = useWallet();
  const [mintCount, setMintCount] = useState(1);

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
    <AnimatedContainer animation="slide-up" className="w-full max-w-md mx-auto">
      <Card className="border border-border/50 shadow-subtle overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Mint New NFT</CardTitle>
          <CardDescription>
            Create your exclusive NFT on the Solana blockchain
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="relative mb-4 overflow-hidden rounded-xl">
            <img 
              src="/placeholder.svg" 
              alt="NFT Preview" 
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-4 w-full">
                <span className="text-xs uppercase tracking-wider text-white/80">Preview</span>
                <h4 className="text-white font-medium">Solana NFT Collection</h4>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mintCount">Number of NFTs (max 10)</Label>
              <Input
                id="mintCount"
                type="number"
                min={1}
                max={10}
                value={mintCount}
                onChange={handleMintChange}
                disabled={isMinting || !connected}
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
            <span className="relative z-10">
              {isMinting ? 'Minting...' : 'Mint NFT'}
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
    </AnimatedContainer>
  );
};

export default MintNFT;
