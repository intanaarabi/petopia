import { IoAddCircle } from "react-icons/io5";


const AddButton = ({text, onClick}) => {
    return(
    <button onClick={onClick} className="rounded-2xl bg-white text-button-accent items-center flex flex-row gap-2 px-4 py-2 hover:bg-button-primary  transition-all duration-300">
        <span className=""><IoAddCircle /></span>
        <p className="text-xs" >{text}</p>
    </button>
    )
}

export default AddButton