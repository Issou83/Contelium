import { useState } from "react";
import axios from "axios";
import "./index.css";

const UserNFT = () => {
  const [query, setQuery] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("collection");

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    let endpoint = "";
    let params = {};

    switch (searchType) {
      case "contract":
        endpoint = `https://deep-index.moralis.io/api/v2/nft/${query}/owners`;
        break;
      case "wallet":
        endpoint = `https://deep-index.moralis.io/api/v2/${query}/nft`;
        break;
      case "collection":
        endpoint = `https://deep-index.moralis.io/api/v2/nft/search`;
        params = { q: query };
        break;
      case "token":
        endpoint = `https://deep-index.moralis.io/api/v2/nft/${query}`;
        break;
      default:
        setError("Invalid search type");
        setLoading(false);
        return;
    }

    try {
      const response = await axios.get(endpoint, {
        headers: {
          "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdkYzBkNTJhLTQwMDgtNDllOS04MWY1LWZjNDIwZTc5N2Y3NyIsIm9yZ0lkIjoiMzk3Njc3IiwidXNlcklkIjoiNDA4NjI2IiwidHlwZUlkIjoiZmI4YjFhMDItYTYxOS00ZmQ0LTk3ZWUtMGFhNjFhZjc4OGZkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTkyNTc2OTUsImV4cCI6NDg3NTAxNzY5NX0.NC9bC2vFJwkWnU8M-_1GygfTulUFblEnEmCMV_bSKT0", // Remplacez par votre clé API Moralis
          accept: "application/json",
        },
        params,
      });
      console.log(response.data); // Ajouter ce log pour vérifier les données retournées
      setNfts(response.data.result || response.data);
    } catch (err) {
      setError(
        `Failed to fetch NFTs: ${
          err.response ? err.response.status : err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case "contract":
        return "Enter contract address";
      case "wallet":
        return "Enter wallet address";
      case "collection":
        return "Enter collection name";
      case "token":
        return "Enter token address";
      default:
        return "Enter search query";
    }
  };

  const getImageUrl = (metadata) => {
    try {
      const parsedMetadata = JSON.parse(metadata);
      if (parsedMetadata.image) {
        return parsedMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
    } catch (error) {
      console.error("Failed to parse metadata", error);
    }
    return null;
  };

  return (
    <div className="nft-search">
      <h1>Search NFTs</h1>
      <p>Choose a search type and enter a query to search for NFTs.</p>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="collection">Collection</option>
        <option value="contract">Contract</option>
        <option value="wallet">Wallet</option>
        <option value="token">Token</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={getPlaceholder()}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="nft-grid">
        {nfts.map((nft) => {
          const imageUrl = getImageUrl(nft.metadata);
          return (
            <div key={nft.token_id || nft.token_hash} className="nft-item">
              {imageUrl && <img src={imageUrl} alt={nft.name || "NFT Image"} />}
              <h2>{nft.name || "Unnamed NFT"}</h2>
              <p>{nft.description || "No description available"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserNFT;
