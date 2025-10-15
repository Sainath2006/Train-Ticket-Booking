import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function SeatSelection({ train, selectedClass, searchData, onConfirm, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);

  // Generate seat map based on class
  const generateSeats = () => {
    const seats = [];
    const seatsPerRow =
      selectedClass.code === "1A" ? 2 : selectedClass.code === "2A" ? 4 : 6;
    const rows =
      selectedClass.code === "1A" ? 8 : selectedClass.code === "2A" ? 12 : 16;

    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = `${row}${String.fromCharCode(64 + seat)}`;
        const isBooked = Math.random() < 0.3; // 30% seats already booked
        const isPreferred = seat <= 2; // Window seats are preferred

        seats.push({
          number: seatNumber,
          isBooked,
          isPreferred,
          type:
            seat <= 2
              ? "Window"
              : seat >= seatsPerRow - 1
              ? "Window"
              : "Middle",
        });
      }
    }

    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length !== passengerCount) {
      alert(`Please select exactly ${passengerCount} seat(s)`);
      return;
    }
    onConfirm(selectedSeats);
  };

  const getSeatColor = (seat) => {
    if (seat.isBooked) return "bg-red-200 cursor-not-allowed";
    if (selectedSeats.includes(seat.number))
      return "bg-blue-500 text-white";
    if (seat.isPreferred)
      return "bg-green-100 hover:bg-green-200 cursor-pointer";
    return "bg-gray-100 hover:bg-gray-200 cursor-pointer";
  };

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
            <h2 className="text-2xl font-bold text-gray-900">Select Seats</h2>
            <p className="text-gray-600">
              {train.name} - {selectedClass.name} (₹{selectedClass.price})
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Passengers
              </label>
              <select
                value={passengerCount}
                onChange={(e) => {
                  setPassengerCount(Number(e.target.value));
                  setSelectedSeats([]);
                }}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="text-2xl font-bold text-green-600">
              ₹{selectedClass.price * passengerCount}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Seat Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded border"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded border"></div>
            <span className="text-sm text-gray-600">Window/Preferred</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-200 rounded"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {seats.map((seat) => (
              <button
                key={seat.number}
                onClick={() => !seat.isBooked && handleSeatClick(seat.number)}
                disabled={seat.isBooked}
                className={`w-8 h-8 md:w-10 md:h-10 rounded text-xs font-medium border transition-colors ${getSeatColor(
                  seat
                )}`}
                title={`Seat ${seat.number} - ${seat.type}`}
              >
                {seat.number}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Selected Seats:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={selectedSeats.length !== passengerCount}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-8 rounded-md transition-colors"
          >
            Continue to Passenger Details
          </button>
        </div>
      </div>
    </div>
  );
}
