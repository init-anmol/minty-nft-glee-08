
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

export const fetchUserNFTs = async (wallet: any) => {
  if (!wallet.publicKey) {
    return [];
  }

  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

    const userNFTs = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey });

    // Fetch metadata JSON for each NFT
    const updatedNFTs = await Promise.all(
      userNFTs.map(async (nft) => {
        if (!nft.uri) return { ...nft, image: null };

        try {
          const response = await fetch(nft.uri);
          const metadata = await response.json();
          return { ...nft, image: metadata.image };
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return { ...nft, image: null };
        }
      })
    );

    return updatedNFTs;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
};

export const mintNFT = async (wallet: any) => {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  const metadata = {
    name: "Solana Collection NFT",
    symbol: "SNFT",
    uri: "https://raw.githubusercontent.com/init-anmol/images/refs/heads/main/nft-metadata.json",
    sellerFeeBasisPoints: 500,
  };

  console.log("🔗 Metadata:", metadata);

  const { nft } = await metaplex.nfts().create({
    uri: metadata.uri,
    name: metadata.name,
    sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    symbol: metadata.symbol,
  });

  console.log("✅ NFT Minted:", nft.address.toString());
  return nft;
};

export const transferNFT = async (wallet: any, nft: any, recipientAddress: string) => {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
    
    const recipientPublicKey = new PublicKey(recipientAddress);
    
    await metaplex.nfts().transfer({
      nftOrSft: nft,
      toOwner: recipientPublicKey,
    });

    console.log(`✅ NFT Transferred to ${recipientAddress}`);
    return true;
  } catch (error) {
    console.error("Transfer Error:", error);
    throw error;
  }
};
