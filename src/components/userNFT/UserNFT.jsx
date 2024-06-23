import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import Carousel from "../Carousel/Carousel";
import TradinWiewWidget from "../TradingViewWidget/TradingWiew";
import "./index.css";

function UserNFT() {
  const { user } = useUser();
  const [nftImages, setNftImages] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [contratNumber, setContratNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [chain, setChain] = useState("");
  const [carouselVisible, setCarouselVisible] = useState(false);

  const chains = [
    "ethereum",
    "polygon",
    "klaytn",
    "solana",
    "arbitrum",
    "optimism",
    "avalanche",
    "bnb",
    "zora",
    "base",
  ];

  useEffect(() => {
    if (user && user.ethAddress && collectionName) {
      fetchCollectionNFTs(collectionName);
    }
    if (user && user.ethAddress && contratNumber && chain) {
      fetchContratNFTs(contratNumber);
    }
    if (user && user.ethAddress && walletAddress && chain) {
      fetchWalletAddress(walletAddress);
    }
  }, [user, collectionName, contratNumber, chain, walletAddress]);

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
      console.log(images);
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
  const fetchWalletAddress = async (walletAddress) => {
    const url = `https://api.opensea.io/v2/chain/${chain}/account/${walletAddress}/nfts?limit=50`;
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
    <div className="searchNFT">
      {/* <h1>Rechercher des NFT</h1>
      <div className="searchZone">
        <div className="searchCollection">
          <label>Nom de la collection : </label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
          <button
            className="buttonsSearch"
            onClick={() => fetchCollectionNFTs(collectionName)}
          >
            Rechercher
          </button>
        </div>
        <div className="searchContrat">
          <div>
            <label>Chaîne : </label>
            <select value={chain} onChange={(e) => setChain(e.target.value)}>
              <option value="" disabled>
                Sélectionnez une chaîne
              </option>
              {chains.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
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
          </div>
          <button
            className="buttonsSearch"
            onClick={() => fetchContratNFTs(contratNumber)}
          >
            Rechercher
          </button>
        </div>
        <div className="searchWallet">
          <div>
            <label>Blockchain : </label>
            <select value={chain} onChange={(e) => setChain(e.target.value)}>
              <option value="" disabled>
                Sélectionnez une chaîne
              </option>
              {chains.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Mon Wallet : </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <button
            className="buttonsSearch"
            onClick={() => fetchWalletAddress(walletAddress)}
          >
            Rechercher
          </button>
        </div>
      </div> */}
      <div className="viewTrad">
        <TradinWiewWidget />
      </div>
      <div className="NFTCard" onClick={() => setCarouselVisible(true)}>
        {nftImages.map((image, index) => (
          <img key={index} src={image} alt="NFT" className="nft-thumbnail" />
        ))}
      </div>
      {carouselVisible && (
        <Carousel
          images={nftImages}
          onClose={() => setCarouselVisible(false)}
        />
      )}
    </div>
  );
}

export default UserNFT;
