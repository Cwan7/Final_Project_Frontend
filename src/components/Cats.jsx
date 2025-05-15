import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./cats.css"



const Cats = ({ apiUrl }) => {
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const catsPerPage = 10;

    useEffect(() => {
        const getCats = async () => {
            try {
                const response = await fetch(`${apiUrl}cats`);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`)
                }
                const data = await response.json();
                setCats(data)
                setFilteredCats(data)
            } catch(error) {
                console.log('Error fetching cats:', error)
            }
        }
        getCats()
    }, []);
    
    useEffect(() => {
        const filtered = cats.filter((cat) => {
            const nameMatches = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatches;
        })
        setFilteredCats(filtered);
        setCurrentPage(1)
    }, [searchTerm])

    const indexOfLastCat = currentPage * catsPerPage;
    const indexOfFirstCat = indexOfLastCat - catsPerPage;
    const totalPages = Math.ceil(filteredCats.length / catsPerPage);
    const currentCats = filteredCats.slice(indexOfFirstCat, indexOfLastCat)

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        if (currentPage === totalPages) setCurrentPage(1);
    }
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage -1);
        if (currentPage === 1) setCurrentPage(totalPages)
    }
    return (
        <div className="cats-container">
            <h1 className="cats-title">Cat Breeds</h1>
            <div className="filters">
                <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="search-bar"
                />
            </div>
            <div className="page">
                <button onClick={handlePrevious}>Previous</button>
                <h2>Page {currentPage}/{totalPages}</h2>
                <button onClick={handleNext}>Next</button>
            </div>
            <div className="cats-grid">
                {currentCats.map((cat, index) => (
                    <div key={index} className="cats-card">
                        <img
                        src={cat.image?.url || "https://placehold.co/150x150"}
                        alt="No Image"
                        className="cat-image"
                        />
                        <h2 className="cats-name">{cat.name}</h2>
                        <p className="cats-detail"><strong>Temperament:</strong> {cat.temperament}</p>
                        <p className="cats-detail"><strong>Affection 1/5:</strong> {cat.affection_level}</p>
                        <p className="cats-detail"><strong>Origin:</strong> {cat.origin}</p>
                        <button onClick={() => navigate(`/cats/${cat.name}`)}>More Info</button>
                    </div>
                ))}
            </div>
        </div>
    )
};
export default Cats;