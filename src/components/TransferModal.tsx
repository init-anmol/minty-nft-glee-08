
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface TransferModalProps {
  nft: any;
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (nft: any, recipient: string) => Promise<void>;
}

const TransferModal: React.FC<TransferModalProps> = ({ nft, isOpen, onClose, onTransfer }) => {
  const [recipient, setRecipient] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async () => {
    if (!recipient.trim()) {
      toast.error('Please enter a recipient address');
      return;
    }

    try {
      setIsTransferring(true);
      await onTransfer(nft, recipient);
      toast.success('NFT transferred successfully');
      setRecipient('');
      onClose();
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Failed to transfer NFT');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer NFT</DialogTitle>
          <DialogDescription>
            Send {nft.name || 'this NFT'} to another wallet address
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 py-2">
          <div className="size-16 rounded-md overflow-hidden">
            <img 
              src={nft.image || '/placeholder.svg'} 
              alt={nft.name || 'NFT'} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{nft.name || 'Unnamed NFT'}</h4>
            <p className="text-sm text-muted-foreground truncate">
              {nft.address.toString()}
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 py-2">
          <Label htmlFor="recipient" className="text-left">
            Recipient Address
          </Label>
          <Input
            id="recipient"
            placeholder="Enter Solana wallet address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isTransferring}>
            Cancel
          </Button>
          <Button onClick={handleTransfer} disabled={isTransferring}>
            {isTransferring ? 'Transferring...' : 'Transfer NFT'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;
