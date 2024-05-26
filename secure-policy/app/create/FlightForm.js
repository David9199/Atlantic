"use client";

import React, { useState, useEffect } from 'react';

const FlightForm = () => {
    const [form, setForm] = useState({
        airport: '',
        date: '',
        flightNumber: '',
        ticketNumber: '',
        amount: ''
    });

    const [airports, setAirports] = useState([]);
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await fetch('/api/airports');
                const data = await response.json();
                setAirports(data);
            } catch (error) {
                console.error('Error fetching airports:', error);
            }
        };

        fetchAirports();
    }, []);

    const fetchFlights = async () => {
        if (!form.airport || !form.date) {
            return;
        }
        const selectedAirport = airports.find(airport => airport.name === form.airport);
        if (selectedAirport) {
            try {
                const response = await fetch(`/api/flights?airportId=${selectedAirport.id}&date=${form.date}`);
                const data = await response.json();
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'amount' && isNaN(value)) {
            return; // Only allow numbers in amount
        }

        if (name === 'date') {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            formattedValue = `${year}-${month}-${day}`;
        }

        setForm((prevForm) => ({
            ...prevForm,
            [name]: formattedValue
        }));

        // 在选择日期或机场后立即调用 fetchFlights
        if ((name === 'date' && form.airport) || (name === 'airport' && form.date)) {
            fetchFlights();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mt-[-100px]">
                <div className="w-1/2 bg-cover" style={{ backgroundImage: "url('/plane.jpg')" }}></div>
                <div className="w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Flight Assure</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="airport" className="block text-sm font-medium text-gray-700">Airport</label>
                            <select
                                id="airport"
                                name="airport"
                                value={form.airport}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select an airport</option>
                                {airports.map((airport) => (
                                    <option key={airport.id} value={airport.name}>{airport.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">Flight Number</label>
                            <select
                                id="flightNumber"
                                name="flightNumber"
                                value={form.flightNumber}
                                onFocus={fetchFlights}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a flight number</option>
                                {flights.map((flight) => (
                                    <option key={flight.id} value={flight.flightNumber}>{flight.flightNumber}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700">Ticket Number</label>
                            <input
                                type="text"
                                id="ticketNumber"
                                name="ticketNumber"
                                value={form.ticketNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Share)</label>
                            <input
                                disabled="true"
                                type="text"
                                id="amount"
                                name="amount"
                                value="1"
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FlightForm;
