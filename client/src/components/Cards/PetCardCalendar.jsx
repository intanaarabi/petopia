import Calendar from 'react-calendar'
import { MdOutlinePets } from 'react-icons/md';
import AddButton from '../Buttons/AddButton';
import { useEffect, useMemo, useState } from 'react';
import AddEventsPopup from '../Popup/AddEventsPopup';
import generateDateRanges from '../../utils/dateRange';
import PetIconHover from '../Misc/PetIconHover';

const PetEventMarker = () => {
    return <MdOutlinePets className={"m-auto text-xs custom-marker"} />;
};

const PetCardCalendar = ({events, allowAdd = true}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    const updatedEventObj = useMemo(() => {
        return (
            events?.map((eventObj) => ({
                ...eventObj, 
                dateRanges: generateDateRanges(eventObj.startDateTime, eventObj.endDateTime)
            })) || []
        );
    }, [events]);
    
    const markedDates = useMemo(() => {
        return updatedEventObj.flatMap((eventObj) => 
            eventObj.dateRanges.map((range) => new Date(range.date))
        );
    }, [updatedEventObj]);

    const isDateMarked = (date) => {
        return markedDates.some(markedDate =>
            markedDate.getFullYear() === date.getFullYear() &&
            markedDate.getMonth() === date.getMonth() &&
            markedDate.getDate() === date.getDate()
        );
    };
    
    // Convert selectedDate to a comparable string format
    const selectedDateString = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(selectedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, [selectedDate]);

    // Return event objects that have dates within selectedDate
    const currentEvents = useMemo(() => {
        return updatedEventObj.flatMap(
            (eventObj) => {
                return eventObj.dateRanges
                .filter(range => range.date === selectedDateString)
                .map(range => ({
                  pet: eventObj.pet,
                  title: eventObj.title,
                  location: eventObj.location,
                  date: range.date,
                  startTime: range.startTime,
                  endTime: range.endTime,
                })) || [];
            }
        )
      }, [updatedEventObj, selectedDateString]);

    useEffect(()=> {
        console.log('current events', currentEvents)
    },[currentEvents])

    return (
        <>
           <div className='flex gap-4 flex-col'>
            <div className='card p-6'>
            <Calendar
                    onClickDay={(val) => setSelectedDate(val)}
                    tileContent={({ date, view }) =>
                        view === 'month' && isDateMarked(date) ? (
                            <PetEventMarker />
                        ) : null
                    }
                />
            </div>
            <div className='card p-6 flex flex-col gap-4 '>
                <div className='flex flex-col'>
                        <div className="font-bold text-md flex flex-row">
                            <p>Upcoming Events</p>
                            <div className='flex-grow'></div>
                            {allowAdd && <AddButton mini={true} onClick={openPopup}/>}
                        </div>
                        <span><p className="label-secondary">{selectedDateString}</p></span>
                </div>
                {
                    currentEvents.length > 0 ? 
                        currentEvents.map((event, index) => (
                            <div key={index} className='relative border-[1px] border-background-primary rounded-xl shadow-2xl shadow-gray-400/50 p-4 flex flex-row gap-4 overflow-hidden'>
                                <div className='absolute h-full w-[10px] left-0 top-0 bg-accent-primary '></div>
                                <div className='flex flex-row w-full items-center'>
                                    <div className='flex flex-col pl-4'>
                                        <p className='label-secondary'>{event.startTime} - {event.endTime}</p>
                                        <p className='font-bold text-typography-primary'>{event.title}</p>
                                        <p className='label-secondary font-italic'>{event.location}</p>
                                    </div>
                                    <div className='flex-grow'></div>`
                                    <PetIconHover pet={event.pet}/>
                                </div>
                           
                            </div>
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