
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { getSexIcon, getSpeciesIcon } from "../../utils/icons";
import { getColorByIndex } from "../../utils/colors";
import { useNavigate } from "react-router-dom";

const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return `${years} years ${months} months`;
  };


const PetCard = ({pet, mini = false}) => {
    const {name, dob, sex, breed, species} = pet
    const age = calculateAge(dob)
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/pets/${pet._id}`);
    };

    return(
        <>
        { !mini && (
                    <div className="card p-4 flex flex-col w-[300px] min-h-[320px] gap-4">
                    <div className="banner relative h-2/3">
                        <div className={`${getColorByIndex(pet.index)} w-full h-3/4 rounded-xl`}></div>
                        <div className="absolute w-[100px] h-[100px] bg-background-primary rounded-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
                    </div>
                    <div className="flex flex-col px-2 flex-grow">
                        <div className="flex flex-row items-center gap-3 ">
                            <p className="font-bold text-xl ">{name}</p>
                            <span>
                                {getSexIcon(sex)}
                            </span>
                            <div className="flex-grow"></div>
                            <span>
                                 {getSpeciesIcon(species)}
                            </span>
                        </div>
                        <p className="text-xs text-typography-secondary">{breed}</p>
                        <div className="flex-grow"></div>
                        <div  className="flex flex-row items-center gap-3 ">
                             <p className="text-[10px] text-typography-secondary">{age}</p>
                             <div className="flex-grow"></div>
                                <button onClick={()=>handleNavigate()} className="text-lg rounded-xl bg-button-primary px-6 group hover:bg-accent-primary transition-all duration-300">
                                    <HiOutlineArrowLongRight  className="text-accent-primary group-hover:text-white" />
                                </button>
                        </div>
                    </div>
                </div>
        )}
        { mini && (
            <div className="card p-4 flex flex-row gap-6 w-[300px]">
                <div className={`${getColorByIndex(pet.index)} min-w-[80px] min-h-[80px] rounded-2xl`}>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                        <p className="font-bold text-lg">{name}</p>
                        {getSexIcon(sex)}
                    </div>
                    <p className="text-xs text-typography-secondary">{breed}</p>
                    <div className="flex-grow"></div>
                    <p className="text-[11px] text-typography-secondary">{age}</p>
                </div>
            </div>
        )}
        </>


    )
}


export default PetCard