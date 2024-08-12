import Calendar from 'react-calendar'
import { MdOutlinePets } from 'react-icons/md';
import AddButton from '../Buttons/AddButton';
import { useState } from 'react';
import AddEventsPopup from '../Popup/AddEventsPopup';

const PetEventMarker = () => {
    return <MdOutlinePets className='m-auto text-button-accent text-xs'/>
}

const PetCardCalendar = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    
    const markedDates = [
        new Date(2024, 7, 14), 
        new Date(2024, 7, 15),  
        new Date(2024, 7, 20), 
      ];
    
    const isDateMarked = (date) => {
    return markedDates.some(markedDate =>
        markedDate.getFullYear() === date.getFullYear() &&
        markedDate.getMonth() === date.getMonth() &&
        markedDate.getDate() === date.getDate()
    );
    };

      // Get the current date
    const currentDate = new Date();

    // Extract day, month, and year
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with leading zeros if necessary
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const year = currentDate.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <>
           <div className='flex gap-4 flex-col'>
            <div className='card p-6'>
                <Calendar
                    tileContent={({ date, view }) =>
                    view === 'month' && isDateMarked(date) ? (
                        <PetEventMarker/>
                    ) : null
                    }
                    />
            </div>
            <div className='card p-6 flex flex-col gap-4 '>
                <div className='flex flex-col'>
                        <p className="font-bold text-md flex flex-row">
                            Today's Events
                            <div className='flex-grow'></div>
                            <AddButton mini={true} onClick={openPopup}/>
                
                        </p>
                        <span><p className="label-secondary">{formattedDate}</p></span>
                </div>
                <div className='relative border-[1px] border-background-primary rounded-xl shadow-2xl shadow-gray-400/50 p-4 flex flex-row gap-4 overflow-hidden'>
                    <div className='absolute h-full w-[10px] left-0 top-0 bg-accent-primary '></div>
                    <div className='flex flex-col pl-4'>
                        <p className='label-secondary'>1.00 PM - 2.00 PM</p>
                        <p className='font-bold text-typography-primary'>Groomer's</p>
                        <p className='label-secondary font-italic'>Zul Erwan Grooming</p>
                    </div>
                </div>
            </div>
        </div>
        <AddEventsPopup isOpen={isPopupOpen}  onClose={closePopup}/>
        </>
     

        
    )
}

export default PetCardCalendar