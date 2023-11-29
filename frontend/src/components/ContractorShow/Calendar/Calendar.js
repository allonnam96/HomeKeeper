import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'
import { useDispatch } from 'react-redux';

const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: ''
    });
    const handleDateChange = (date) => {
        setStartDate(date);
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
      };
    

    return (
        <div className="calendar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="appointment-type">Appointment Type</label>
                <br/>
                <select id="appointment-type" className="slight-shadow">
                    <option value="default">Select One</option>
                    <option value="quote" >Quote</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                </select>
                <div>
                    <label>Select A time</label>
                    <DatePicker inline
                    selected={startDate} 
                    onChange={handleDateChange} 
                    showTimeSelect 
                    dateFormat="Pp"
                    />
                </div>
                <button className="button slight-shadow" type="submit">Request Quote</button>
            </form>
        </div>
    )
}

export default Calendar

