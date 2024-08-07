import { HiOutlineArrowLongLeft } from "react-icons/hi2";


const BackButton = ({onClick}) => {
    return(
        <button onClick={onClick} className="text-lg text-button-accent rounded-xl bg-white px-6 group transition-all duration-300 hover:bg-button-primary ">
            <HiOutlineArrowLongLeft  />
        </button>
    )
}

export default BackButton