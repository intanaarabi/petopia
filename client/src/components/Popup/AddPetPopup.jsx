import Popup from "./Popup"
import { BiSolidImageAdd } from "react-icons/bi";

const AddPetPopup = ({isOpen, onClose}) => {

    if (!isOpen) return null

    const handleSubmit = () => onClose;

    return(
        <Popup onClose={onClose}>
            <div className="flex flex-col gap-4">

            <p className="header">Add New Pet</p>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col flex-grow gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="label">Name</p>
                                <input type="text" name="text" placeholder="e.g. Cheeto" className="w-full input"/>
                            </div>

                            <div className="flex flex-row gap-6 ">

                                <div className="flex flex-col gap-1 w-full">
                                    <p className="label">Birthday</p>
                                    <input type="date" name="date" placeholder="e.g. Cheeto" className="w-full input"/>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p className="label">Sex</p>
                                    <select
                                        id="sex"
                                        name="sex"
                                        className="input w-full"
                                        defaultValue="male"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>


                            </div>

                            <div className="flex flex-row gap-6 ">
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="label">Species</p>
                                    <select
                                        id="species"
                                        name="species"
                                        className="input w-full"
                                        defaultValue="cat"
                                    >
                                        <option value="cat">Cat</option>
                                        <option value="dog">Dog</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <p className="label">Breed</p>
                                    <input type="text" name="text" placeholder="e.g. Persian" className="w-full input"/>
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
                        <p className="label">Description</p>
                        <textarea placeholder="" maxLength="300" className="w-full min-h-[70px] input py-2"/>
                    </div>
                    <button type="submit" className="bg-typography-primary rounded-lg px-4 py-2 font-bold text-white hover:opacity-80 transition-all duration-300 ">Create Pet</button>
                </div>
                </form>
            </div>
            
        </Popup>
    )
}

export default AddPetPopup