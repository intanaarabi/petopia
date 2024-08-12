
import { useForm } from "react-hook-form"
import Popup from "./Popup"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentPetMetadata } from "../../redux/features/pets/currentPetSlice"
import ClipLoader from "react-spinners/ClipLoader"
import { useEffect, useState } from "react"
import { addPetEvents } from "../../redux/features/petEvents/eventsThunk"
import { getPetEvents } from "../../redux/features/pets/currentPetThunk"
import { selectEventsLoading } from "../../redux/features/petEvents/eventsSlice"

const AddEventsPopup = ({isOpen, onClose}) => {
    const {register, handleSubmit, setValue, formState: {errors}, reset } = useForm()
    const dispatch = useDispatch()
    const pet = useSelector(selectCurrentPetMetadata)
    const loading = useSelector(selectEventsLoading)
    const [isAllDay, setIsAllDay] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setIsAllDay(false)
        }
    }, [isOpen, reset]);

    if (!isOpen) return null

    const onSubmit = (data) => {
        const eventBody = {
            ...data,
            petId: pet._id,
        }
        dispatch(addPetEvents(eventBody))
        .then(() => {
            dispatch(getPetEvents(pet._id))
            onClose()
        })
    }


    const handleToggleAllDay = () => {
        setIsAllDay(!isAllDay);
    
        if (!isAllDay) {
          // Set default start and end times when "All day" is toggled on
          setValue('startTime', '00:00', { shouldValidate: true });
          setValue('endTime', '23:59', { shouldValidate: true });
        } else {
          // Clear the times when "All day" is toggled off
          setValue('startTime', '');
          setValue('endTime', '');
        }
      };

    return(
        <Popup onClose={onClose}>
            <div className="flex flex-col gap-4">

            <p className="header">Add New Event</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col flex-grow gap-3">
                                <div className="flex flex-col gap-1">
                                    <label 
                                        htmlFor="title" 
                                        className="label-secondary">Title</label>
                                    <input 
                                        id="title"
                                        type="text" 
                                        {...register('title', {required: 'Title is required'})}
                                        className={`w-full input ${errors.name ? 'border-red-500' : '' }`}
                                    />
                                    {errors.title && <span className='input-error'>{errors.title.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label 
                                        htmlFor="location" 
                                        className="label-secondary">Location</label>
                                    <input 
                                        id="location"
                                        type="text" 
                                        {...register('location', {required: 'Location is required'})}
                                        className={`w-full input ${errors.name ? 'border-red-500' : '' }`}
                                    />
                                    {errors.location && <span className='input-error'>{errors.location.message}</span>}
                                </div>

                                <div className="flex flex-row gap-4 w-full">
                                        <label htmlFor="allDay" className="label-secondary">
                                        All day
                                        </label>
                                        <input
                                        type="checkbox"
                                        id="allDay"
                                        checked={isAllDay}
                                        onChange={handleToggleAllDay}
                                        />
                                    </div>

                                <div className="flex flex-row gap-1 w-full">
                                    <div className="flex flex-col gap-1 w-full">
                                            <label 
                                                htmlFor="startDate" 
                                                className="label-secondary">Start Date</label>
                                            <input 
                                                id="startDate"
                                                type="date" 
                                                {...register('startDate', {required: 'Start date is required'})}
                                                className={`w-full input ${errors.dob ? 'border-red-500' : '' }`}
                                            />
                                            {errors.startDate && <span className='input-error'>{errors.startDate.message}</span>}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                            <label 
                                                htmlFor="startTime" 
                                                className="label-secondary">Start Time</label>
                                           <input
                                                id="startTime"
                                                type="time"
                                                {...register('startTime', { required: !isAllDay })}
                                                disabled={isAllDay}
                                                className={`disabled:text-typography-secondary w-full input ${errors.startTime ? 'border-red-500' : ''}`}
                                                />
                                    </div>
                                </div>
                             
                                <div className="flex flex-row gap-1 w-full">
                                                                       
                                    <div className="flex flex-col gap-1 w-full">
                                            <label 
                                                htmlFor="endDate" 
                                                className="label-secondary">End Date</label>
                                            <input 
                                                id="endDate"
                                                type="date" 
                                                {...register('endDate', {required: 'End date is required'})}
                                                className={`w-full input ${errors.dob ? 'border-red-500' : '' }`}
                                            />
                                            {errors.endDate && <span className='input-error'>{errors.endDate.message}</span>}
                                    </div>
                                                                          
                                    <div className="flex flex-col gap-1 w-full">
                                            <label 
                                            htmlFor="endTime" 
                                            className="label-secondary">End Time</label>
                                          <input
                                                id="endTime"
                                                type="time"
                                                {...register('endTime', { required: !isAllDay })}
                                                disabled={isAllDay}
                                                className={`disabled:text-typography-secondary w-full input ${errors.endTime ? 'border-red-500' : ''}`}
                                                />
                                            {errors.endTime && <span className='input-error'>{errors.endTime.message}</span>}
                                        </div>
                                </div>
                                 

                                <div className="flex flex-col gap-1 w-full">
                                    <label 
                                        htmlFor="type" 
                                        className="label-secondary">Event Type</label>
                                    <select
                                        id="type"
                                        className="input w-full"
                                        defaultValue="veterinary"
                                        {...register('type')}
                                    >
                                        <option value="veterinary">Veterinary</option>
                                        <option value="grooming">Grooming</option>
                                    </select>
                                </div>

                                <button disabled={loading.add} type="submit" className="mt-4 flex flex-row items-center justify-center gap-4 bg-typography-primary rounded-lg px-4 py-2 font-bold text-white hover:opacity-80 transition-all duration-300 ">
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
                                    {!loading.add && (<p>Create Event</p>)}
                                </button>
                    </div>
                </form>
            </div>
            
        </Popup>
    )
}

export default AddEventsPopup