
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';

const Header: React.FC = () => {
  const { connected } = useWallet();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center">
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
                  className="text-primary-foreground"
                >
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H6.5a2.5 2.5 0 1 1 1.8-4.3" />
                  <path d="M12 4v6" />
                  <path d="m8 2 4 4 4-4" />
                  <path d="M12 13v7" />
                  <path d="m8 22 4-4 4 4" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Solana NFT Gallery</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/my-nfts" className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/my-nfts" ? "bg-accent text-accent-foreground" : ""
                  )}>
                    My NFTs
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto">
              <div className={cn(
                "wallet-adapter-button-trigger",
                connected ? "bg-primary hover:bg-primary/90" : "bg-accent hover:bg-accent/90",
                "transition-all duration-300 scale-in"
              )}>
                <WalletMultiButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
