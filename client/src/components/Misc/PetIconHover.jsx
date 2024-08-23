import { getColorByIndex } from "../../utils/colors";
import { Tooltip } from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid';

const PetIconHover = ({pet}) => {
    const uniqueId = `tooltip-${pet._id}-${uuidv4()}`; 
    
    return (
        <div
            className="relative">
            <div data-tooltip-id={uniqueId}  className={`w-[20px] h-[20px] rounded-full ${getColorByIndex(pet.index)}`}>  </div>
            <Tooltip
                id={uniqueId}
                place="top"
                content={pet.name}
                key={pet.name}
            />
        </div>
    );
}

export default PetIconHover;