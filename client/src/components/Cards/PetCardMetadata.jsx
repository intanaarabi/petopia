import { calculateAge, formatDate } from "../../utils/age"
import { getColorByIndex } from "../../utils/colors"
import { getSexIcon, getSpeciesIcon } from "../../utils/icons"
import { FaBirthdayCake } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

const PetCardMetadata = ({pet}) => {

    return (
        <div className="card p-4 flex flex-col w-[300px] gap-4">
        <div className="banner relative  min-h-[180px] ">
            <div className={`${getColorByIndex(pet.index)} w-full h-3/4 rounded-xl`}></div>
            <div className="absolute w-[100px] h-[100px] bg-background-primary rounded-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
        <div className="flex flex-col px-2 flex-grow gap-4">
            <div className="flex flex-row items-center gap-3 ">
                <p className="font-bold text-xl ">{pet.name}</p>
                <span>
                    {getSexIcon(pet.sex)}
                </span>
                <div className="flex-grow"></div>
                <span>
                     {getSpeciesIcon(pet.species)}
                </span>
            </div>
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                        <FaBirthdayCake /> Birthday
                    </div>
                    <div className="text-xs font-bold text-typography-primary pl-5">
                        {formatDate(pet.dob)} - {calculateAge(pet.dob)}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                    <MdOutlinePets />
                    Breed
                    </div>
                    <div className="text-xs font-bold text-typography-primary pl-5">
                        {pet.breed}
                    </div>
                </div>
            </div>
           <div className="border-t mt-2 flex items-center justify-center text-xs font-bold pt-4">
                {pet.description}
           </div>
        </div>
    </div>
    )
}

export default PetCardMetadata