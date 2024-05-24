import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicketThunk } from '../redux/ticketSlice';

const TicketForm = ({ onFormSubmit }) => {
    const dispatch = useDispatch();
    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        standardAmount: '',
        vipAmount: ''
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(ticketData).forEach(key => {
            formData.append(key, ticketData[key]);
        });
        if (image) {
            formData.append('image', image);
        }

        await dispatch(createTicketThunk(formData));
        setTicketData({
            title: '',
            description: '',
            location: '',
            startDate: '',
            endDate: '',
            standardAmount: '',
            vipAmount: ''
        });
        setImage(null);
        onFormSubmit();
    };

    return (
        <div className='text-dark m-4'>
            <div className="container">
                <h2>Create Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={ticketData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={ticketData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={ticketData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={ticketData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={ticketData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Standard Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            name="standardAmount"
                            value={ticketData.standardAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">VIP Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            name="vipAmount"
                            value={ticketData.vipAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketForm;
