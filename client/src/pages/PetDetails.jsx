import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentPet, selectCurrentPetLoading, selectCurrentPetMetadata } from '../redux/features/pets/currentPetSlice';
import { getPetDetails } from '../redux/features/pets/currentPetThunk';
import BackButton from '../components/Buttons/BackButton';
import DeleteButton from '../components/Buttons/DeleteButton';
import PetCardMetadata from '../components/Cards/PetCardMetadata';
import PetCardLogs from '../components/Cards/PetCardLogs';

const PetDetails = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const petMetadata = useSelector(selectCurrentPetMetadata);
  const petLoading = useSelector(selectCurrentPetLoading)

  useEffect(() => {
    if (petId) {
      dispatch(getPetDetails(petId));
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
          <DeleteButton/>
      </div>
      <div className='flex flex-row gap-6'>
        <div className='flex flex-col'>
          {petMetadata && (<PetCardMetadata pet={petMetadata}/>)}
        </div>
        <div className='flex flex-col gap-6'>
          <PetCardLogs type="Health"/>
          <PetCardLogs/>
        </div>
        <div className='flex flex-col'>
        
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
