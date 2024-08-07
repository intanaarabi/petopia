const DeleteButton = ({onClick}) => {
    return(
        <button onClick={onClick} className="rounded-2xl bg-white text-button-accent items-center flex flex-row gap-2 px-4 py-2 group hover:bg-button-primary  transition-all duration-300">
            <span className=""></span>
        </button>
    )
}

export default DeleteButton