import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentPet, selectCurrentPetEvents, selectCurrentPetLoading, selectCurrentPetLogs, selectCurrentPetMetadata } from '../redux/features/pets/currentPetSlice';
import { getPetDetails, getPetEvents, getPetLogs } from '../redux/features/pets/currentPetThunk';
import BackButton from '../components/Buttons/BackButton';
import DeleteButton from '../components/Buttons/DeleteButton';
import PetCardMetadata from '../components/Cards/PetCardMetadata';
import PetCardLogs from '../components/Cards/PetCardLogs';
import PetCardCalendar from '../components/Cards/PetCardCalendar';
import { LogsCategoryType } from '../enums/PetLogs';

const PetDetails = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const petMetadata = useSelector(selectCurrentPetMetadata);
  const petLogs = useSelector(selectCurrentPetLogs);
  const petEvents = useSelector(selectCurrentPetEvents)
  const petLoading = useSelector(selectCurrentPetLoading)

  useEffect(() => {
    if (petId) {
      dispatch(getPetDetails(petId));
      dispatch(getPetLogs(petId));
      dispatch(getPetEvents(petId));
    }
  }, [dispatch, petId]);

  const handleNavigate = () => {
    dispatch(resetCurrentPet())
    navigate(`/pets`);
  };

  if (petLoading.metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row'>
          <BackButton onClick={()=>handleNavigate()}/>
          <div className='flex-grow'></div>
          {/* <DeleteButton/> */}
      </div>
      <div className='flex flex-wrap 2xl:flex-row gap-6'>
          <div className='flex flex-col w-full 2xl:w-auto'>
            {petMetadata && (<PetCardMetadata pet={petMetadata}/>)}
          </div>
          <div className='flex flex-col gap-6 w-full 2xl:w-auto'>
            <PetCardLogs category={LogsCategoryType.HEALTH} logs={petLogs}/>
            <PetCardLogs  category={LogsCategoryType.GROWTH} logs={petLogs}/>
          </div>
        <div className='flex flex-col w-full 2xl:w-auto'>
          <PetCardCalendar events={petEvents}/>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
