import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";

function UserNFT() {
  const { user } = useUser();
  const [nftImages, setNftImages] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [contratNumber, setContratNumber] = useState("");
  const [chain, setChain] = useState("");  // Pas de valeur par défaut, oblige l'utilisateur à choisir

  const chains = ['ethereum', 'polygon', 'klaytn', 'solana', 'arbitrum', 'optimism', 'avalanche', 'bnb', 'zora', 'base'];

  useEffect(() => {
    if (user && user.ethAddress && collectionName) {
        fetchCollectionNFTs(collectionName);
    }
    if (user && user.ethAddress && contratNumber && chain) {
        fetchContratNFTs(contratNumber);
    }
  }, [user, collectionName, contratNumber, chain]);

  const fetchCollectionNFTs = async (slug) => {
    const url = `https://api.opensea.io/v2/collection/${slug}/nfts?limit=50`;
    const headers = {
      "X-API-KEY": "35d5620a260c4a37b4dd1ab108ba3f5d",
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      const images = data.nfts.map((nft) => nft.image_url);
      setNftImages(images);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContratNFTs = async (address) => {
    const url = `https://api.opensea.io/v2/chain/${chain}/contract/${address}/nfts?limit=50`;
    const headers = {
      "X-API-KEY": "35d5620a260c4a37b4dd1ab108ba3f5d",
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      const images = data.nfts.map((nft) => nft.image_url);
      setNftImages(images);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <label>Nom de la collection : </label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
        <button onClick={() => fetchCollectionNFTs(collectionName)}>
          Rechercher
        </button>
      </div>
      <div>
        <label>Chaîne : </label>
        <select value={chain} onChange={(e) => setChain(e.target.value)}>
          <option value="" disabled>Sélectionnez une chaîne</option>
          {chains.map((ch) => (
            <option key={ch} value={ch}>{ch}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Nom du contrat : </label>
        <input
          type="text"
          value={contratNumber}
          onChange={(e) => setContratNumber(e.target.value)}
        />
        <button onClick={() => fetchContratNFTs(contratNumber)}>
          Rechercher
        </button>
      </div>

      <div>
        {nftImages.map((image, index) => (
          <img key={index} src={image} alt="NFT" />
        ))}
      </div>
    </div>
  );
}

export default UserNFT;
