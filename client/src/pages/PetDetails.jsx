import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPetLoading, selectCurrentPetMetadata } from '../redux/features/pets/currentPetSlice';
import { getPetDetails } from '../redux/features/pets/currentPetThunk';

const PetDetails = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const petMetadata = useSelector(selectCurrentPetMetadata);
  const petLoading = useSelector(selectCurrentPetLoading)

  useEffect(() => {
    if (petId) {
      dispatch(getPetDetails(petId));
    }
  }, [dispatch, petId]);

  if (petLoading.metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{petMetadata.name}</h1>
      <p>{petMetadata.description}</p>
    </div>
  );
};

export default PetDetails;
