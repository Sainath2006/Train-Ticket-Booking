import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';

export default function PassengerForm({ selectedSeats, train, selectedClass, onConfirm, onBack }) {
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat, index) => ({
      id: index + 1,
      seatNumber: seat,
      name: '',
      age: '',
      gender: '',
      idType: 'aadhar',
      idNumber: '',
      nationality: 'Indian'
    }))
  );

  const [contactDetails, setContactDetails] = useState({
    email: '',
    mobile: '',
    address: ''
  });

  const handlePassengerChange = (id, field, value) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    for (const passenger of passengers) {
      if (!passenger.name || !passenger.age || !passenger.gender || !passenger.idNumber) {
        alert('Please fill in all passenger details');
        return;
      }
    }
    
    if (!contactDetails.email || !contactDetails.mobile) {
      alert('Please fill in contact details');
      return;
    }

    onConfirm({ passengers, contactDetails });
  };

  const totalAmount = selectedClass?.price * passengers.length;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Passenger Details</h2>
            <p className="text-gray-600">
              {train?.name} - {selectedClass?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{passengers.length} Passenger(s)</span>
            <span>•</span>
            <span>Seats: {selectedSeats.join(', ')}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="text-2xl font-bold text-green-600">₹{totalAmount || 0}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Passenger Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Passenger Information</h3>
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Passenger {index + 1} - Seat {passenger.seatNumber}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(passenger.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(passenger.id, 'age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(passenger.id, 'gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Type *
                    </label>
                    <select
                      value={passenger.idType}
                      onChange={(e) => handlePassengerChange(passenger.id, 'idType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="passport">Passport</option>
                      <option value="driving">Driving License</option>
                      <option value="voter">Voter ID</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Number *
                    </label>
                    <input
                      type="text"
                      value={passenger.idNumber}
                      onChange={(e) => handlePassengerChange(passenger.id, 'idNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter ID number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <select
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(passenger.id, 'nationality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={contactDetails.email}
                onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={contactDetails.mobile}
                onChange={(e) => setContactDetails({...contactDetails, mobile: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={contactDetails.address}
                onChange={(e) => setContactDetails({...contactDetails, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter address"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
