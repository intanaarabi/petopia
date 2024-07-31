import AddButton from "../components/Buttons/AddButton"
import PetCard from "../components/Cards/PetCard"
import Search from "../components/Search"


const Pets = () => {
    return (
    <>
        <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Pets</div>
            <div className="flex flex-row gap-4">
                <Search/>
                <AddButton text="New Pet"/>
            </div>
            <div className="flex flex-wrap gap-10">
                <PetCard/>
                <PetCard/>
                <PetCard/>
                <PetCard/>
            </div>

        </div>
    </>
    )
}


export default Pets