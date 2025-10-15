import React, { useState } from 'react';
import { Search, ArrowLeftRight, Calendar } from 'lucide-react';

export default function SearchForm({ onSearch }) {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [travelClass, setTravelClass] = useState('2A');

  const stations = [
    'New Delhi (NDLS)',
    'Mumbai Central (MMCT)',
    'Chennai Central (MAS)',
    'Kolkata (HWH)',
    'Bangalore (SBC)',
    'Hyderabad (HYB)',
    'Pune (PUNE)',
    'Ahmedabad (ADI)',
    'Lucknow (LKO)',
    'Kanpur Central (CNB)'
  ];

  const classes = [
    { code: '1A', name: 'First AC (1A)' },
    { code: '2A', name: 'Second AC (2A)' },
    { code: '3A', name: 'Third AC (3A)' },
    { code: 'SL', name: 'Sleeper (SL)' },
    { code: 'CC', name: 'AC Chair Car (CC)' },
    { code: '2S', name: 'Second Sitting (2S)' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromStation || !toStation || !journeyDate) {
      alert('Please fill in all required fields');
      return;
    }
    if (fromStation === toStation) {
      alert('Source and destination stations cannot be the same');
      return;
    }

    onSearch({
      from: fromStation,
      to: toStation,
      date: journeyDate,
      class: travelClass
    });
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Search Trains</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Station */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Station *
            </label>
            <select
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select departure station</option>
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>

          {/* To Station */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Station *
            </label>
            <select
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select arrival station</option>
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapStations}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>Swap Stations</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journey Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Journey Date *
            </label>
            <div className="relative">
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                min={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Travel Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Class
            </label>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map((cls) => (
                <option key={cls.code} value={cls.code}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Trains</span>
        </button>
      </form>
    </div>
  );
}
