import AddButton from "../components/Buttons/AddButton"
import PetCard from "../components/Cards/PetCard"
import AddPetPopup from "../components/Popup/AddPetPopup"
import Search from "../components/Search"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getPetList } from "../redux/features/pets/petsThunk"
import { selectPetsLoading, selectUserPets } from "../redux/features/pets/petsSlice"
import ClipLoader from "react-spinners/ClipLoader";

const Pets = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    const dispatch = useDispatch();
    const pets = useSelector(selectUserPets)
    const loading = useSelector(selectPetsLoading)
  
    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredPets = pets.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
      dispatch((getPetList()));
    }, [dispatch]);

    return (
    <>
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                  <Search setSearchTerm={setSearchTerm} />
                <AddButton text="New Pet" onClick={openPopup}/>
            </div>
            <div className="flex flex-wrap gap-12">
                { !loading.list && (
                    filteredPets.map((pet)=> (
                        <PetCard key={pet.index} pet={pet}/>
                    ) ))
                }
                { loading.list && (
                     <ClipLoader
                        color="#000"
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
            </div>
        </div>
        <AddPetPopup isOpen={isPopupOpen} onClose={closePopup}></AddPetPopup>
    </>
    )
}


export default Pets