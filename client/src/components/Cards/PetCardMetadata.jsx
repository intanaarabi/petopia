import { getColorByIndex } from "../../utils/colors"
import { getSexIcon, getSpeciesIcon } from "../../utils/icons"

const PetCardMetadata = ({pet}) => {

    return (
        <div className="card p-4 flex flex-col w-[300px] min-h-[320px] gap-4">
        <div className="banner relative h-2/3">
            <div className={`${getColorByIndex(pet.index)} w-full h-3/4 rounded-xl`}></div>
            <div className="absolute w-[100px] h-[100px] bg-background-primary rounded-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
        <div className="flex flex-col px-2 flex-grow">
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
        </div>
    </div>
    )
}

export default PetCardMetadata