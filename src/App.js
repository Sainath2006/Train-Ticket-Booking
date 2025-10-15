import React, { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import TrainList from "./components/TrainList";
import SeatSelection from "./components/SeatSelection";
import PassengerForm from "./components/PassengerForm";
import PaymentForm from "./components/PaymentForm";
import BookingConfirmation from "./components/BookingConfirmation";
import LoginModal from "./components/LoginModal";
import BookingHistory from "./components/BookingHistory";
import { mockTrains, generateTrainsForRoute } from "./data/mockData";
import "./Style.css";
import "./App.css";


function App() {
  const [availableTrains, setAvailableTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentStep, setCurrentStep] = useState("search");
  const [showLogin, setShowLogin] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = (from, to, date) => {
    const trains = generateTrainsForRoute(from, to, date);
    setAvailableTrains(trains);
    setCurrentStep("results");
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setCurrentStep("seats");
  };

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
    setCurrentStep("passenger");
  };

  const handlePassengerForm = (passengerData) => {
    const details = {
      train: selectedTrain,
      seats: selectedSeats,
      passengers: passengerData,
    };
    setBookingDetails(details);
    setCurrentStep("payment");
  };

  const handlePayment = (paymentData) => {
    const finalBooking = { ...bookingDetails, payment: paymentData };
    setHistory([...history, finalBooking]);
    setBookingDetails(finalBooking);
    setCurrentStep("confirmation");
  };

  return (
    <div className="App">
      <Header onLogin={() => setShowLogin(true)} />

      {currentStep === "search" && <SearchForm onSearch={handleSearch} />}

      {currentStep === "results" && (
        <TrainList trains={availableTrains} onSelectTrain={handleSelectTrain} />
      )}

      {currentStep === "seats" && (
        <SeatSelection
          train={selectedTrain}
          onSeatSelection={handleSeatSelection}
        />
      )}

      {currentStep === "passenger" && (
        <PassengerForm onSubmit={handlePassengerForm} />
      )}

      {currentStep === "payment" && (
        <PaymentForm onSubmit={handlePayment} bookingDetails={bookingDetails} />
      )}

      {currentStep === "confirmation" && bookingDetails && (
        <BookingConfirmation details={bookingDetails} />
      )}

      <BookingHistory history={history} />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;
