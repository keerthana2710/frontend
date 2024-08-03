// src/EventList.js
import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [editedEvents, setEditedEvents] = useState([]);
    const [filterData,setFilterData]=useState([]);

    useEffect(()=>{
        try{
            const data = JSON.parse(localStorage.getItem('Logged_in'));
        const filterObject = (item)=>{
            setFilterData(events.filter(user => user.uid === item))
        } 
        filterObject(data.user.id)
        console.log(data)
        }   
        catch(err){
            console.log(err);
        }
    },[events])
    const handleEventEdit = (eventId, updatedData) => {
        setEditedEvents((prevEditedEvents) => {
            const existingEventIndex = prevEditedEvents.findIndex(event => event._id === eventId);
            if (existingEventIndex !== -1) {
                const updatedEditedEvents = [...prevEditedEvents];
                updatedEditedEvents[existingEventIndex] = { ...updatedEditedEvents[existingEventIndex], ...updatedData };
                return updatedEditedEvents;
            }
            return [...prevEditedEvents, { _id: eventId, ...updatedData }];
        });

        onEventEdit(eventId, updatedData);
    };

    return (
        <div className="event-list">
            {filterData.map(event => (
                <EventItem
                    key={event._id}
                    event={editedEvents.find(editedEvent => editedEvent._id === event._id) || event}
                    onToggleReminder={onToggleReminder}
                    onEventDelete={onEventDelete}
                    onEventEdit={handleEventEdit}
                />
            ))}
        </div>
    );
};

export default EventList;
