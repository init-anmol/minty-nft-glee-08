
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import MintNFT from '@/components/MintNFT';
import AnimatedContainer from '@/components/AnimatedContainer';
import { mintNFT } from '@/lib/nft';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const wallet = useWallet();
  const { connected } = wallet;

  useEffect(() => {
    // Simulate loading for smoother animation entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 -right-28 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-28 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
      
      <Header />
      
      <main className="container relative z-10 mx-auto max-w-7xl pt-24 pb-16 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-16"
        >
          <motion.div variants={itemVariants} className="text-left max-w-lg">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Solana NFT Platform
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Mint Your Digital Collectibles
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Create unique NFTs on the Solana blockchain with minimal fees and lightning-fast transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="relative group">
                <Link to="/my-nfts">
                  <span className="relative z-10">View My Collection</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-md scale-0 group-hover:scale-100 transition-transform origin-left" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://solana.com/developers" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="w-full max-w-md"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/30 rounded-2xl blur-md" />
              <div className="relative bg-card rounded-xl border border-border/50 shadow-xl overflow-hidden">
                <MintNFT onMintNFT={handleMintNFT} isMinting={isMinting} />
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <AnimatedContainer animation="fade" className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Easy Minting",
                description: "Create NFTs with just a few clicks, no technical knowledge required."
              },
              {
                title: "Low Fees",
                description: "Solana's efficient blockchain means minimal costs for creating and transferring NFTs."
              },
              {
                title: "Fast Transactions",
                description: "Transactions confirm in seconds rather than minutes or hours."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.2) }}
                className="p-6 rounded-lg border border-border/50 bg-card hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>
      </main>
    </div>
  );
};

export default Index;
