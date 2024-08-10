import { useForm } from "react-hook-form"
import { logsColDefinitions } from "../../enums/PetLogs"
import Popup from "./Popup"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentPetMetadata } from "../../redux/features/pets/currentPetSlice"
import { addPetLog } from "../../redux/features/petLogs/logsThunk"
import { getPetLogs } from "../../redux/features/pets/currentPetThunk"
import ClipLoader from "react-spinners/ClipLoader"
import { selectLogsLoading } from "../../redux/features/petLogs/logsSlice"

const AddLogPopup = ({logType, isOpen, onClose}) => {
    const {register, handleSubmit, formState: {errors}, reset } = useForm()
    const dispatch = useDispatch()
    const fields = logsColDefinitions[logType]
    const pet = useSelector(selectCurrentPetMetadata)
    const loading = useSelector(selectLogsLoading)

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null

    const onSubmit = (data) => {
        const logBody = {
            petId: pet._id,
            type: logType,
            details: data
        }
        dispatch(addPetLog(logBody))
        .then(() => {
            dispatch(getPetLogs(pet._id))
            onClose()
        }
        )
    }

    return (
        <Popup onClose={onClose}>
                <div className="flex flex-col gap-4">
                    <p className="header flex flex-row">Add<span className="capitalize">&nbsp;{logType}&nbsp;</span>Log</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                        { fields.map((field,index) => (
                                   <div key={index} className="flex flex-col gap-1">
                                        <label 
                                            htmlFor={field.accessorKey}
                                            className="label-secondary">{field.header()}</label>
                                        {
                                            field.inputType === 'textarea' ? (
                                                <textarea 
                                                id={field.accessorKey}
                                                className="w-full min-h-[70px] input py-2"
                                                {...register(field.accessorKey, {
                                                    required: field.required ? `${field.header()} is required.` : false
                                                })}
                                                />
                                            )
                                            : (
                                                <input 
                                                id={field.accessorKey}
                                                type={field.inputType}
                                                step=".01"
                                                {...register(field.accessorKey, {
                                                    required: field.required ? `${field.header()} is required.` : false
                                                })}
                                                className={`w-full input ${errors[field.accessorKey] ? 'border-red-500' : ''}`}
                                                />
                                            )
                                        }
                                       
                                   {errors[field.accessorKey] && (
                                    <p className="text-red-500 text-xs">
                                        {errors[field.accessorKey]?.message}
                                    </p>
                                    )}
                                </div>
                        ))}

                        </div>
                        <button disabled={loading.add} type="submit" className="flex flex-row items-center justify-center gap-4 bg-typography-primary rounded-lg px-4 py-2 mt-2 font-bold text-white hover:opacity-80 transition-all duration-300 ">
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
                        {!loading.add && (<p>Create Log</p>)}
                        </button>
                    </form>
                </div>
         
        </Popup>
    ) 
}

export default AddLogPopup