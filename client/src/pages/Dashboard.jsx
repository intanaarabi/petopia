import PetCard from "../components/Cards/PetCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getPetList } from "../redux/features/pets/petsThunk"
import PetCardGraph from "../components/Cards/PetCardGraph";
import { selectWeightData } from "../redux/features/petLogs/logsSlice";
import { selectUserPets } from "../redux/features/pets/petsSlice";
import { getWeightLogs } from "../redux/features/petLogs/logsThunk";
import PetCardCalendar from "../components/Cards/PetCardCalendar";

const Dashboard = () => {
    const dispatch = useDispatch();
    const pets = useSelector(selectUserPets);
    const weightData = useSelector(selectWeightData);
  
    useEffect(() => {
      dispatch(getPetList());
      dispatch(getWeightLogs());
    }, [dispatch]);

    return (<>
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-8">
                {
                    pets.map((pet,index)=>(
                        <PetCard key={index} mini={true} pet={pet} index={index}/>
                    ))
                }
            </div>
            <div className="flex flex-row gap-6">
                <div className="flex-grow">
                    <PetCardGraph data={weightData}/>
                </div>
                <div className="flex-grow">
                     <PetCardCalendar/>
                </div>
            </div>
        </div>
    </>)
}

export default Dashboard