import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './dog.css'

const Dogs = ({ apiUrl }) => {
    const [dogs, setDogs] = useState([]);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [breedGroupFilter, setBreedGroupFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const dogsPerPage = 10;

    useEffect(() => {
        const getDogs = async () => {
            try {
                const response = await fetch(`${apiUrl}dogs`);
                if(!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`)
                }
                const data = await response.json();
                setDogs(data)
                setFilteredDogs(data)
            } catch(error){
                console.log('Error fetching dogs:', error)
            } 
        };
        getDogs();
    }, []);
    useEffect(() => {
        const filtered = dogs.filter((dog) => {
            const nameMatches = dog.name.toLowerCase().includes(searchTerm.toLowerCase());
            const breedMatches = !breedGroupFilter || dog.breed_group === breedGroupFilter;
            return nameMatches && breedMatches
        });
        setFilteredDogs(filtered);
        setCurrentPage(1)
    },[dogs, searchTerm, breedGroupFilter]);

    const breedGroups  = [];
    dogs.map((dog) => {
        const breedGroup = dog.breed_group;
        if (breedGroup && breedGroup !== "Unknown" && !breedGroups.includes(breedGroup)) {
            breedGroups.push(breedGroup)
        }
    })

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);
    const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        if (currentPage === totalPages) setCurrentPage(1)
    }
     const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        if (currentPage === 1) setCurrentPage(totalPages)
    }

    return (
        <div className="dogs-container">
            <h1 className="dogs-title">Dog Breeds</h1>
            <div className="filters">
                <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="search-bar"
                />
                <select
                value={breedGroupFilter}
                onChange={(event) => setBreedGroupFilter(event.target.value)}
                className="breed-group-filter"
                >
                <option value="">All Breed Groups</option>
                {breedGroups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                ))}
                </select>
            </div>
                <div className="pagination">
                    <button onClick={handlePrevious} className="pagination-button">Previous</button>
                    <h2 className="pagination-info">Page: {currentPage}/{totalPages}</h2>
                    <button onClick={handleNext} className="pagination-button">Next</button>
                </div>
            {filteredDogs.length === 0 && (
                <p className="no-results">No Breeds Found</p>
            )}
            <div className="dogs-grid">
                {currentDogs.map((dog, index) => (
                    <div key={index} className="dog-card">
                        <img
                        src={dog.image.url}
                        alt={dog.name}
                        className='dog-image'
                        // style={{width: '250px'}}
                        />
                        <h2 className="dog-name">{dog.name}</h2>
                        <p className="dog-detail"><strong>Temperament:</strong> {dog.temperament}</p>
                        <p className="dog-detail"><strong>Bred For:</strong> {dog.bred_for}</p>
                        <p className="dog-detail"><strong>Breed Group:</strong> {dog.breed_group}</p>
                        <button onClick={() => navigate(`/dogs/${dog.name}`)}>More Info</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Dogs;