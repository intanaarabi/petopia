import PetCard from "../components/Cards/PetCard"
import Search from "../components/Search"
import petsData from "../config/pets.json"

const Dashboard = () => {
    return (<>
        <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Dashboard</div>
            <div className="flex flex-row gap-8">
                {
                    petsData.map((pet,index)=>(
                        <PetCard key={pet.id} mini={true} pet={pet} index={index}/>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Dashboard