import Popup from "./Popup"

const ViewLogsPopup = ({data, isOpen,onClose}) => {
    if (!isOpen) return null;

    return <Popup width={500} onClose={onClose}>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">View Log Details</p>
          <div className="flex flex-wrap gap-12">
                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                        Pet
                    </div>
                    <div className="text-xs font-bold text-typography-primary capitalize">
                        {data.pet.name}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                        Type
                    </div>
                    <div className="text-xs font-bold text-typography-primary capitalize">
                        {data.type}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                        Created Date
                    </div>
                    <div className="text-xs font-bold text-typography-primary capitalize">
                        {data.createdDate.split('T')[0]}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="label-secondary flex flex-row items-center gap-2">
                        Updated Date
                    </div>
                    <div className="text-xs font-bold text-typography-primary capitalize">
                        {data.updatedDate.split('T')[0]}
                    </div>
                </div>
          </div>
          <div className="border-t border-1"></div>
          <div className="flex flex-wrap gap-12">
            {Object.entries(data.details).map(([key, value]) => (
                 <div key={key} className="flex flex-col gap-1">
                    <div className="capitalize label-secondary flex flex-row items-center gap-2">
                        {key}
                    </div>
                    <div className="text-xs font-bold text-typography-primary capitalize">
                        {value}
                    </div>
                </div>
                ))}
          </div>
        </div>
    </Popup>
}

export default ViewLogsPopup