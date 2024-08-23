const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};


const generateDateRanges = (startDateTime, endDateTime, title, location) => {
    const startLocal = new Date(startDateTime);
    const endLocal = new Date(endDateTime);

    const dates = [];
    let currentDate = new Date(startLocal);

    while (currentDate <= endLocal) {
        const isStartDate = currentDate.toDateString() === startLocal.toDateString();
        const isEndDate = currentDate.toDateString() === endLocal.toDateString();

        dates.push({
            title: title,
            location: location,
            date: formatDate(currentDate),
            startTime: isStartDate ? formatTime(startLocal) : '12:00 AM', // Format start time as hh:mm AM/PM
            endTime: isEndDate ? formatTime(endLocal) : '11:59 PM', // Format end time as hh:mm AM/PM
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0); // Reset to the start of the day

        // If currentDate goes beyond the endLocal date and we haven't added the end date yet
        if (currentDate > endLocal && !isEndDate) {
            dates.push({
                title: title,
                location: location,
                date: formatDate(endLocal),
                startTime: '12:00 AM', 
                endTime: formatTime(endLocal) 
            });
        }
    }

    return dates;
};

export {formatDate}
export default generateDateRanges;