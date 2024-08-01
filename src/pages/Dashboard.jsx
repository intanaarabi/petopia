import PetCard from "../components/Cards/PetCard"
import petsData from "../config/pets.json"

const Dashboard = () => {
    return (<>
        <div className="flex flex-col gap-4">
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