import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const api = {
    key: '35b109c5192523fe2d96a665a067ab25',
    base: 'https://api.openweathermap.org/data/2.5',
};

const EventForm = ({ onEventAdd }) => {
    const [newEvent, setNewEvent] = useState({ title: '', date: '', uid: '', location: '', reminder: false, session_start: '', session_expire: '', description: '', weather: '' });

    useEffect(() => {
        try {
            const user_id = JSON.parse(localStorage.getItem('Logged_in'));
            setNewEvent(prevEvent => ({ ...prevEvent, uid: user_id.user.id, session_start: user_id.user.last_sign_in_at }));
        } catch (err) {
            console.log('Error:', err);
        }
    }, []);

    const fetchWeather = async (location) => {
        try {
            const response = await fetch(`${api.base}/weather?q=${location}&units=metric&appid=${api.key}`);
            const result = await response.json();
            console.log('Weather data:', result);  // Debugging line
            return result;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevEvent => ({ ...prevEvent, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let weather = '';
        if (newEvent.location) {
            const weatherData = await fetchWeather(newEvent.location);
            if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
                weather = `${weatherData.weather[0].description}, Temp: ${weatherData.main.temp}°C`;
            } else {
                weather = 'Weather data not available';
            }
        }
    
        // Update weather information in the event object
        const eventWithWeather = { ...newEvent, weather };
    
        axios.post('http://localhost:5001/api/events', eventWithWeather)
            .then(response => {
                onEventAdd(response.data);
                setNewEvent({ title: '', date: '', location: '', reminder: false, description: '', weather: '' });
            })
            .catch(error => {
                console.error('Error adding event:', error);
                alert('Failed to add event. Please try again later.');
            });
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div className='inputbox'>
                <label>Title:</label>
                <input type="text" name="title" placeholder='enter the title' value={newEvent.title} onChange={handleInputChange} required />
            </div>
            <div className='inputbox'>
                <label>Description:</label>
                <input type='text' name='description' placeholder='enter the description' value={newEvent.description} onChange={handleInputChange} required />
            </div>
            <div className='inputbox'>
                <label>Location:</label>
                <input type='text' name='location' placeholder='enter the city' value={newEvent.location} onChange={handleInputChange} required />
            </div>
            <div className='inputbox'>
                <label>Date:</label>
                <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
            </div>
            <div className="btnform">
                <button type="submit" className='btn'>Add Event</button>
            </div>
        </form>
    );
};

export default EventForm;
