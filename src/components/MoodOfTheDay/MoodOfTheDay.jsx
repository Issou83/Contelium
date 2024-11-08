import axios from "axios";
import { useState } from "react";
import "./index.css";

const MoodImageGenerator = () => {
  const [mood, setMood] = useState(""); // L'humeur de l'utilisateur
  const [images, setImages] = useState([]); // Stocke les URLs des images générées
  const [loading, setLoading] = useState(false);



    const data = {
      prompt: `A beautiful representation of the mood: ${mood}`, // Utilise le mot "mood" dans la requête pour générer des images basées sur l'humeur
      n: 3, // Générer 3 images
      size: "512x512", // Taille des images générées
    };

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/images/generations",
        data,
        { headers }
      );
      setImages(result.data.data.map((img) => img.url)); // Récupérer toutes les URLs des images générées
    } catch (error) {
      console.error("Erreur lors de la génération des images :", error);
    }
    setLoading(false);
  };

  return (
    <div className="ContentMood">
      <h2>Boom</h2>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Entre un mot qui décrit ton humeur"
      />
      <button onClick={generateImages} disabled={loading || mood === ""}>
        {loading ? "Génération en cours..." : "Générer des images"}
      </button>
      <div>
        <h3>Images générées :</h3>
        {images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1} générée pour l'humeur ${mood}`}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodImageGenerator;
