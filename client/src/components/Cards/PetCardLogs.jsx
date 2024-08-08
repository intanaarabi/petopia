import AddButton from "../Buttons/AddButton";
import Table from "../Table/Table"
import { IoAdd } from "react-icons/io5";

const PetCardLogs = ({type}) => {

    if (type === "Health") {
        return (
            <div className="card py-6 px-7 flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <p className="font-bold text-md">Health Logs</p>
                    <div className="flex-grow min-w-[170px]"></div>
                    <div className="flex flex-row gap-8 text-sm font-bold">
                        <button className="bg-white rounded-xl text-button-accent hover:bg-button-primary px-4">Vaccination</button>
                        <button className="bg-white rounded-xl text-button-accent  hover:bg-button-primary px-4">Medication</button>
                        <button className="bg-white rounded-xl text-button-accent  hover:bg-button-primary px-4">Medical History</button>
                        <AddButton mini={true}/>
                    </div>
                </div>
                <Table/>
            </div>  
    )
    }

    return (
        <div className="card py-6 px-7 flex flex-col gap-4">
        <div className="flex flex-row gap-2">
            <p className="font-bold text-md">Growth and Wellness Logs</p>
            <div className="flex-grow min-w-[170px]"></div>
            <div className="flex flex-row gap-8 text-sm font-bold">
                <button className="bg-white rounded-xl text-button-accent hover:bg-button-primary px-4">Grooming</button>
                <button className="bg-white rounded-xl text-button-accent  hover:bg-button-primary px-4">Weight</button>
                <AddButton mini={true}/>
            </div>
        </div>
        <Table/>
    </div>  
    )
}

export default PetCardLogs