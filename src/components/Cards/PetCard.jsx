import { IoMdFemale } from "react-icons/io";
import { PiCatFill } from "react-icons/pi";
import { HiOutlineArrowLongRight } from "react-icons/hi2";


const PetCard = () => {
    return(
        <div className="bg-white rounded-xl p-4 flex flex-col w-[300px] min-h-[320px] gap-4">
            <div className="banner relative h-2/3">
                <div className="w-full bg-accent-primary h-3/4 rounded-xl"></div>
                <div className="absolute bg-background-primary w-[100px] h-[100px] rounded-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
            </div>
            <div className="flex flex-col px-2 flex-grow">
                <div className="flex flex-row items-center gap-3 ">
                    <p className="font-bold text-xl ">Luna</p>
                    <span><IoMdFemale className="text-typography-secondary" /></span>
                    <div className="flex-grow"></div>
                    <span><PiCatFill />
                    </span>
                </div>
                <p className="text-xs text-typography-secondary">Siberian</p>
                <div className="flex-grow"></div>
                <div  className="flex flex-row items-center gap-3 ">
                     <p className="text-[10px] text-typography-secondary">4 years 6 months</p>
                     <div className="flex-grow"></div>
                    <button className="text-lg rounded-xl bg-button-primary px-6 group hover:bg-accent-primary transition-all duration-300">
                        <HiOutlineArrowLongRight  className="text-accent-primary group-hover:text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default PetCard