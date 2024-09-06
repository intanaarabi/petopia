import PetCard from "../components/Cards/PetCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getPetList } from "../redux/features/pets/petsThunk"
import PetCardGraph from "../components/Cards/PetCardGraph";
import { selectLogs, selectWeightData } from "../redux/features/petLogs/logsSlice";
import { selectUserPets } from "../redux/features/pets/petsSlice";
import { getLogs, getWeightLogs } from "../redux/features/petLogs/logsThunk";
import PetCardCalendar from "../components/Cards/PetCardCalendar";
import PetCardRecentActivity from "../components/Cards/PetCardRecentActivity";
import { getEvents } from "../redux/features/petEvents/eventsThunk";
import { selectEvents } from "../redux/features/petEvents/eventsSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const pets = useSelector(selectUserPets);
    const weightData = useSelector(selectWeightData);
    const logs = useSelector(selectLogs);
    const events = useSelector(selectEvents);
    
    useEffect(() => {
      dispatch(getPetList());
      dispatch(getWeightLogs());
      dispatch(getLogs());
      dispatch(getEvents());
    }, [dispatch]);

    return (<>
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap md:flex-row gap-8">
                {
                    pets.map((pet,index)=>(
                        <PetCard key={index} mini={true} pet={pet} index={index}/>
                    ))
                }
            </div>
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex flex-col flex-grow gap-6">
                    <PetCardGraph data={weightData}/>
                    <PetCardRecentActivity logs={logs}/>
                </div>
                <div className="flex-1">
                     <PetCardCalendar events={events} allowAdd={false}/>
                </div>
            </div>
        </div>
    </>)
}

export default Dashboard