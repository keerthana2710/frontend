import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const api = {
    key: '35b109c5192523fe2d96a665a067ab25',
    base: 'https://api.openweathermap.org/data/2.5',
};

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(event.title);
    const [editedDescription, setEditedDescription] = useState(event.description);
    const [editedLocation, setEditedLocation] = useState(event.location);
    const [editedDate, setEditedDate] = useState(moment(event.date).format("YYYY-MM-DD"));
    const [editedWeather, setEditedWeather] = useState(event.weather);

    useEffect(() => {
        const today = new Date();
        const eventDate = new Date(event.date);

        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);

        if (today.getTime() === eventDate.getTime() && event.reminder) {
            alert(`Today is the day of the event: ${event.title}`);
        }
    }, [event]);

    const fetchWeather = async (location) => {
        try {
            const response = await fetch(`${api.base}/weather?q=${location}&units=metric&appid=${api.key}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = async () => {
        let weather = editedWeather;
        if (editedLocation !== event.location) {
            const weatherData = await fetchWeather(editedLocation);
            if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
                weather = `${weatherData.weather[0].description}, Temp: ${weatherData.main.temp}°C`;
            } else {
                weather = 'Weather data not available';
            }
        }

        const updatedEvent = {
            title: editedTitle,
            description: editedDescription,
            location: editedLocation,
            date: editedDate,
            weather: weather
        };

        onEventEdit(event._id, updatedEvent);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedTitle(event.title);
        setEditedDescription(event.description);
        setEditedLocation(event.location);
        setEditedDate(moment(event.date).format("YYYY-MM-DD"));
        setEditedWeather(event.weather);
        setIsEditing(false);
    };

    return (
        <div className="event-card">
            {event.reminder && <p className='rem-para'>{event.reminder ? "Reminder On" : ""}</p>}
            <div className="event-info">
                {isEditing ? (
                    <>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                        <input type="text" value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} />
                        <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
                    </>
                ) : (
                    <>
                        <h3 className="event-title">{event.title}</h3>
                        <p>{event.description}</p>
                        <h4>{event.location}</h4>
                        <p>Weather: {event.weather || 'No weather data available'}</p>
                        <hr />
                        <span className="event-date">
                            <span style={{ fontWeight: "700" }}>Event On:</span>
                            {moment(event.date).add(1, 'days').calendar()}
                        </span>
                    </>
                )}
            </div>

            <div className="event-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className='btn rem-btn' onClick={() => onToggleReminder(event._id)}>
                            {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
                        </button>
                        <button className='btn delete-btn' onClick={() => onEventDelete(event._id)}>Delete</button>
                        <button className='btn edit-btn' onClick={handleEditClick}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventItem;
