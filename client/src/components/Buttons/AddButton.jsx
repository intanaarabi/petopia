import { IoAddCircle } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

const AddButton = ({text, onClick, mini = false}) => {
    if (mini) {
        return (
            <button onClick={onClick} className="rounded-full p-1 bg-button-primary hover:bg-button-accent hover:text-white transition-all duration-300">
                <IoAdd size="16px"/>
            </button>
        )
    }

    return(
    <button onClick={onClick} className="rounded-2xl bg-white text-button-accent items-center flex flex-row gap-2 px-4 py-2 hover:bg-button-primary  transition-all duration-300">
        <span className=""><IoAddCircle /></span>
        <p className="hidden sm:block sm:text-xs" >{text}</p>
    </button>
    )
}

export default AddButton