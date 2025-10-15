import React from 'react';
import { CheckCircle, Download, Share, Calendar, Clock, Users, MapPin } from 'lucide-react';

export default function BookingConfirmation({ bookingData, onNewBooking }) {
  const pnr = `PNR${Date.now().toString().slice(-6)}`;

  const handleDownloadTicket = () => {
    alert('Ticket download functionality would be implemented here');
  };

  const handleShareTicket = () => {
    alert('Ticket sharing functionality would be implemented here');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Booking Confirmed!</h1>
          <p className="text-green-700">Your train ticket has been successfully booked</p>
        </div>
      </div>

      {/* PNR and Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PNR: {pnr}</h2>
          <p className="text-gray-600">Keep this PNR number safe for future reference</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Ticket</span>
          </button>
          <button
            onClick={handleShareTicket}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Share className="h-4 w-4" />
            <span>Share Ticket</span>
          </button>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Journey Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">{bookingData.searchData?.from}</div>
                <div className="text-sm text-gray-600">to {bookingData.searchData?.to}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">
                  {new Date(bookingData.searchData?.date).toDateString()}
                </div>
                <div className="text-sm text-gray-600">Journey Date</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">
                  {bookingData.train?.departure} - {bookingData.train?.arrival}
                </div>
                <div className="text-sm text-gray-600">
                  Duration: {bookingData.train?.duration}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Train Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Train Details</h3>
          
          <div className="space-y-3">
            <div>
              <div className="font-medium text-lg">{bookingData.train?.name}</div>
              <div className="text-gray-600">#{bookingData.train?.number}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Class</div>
              <div className="font-medium">{bookingData.selectedClass?.name}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Seats</div>
              <div className="font-medium">{bookingData.selectedSeats?.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Age</th>
                <th className="text-left py-2">Gender</th>
                <th className="text-left py-2">Seat</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.passengers?.passengers?.map((passenger, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{passenger.name}</td>
                  <td className="py-3">{passenger.age}</td>
                  <td className="py-3 capitalize">{passenger.gender}</td>
                  <td className="py-3">{passenger.seatNumber}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600">Payment Method</div>
            <div className="font-medium capitalize">{bookingData.paymentData?.method}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Transaction ID</div>
            <div className="font-medium">{bookingData.paymentData?.transactionId}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Amount Paid</div>
            <div className="font-medium text-green-600">₹{bookingData.paymentData?.amount}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <div className="font-medium">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
        
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Please carry a valid ID proof during your journey</p>
          <p>• Arrive at the station at least 30 minutes before departure</p>
          <p>• Your ticket has been sent to your registered email and mobile number</p>
          <p>• For any queries, contact our helpline: 139</p>
        </div>
      </div>

      {/* New Booking Button */}
      <div className="text-center">
        <button
          onClick={onNewBooking}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md transition-colors"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  );
}
