// pages/register.js
"use client"
// pages/register.js
import { useState } from 'react';
import Image from 'next/image';

const countries = [
    'China',
    'United States',
    'Canada',
    'Australia',
    'United Kingdom',
    // 添加更多国家
];

export default function Register() {
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightTime, setFlightTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country, date, flightNumber, flightTime }),
        });

        const result = await response.json();
        setMessage(result.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                <div className="w-1/2 bg-cover">
                    <Image src="/plane.jpg" alt="Flying Plane" width={700} height={700} className="object-cover h-full w-full" />
                </div>
                <div className="w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Flight Assure</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select your country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">
                                Flight Number
                            </label>
                            <input
                                type="text"
                                id="flightNumber"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="flightTime" className="block text-sm font-medium text-gray-700">
                                Flight Time
                            </label>
                            <input
                                type="time"
                                id="flightTime"
                                value={flightTime}
                                onChange={(e) => setFlightTime(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            submit
                        </button>
                    </form>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                </div>
            </div>
        </div>
    );
}
