import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './dogDetails.css'

const DogDetails = ({ apiUrl }) => {
    const { name } = useParams();
    const [dogs, setDogs ] = useState([])
    const [dog, setDog ] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const getDgos = async () => {
            try {
                const response = await fetch(`${apiUrl}dogs`);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`)
                }
                const data = await response.json();
                setDogs(data);
                const foundDog = data.find((dog) => dog.name === name)
                setDog(foundDog)
                console.log("Found Dog: ", foundDog)
                console.log("Dog Height", foundDog.height.imperial)
            } catch(error) {
                console.log('Error Fetching Dogs:', error)
            }
        }
        getDgos()
    }, [])
    if (!dog) {
        return <div>Dog not found...</div>;
    }
    return (
        <div className="dogsDetails-container">
            <h1 className="dogsDetails-title">{dog.name}</h1>
            <button className="dogsDetails-btn"onClick={() => navigate('/dogs')}>Back to Dog Breeds</button>
            <div className="dogsDetails-card">
                <img
                src={dog.image?.url || "https://placehold.co/150x150"}
                alt={dog.name || "dogs Breed"}
                className="dogsDetails-image"
                />
                <h2 className="dogsDetails-name">{dog.name}</h2>
                <p className="dogsDetails-detail"><strong>Origin:</strong> {dog.origin}</p>
                <p className="dogsDetails-detail"><strong>Height:</strong> {dog.height.imperial} inches</p>
                <p className="dogsDetails-detail"><strong>Height:</strong> {dog.weight.imperial} pounds</p>
                <p className="dogsDetails-detail"><strong>Breed For:</strong> {dog.bred_for}</p>
                <p className="dogsDetails-detail"><strong>Breed Group:</strong> {dog.breed_group}</p>
                <p className="dogsDetails-detail"><strong>Life Span:</strong> {dog.life_span} years</p>
                <p className="dogsDetails-detail"><strong>Temperament:</strong> {dog.temperament}</p>
            </div>
    </div>

    )
};
export default DogDetails;