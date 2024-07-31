const Popup = ({ onClose, children}) => {

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div onClick={onClose} className="fixed inset-0 bg-black opacity-50"></div>
            <div onClick={(e)=>e.stopPropagation()} className="bg-white p-8 rounded-xl shadow-lg z-10 w-[700px] max-h-[85%] overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default Popup