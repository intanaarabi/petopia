import AddButton from "../components/Buttons/AddButton"
import PetCard from "../components/Cards/PetCard"
import AddPetPopup from "../components/Popup/AddPetPopup"
import Search from "../components/Search"
import { useState } from "react"

const Pets = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    return (
    <>
        <div className="flex flex-col gap-4">
            <div className="header">Pets</div>
            <div className="flex flex-row gap-4">
                <Search/>
                <AddButton text="New Pet" onClick={openPopup}/>
            </div>
            <div className="flex flex-wrap gap-10">
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
            </div>
        </div>
        <AddPetPopup isOpen={isPopupOpen} onClose={closePopup}></AddPetPopup>
    </>
    )
}


export default Pets