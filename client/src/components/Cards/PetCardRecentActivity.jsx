import { useState } from "react"
import { genLogsColDefinitions } from "../../enums/PetLogs"
import ViewLogsPopup from "../Popup/ViewLogsPopup"
import PetTable from "../Table/PetTable"

const PetCardRecentActivity = ({logs}) => {
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    const [logData, setCurrentLogData] = useState(null)
    const openPopup = (row) => {
        setCurrentLogData(row)
        setIsPopupOpen(true)
    }
    const closePopup = () => setIsPopupOpen(false)
    const columns = genLogsColDefinitions(openPopup);

    return (
    <div className="flex flex-col gap-4 card p-6">
        <p className="font-bold text-xl">Recent Log Activity</p>
       <PetTable 
        data={logs} columns={columns}
        size={3}
       />
        <ViewLogsPopup data={logData} isOpen={isPopupOpen} onClose={closePopup}/>
    </div>
    )
}


export default PetCardRecentActivity