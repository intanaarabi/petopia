import PetCard from "../components/Cards/PetCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getPetList } from "../redux/features/pets/petsThunk"

const Dashboard = () => {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.petsList);
  
    useEffect(() => {
      dispatch((getPetList()));
    }, [dispatch]);

    return (<>
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-8">
                {
                    pets.map((pet,index)=>(
                        <PetCard key={index} mini={true} pet={pet} index={index}/>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Dashboard