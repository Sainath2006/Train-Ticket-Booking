import React from 'react';
import { Calendar, Clock, MapPin, Download, Users } from 'lucide-react';

export default function BookingHistory({ user }) {
  // Mock booking data
  const bookings = [
    {
      id: 1,
      pnr: 'PNR123456',
      trainName: 'Rajdhani Express',
      trainNumber: '12001',
      from: 'New Delhi (NDLS)',
      to: 'Mumbai Central (MMCT)',
      date: '2024-02-15',
      departure: '16:55',
      arrival: '08:35',
      duration: '15h 40m',
      class: 'Second AC (2A)',
      seats: ['A1', 'A2'],
      passengers: 2,
      amount: 4580,
      status: 'Confirmed',
      bookingDate: '2024-01-20'
    },
    {
      id: 2,
      pnr: 'PNR789012',
      trainName: 'Shatabdi Express',
      trainNumber: '12002',
      from: 'Chennai Central (MAS)',
      to: 'Bangalore (SBC)',
      date: '2024-01-25',
      departure: '06:00',
      arrival: '11:00',
      duration: '5h 00m',
      class: 'AC Chair Car (CC)',
      seats: ['C15'],
      passengers: 1,
      amount: 1250,
      status: 'Completed',
      bookingDate: '2024-01-10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
  <p className="text-gray-600">
    Welcome back, {user?.name || "Guest"}! Here are your recent bookings.
  </p>
</div>


      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Users className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{booking.trainName}</h3>
                    <p className="text-gray-600">PNR: {booking.pnr} • #{booking.trainNumber}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{booking.from}</div>
                      <div className="text-sm text-gray-600">to {booking.to}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{new Date(booking.date).toDateString()}</div>
                      <div className="text-sm text-gray-600">Journey Date</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{booking.departure} - {booking.arrival}</div>
                      <div className="text-sm text-gray-600">Duration: {booking.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Class</div>
                    <div className="font-medium">{booking.class}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600">Seats</div>
                    <div className="font-medium">{booking.seats.join(', ')}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600">Passengers</div>
                    <div className="font-medium">{booking.passengers}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="font-medium text-green-600">₹{booking.amount}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm">
                    <Download className="h-4 w-4" />
                    <span>Download Ticket</span>
                  </button>
                  
                  {booking.status === 'Confirmed' && (
                    <button className="flex items-center space-x-2 border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-colors text-sm">
                      <span>Cancel Booking</span>
                    </button>
                  )}
                  
                  <div className="text-sm text-gray-500 flex items-center ml-auto">
                    Booked on {new Date(booking.bookingDate).toDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
