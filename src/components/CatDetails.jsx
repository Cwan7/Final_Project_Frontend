import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './catDetails.css'


const CatDetails = ({ apiUrl }) => {
    const { name } = useParams()
    const [cats, setCats] = useState([]);
    const [cat, setCat]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCats = async () => {
            try {
                const response = await fetch (`${apiUrl}cats`)
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`)
                }
                const data = await response.json();
                setCats(data)
                const foundCat = data.find(cat => cat.name === name);
                setCat(foundCat)
            } catch(error) {
                console.log('Error getting Cats', error)
            }
        }
        getCats()
    }, [])
    return (
        <div className="catsDetails-container">
      <h1 className="catsDetails-title">{cat.name}</h1>
      <button className="catsDetails-btn" onClick={() => navigate('/cats')}>Back to Cat Breeds</button>
      <div className="catsDetails-card">
        <img
          src={cat.image?.url || "https://placehold.co/150x150"}
          alt={cat.name || "Cat Breed"}
          className="catsDetails-image"
        />
        <h2 className="catsDetails-name">{cat.name}</h2>
        <p className="catsDetails-detail"><strong>Origin:</strong> {cat.origin}</p>
        <p className="catsDetails-detail"><strong>About:</strong> {cat.description}</p>
        <p className="catsDetails-detail"><strong>Temperament:</strong> {cat.temperament}</p>
        <p className="catsDetails-detail"><strong>Life Span:</strong> {cat.life_span} years</p>
        <p className="catsDetails-detail"><strong>On a Scale:</strong>1 to 5</p>
        <p className="catsDetails-detail"><strong>Loves Lap's:</strong> {cat.lap || '?'}</p>
        <p className="catsDetails-detail"><strong>Loves Dog's:</strong> {cat.dog_friendly}</p>
        <p className="catsDetails-detail"><strong>Loves Children:</strong> {cat.child_friendly}</p>
        <p className="catsDetails-detail"><strong>Affection:</strong> {cat.affection_level}</p>
        <p className="catsDetails-detail"><strong>Intelligence:</strong> {cat.intelligence}</p>
        <p className="catsDetails-detail"><strong>Loves Strangers:</strong> {cat.stranger_friendly}</p>
        <p className="catsDetails-detail"><strong>Energy Level:</strong> {cat.energy_level}</p>
      </div>
    </div>
    )
}
export default CatDetails;