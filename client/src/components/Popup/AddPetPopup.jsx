import { useForm } from "react-hook-form";
import Popup from "./Popup"
import { BiSolidImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { selectPetsLoading } from "../../redux/features/pets/petsSlice";
import { addPet, getPetList } from "../../redux/features/pets/petsThunk";
import ClipLoader from "react-spinners/ClipLoader";
import { showSnackbar } from "../../redux/features/snackbar/snackbarSlice";
import { SnackbarType } from "../../enums";

const AddPetPopup = ({isOpen, onClose}) => {
    const {register, handleSubmit, formState: {errors} } = useForm()
    const loading = useSelector(selectPetsLoading)
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addPet(data))
        .then((result) => {
          if (addPet.fulfilled.match(result)) {
            dispatch(showSnackbar(
                {
                    message: 'Pet added successfully.',
                    type: SnackbarType.SUCCESS,
                    duration: 5000
                }))
          } else if (addPet.rejected.match(result)) {
            dispatch(showSnackbar(
                {
                    message: 'Unable to add pet.',
                    type: SnackbarType.ERROR,
                    duration: 5000
                }))
          }
          dispatch(getPetList())
          onClose()
        });
    };

    if (!isOpen) return null

    return(
        <Popup onClose={onClose}>
            <div className="flex flex-col gap-4">

            <p className="header">Add New Pet</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col flex-grow gap-4">
                            <div className="flex flex-col gap-1">
                                <label 
                                    htmlFor="name" 
                                    className="label-secondary">Name</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    {...register('name', {required: 'Name is required'})}
                                    placeholder="e.g. Cheeto"
                                    className={`w-full input ${errors.name ? 'border-red-500' : '' }`}
                                />
                                {errors.name && <span className='input-error'>{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-row gap-6 ">

                                <div className="flex flex-col gap-1 w-full">
                                        <label 
                                            htmlFor="dob" 
                                            className="label-secondary">Date of Birth</label>
                                        <input 
                                            id="dob"
                                            type="date" 
                                            {...register('dob', {required: 'Date of birth is required'})}
                                            className={`w-full input ${errors.dob ? 'border-red-500' : '' }`}
                                        />
                                        {errors.dob && <span className='input-error'>{errors.dob.message}</span>}
                                </div>

                              
                                <div className="flex flex-col gap-1 w-full">
                                    <label 
                                        htmlFor="sex" 
                                        className="label-secondary">Sex</label>
                                    <select
                                        id="sex"
                                        className="input w-full"
                                        defaultValue="male"
                                        {...register('sex')}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                            </div>

                            <div className="flex flex-row gap-6 ">
                                <div className="flex flex-col gap-1 w-full">
                                    <label 
                                        htmlFor="species" 
                                        className="label-secondary">Species</label>
                                    <select
                                        id="species"
                                        className="input w-full"
                                        defaultValue="cat"
                                        {...register('species')}
                                    >
                                        <option value="cat">Cat</option>
                                        <option value="dog">Dog</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <label 
                                        htmlFor="breed" 
                                        className="label-secondary">Breed <span className="font-normal text-[10px] inline">(optional)</span></label>
                                    <input 
                                        id="breed"
                                        type="text" 
                                        {...register('breed')}
                                        placeholder="e.g. Persian"
                                        className={`w-full input`}
                                    />

                                </div>
                            </div>
                        </div>
                        <button type="button" className="bg-button-primary w-1/3 rounded-xl relative group hover:opacity-80 transition-all duration-300">
                            <div className="absolute rounded-full bg-white w-[100px] h-[100px] left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3">
                                <div className="relative flex items-center justify-center h-full">
                                    <BiSolidImageAdd className="text-4xl"/>
                                </div>
                            </div>
                            <p className="absolute left-1/2 top-2/3 text-xs font-bold transform -translate-x-1/2 translate-y-2/3 mt-3">Upload Image</p>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label 
                            htmlFor="description" 
                            className="label-secondary">Description</label>
                        <textarea
                            id="description"
                            type="text" 
                            {...register('description')}
                            placeholder=""
                            maxLength="300" 
                            className="w-full min-h-[70px] input py-2"/>
                    </div>
                    <button disabled={loading.add} type="submit" className="flex flex-row items-center justify-center gap-4 bg-typography-primary rounded-lg px-4 py-2 font-bold text-white hover:opacity-80 transition-all duration-300 ">
                        {loading.add && (
                           <>
                                 <ClipLoader
                                    color="#fff"
                                    size={15}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                /> <p>Creating ...</p>
                           </> 
                        )} 
                        {!loading.add && (<p>Create Pet</p>)}
                    </button>
                </div>
                </form>
            </div>
            
        </Popup>
    )
}

export default AddPetPopup