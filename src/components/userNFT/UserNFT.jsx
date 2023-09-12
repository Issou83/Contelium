import { useState, useEffect } from 'react';
import { useUser } from '../../UserContext';

function UserNFT() {
    const { user } = useUser();
    const [nftImages, setNftImages] = useState([]);
    const [collectionName, setCollectionName] = useState('');

    useEffect(() => {
        if (user && user.ethAddress && collectionName) {
            fetchUserNFTs(collectionName);
        }
    }, [user, collectionName]);

    const fetchUserNFTs = async (slug) => {
        const url = `https://api.opensea.io/v2/collection/${slug}/nfts`;
        const headers = {
            'X-API-KEY': '35d5620a260c4a37b4dd1ab108ba3f5d'
        };
    
        try {
            const response = await fetch(url, { headers });
            const data = await response.json();
            console.log(data)
            
            const images = data.nfts.map(nft => nft.image_url);
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
                <button onClick={() => fetchUserNFTs(collectionName)}>
                    Rechercher
                </button>
            </div>
            
            <div>
                {nftImages.map((image, index) => (
                    <img  key={index} src={image} alt="NFT" />
                ))}
            </div>
        </div>
    );
}

export default UserNFT;