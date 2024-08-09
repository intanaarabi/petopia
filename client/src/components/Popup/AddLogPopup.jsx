import { useForm } from "react-hook-form"
import { logsColDefinitions } from "../../enums/PetLogs"
import Popup from "./Popup"
import { useEffect } from "react"

const AddLogPopup = ({logType, isOpen, onClose}) => {
    const {register, handleSubmit, formState: {errors}, reset } = useForm()

    const fields = logsColDefinitions[logType]

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null

    const onSubmit = (data) => {
        console.log(data)
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
                        <button type="submit" className="flex flex-row items-center justify-center gap-4 bg-typography-primary rounded-lg px-4 py-2 font-bold text-white hover:opacity-80 transition-all duration-300 ">
                            <p>Create Log</p>
                        </button>
                    </form>
                </div>
         
        </Popup>
    ) 
}

export default AddLogPopup