import Calendar from 'react-calendar'
import { MdOutlinePets } from 'react-icons/md';
import AddButton from '../Buttons/AddButton';
import { useMemo, useState } from 'react';
import AddEventsPopup from '../Popup/AddEventsPopup';

const PetEventMarker = () => {
    return <MdOutlinePets className='m-auto text-button-accent text-xs'/>
}

const PetCardCalendar = ({events}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    // Collect all dates from dateRanges
    const markedDates = useMemo(() => {
        return events?.flatMap(event => event.dateRanges.map(range => new Date(range.date))) || [];
    }, [events]);

    // Convert selectedDate to a comparable string format
    const selectedDateString = useMemo(() => {
        return selectedDate.toISOString().split('T')[0];
    }, [selectedDate]);

    // Return event objects that have dates within selectedDate
    const currentEvents = useMemo(() => {
        return events?.flatMap(event => {
          return event.dateRanges
            .filter(range => range.date === selectedDateString)
            .map(range => ({
              title: event.title,
              location: event.location,
              date: range.date,
              startTime: range.startTime,
              endTime: range.endTime,
            }));
        }) || [];
      }, [events, selectedDateString]);
    

    const isDateMarked = (date) => {
        return markedDates.some(markedDate =>
            markedDate.getFullYear() === date.getFullYear() &&
            markedDate.getMonth() === date.getMonth() &&
            markedDate.getDate() === date.getDate()
        );
    };

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
                        <div className="font-bold text-md flex flex-row">
                            <p>Upcoming Events</p>
                            <div className='flex-grow'></div>
                            <AddButton mini={true} onClick={openPopup}/>
                        </div>
                        <span><p className="label-secondary">{}</p></span>
                </div>
                {
                    currentEvents.length > 0 ? 
                        currentEvents.map((event, index) => (
                            <>
                            <div key={index} className='relative border-[1px] border-background-primary rounded-xl shadow-2xl shadow-gray-400/50 p-4 flex flex-row gap-4 overflow-hidden'>
                                <div className='absolute h-full w-[10px] left-0 top-0 bg-accent-primary '></div>
                                <div className='flex flex-col pl-4'>
                                    <p className='label-secondary'>{event.startTime} - {event.endTime}</p>
                                    <p className='font-bold text-typography-primary'>{event.title}</p>
                                    <p className='label-secondary font-italic'>{event.location}</p>
                                </div>
                            </div>
                            </>
                        ))
                     : (
                    <> No Upcoming Events</>
                    )
                }
              
            </div>
        </div>
        <AddEventsPopup isOpen={isPopupOpen}  onClose={closePopup}/>
        </>
     

        
    )
}

export default PetCardCalendar