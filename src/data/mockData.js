// mockData.js

export const mockTrains = [
  {
    id: '1',
    name: 'Rajdhani Express',
    number: '12001',
    departure: '16:55',
    arrival: '08:35+1',
    duration: '15h 40m',
    from: 'NDLS',
    to: 'MMCT',
    classes: [
      { code: '1A', name: 'First AC (1A)', price: 6540, availability: 'Available', available: true },
      { code: '2A', name: 'Second AC (2A)', price: 4580, availability: 'Available', available: true },
      { code: '3A', name: 'Third AC (3A)', price: 3210, availability: 'RAC 5', available: true },
      { code: 'SL', name: 'Sleeper (SL)', price: 1240, availability: 'WL 23', available: true }
    ]
  },
  {
    id: '2',
    name: 'Mumbai Express',
    number: '12002',
    departure: '20:10',
    arrival: '14:25+1',
    duration: '18h 15m',
    from: 'NDLS',
    to: 'MMCT',
    classes: [
      { code: '2A', name: 'Second AC (2A)', price: 3890, availability: 'Available', available: true },
      { code: '3A', name: 'Third AC (3A)', price: 2750, availability: 'Available', available: true },
      { code: 'SL', name: 'Sleeper (SL)', price: 980, availability: 'Available', available: true },
      { code: '2S', name: 'Second Sitting (2S)', price: 485, availability: 'Available', available: true }
    ]
  },
  {
    id: '3',
    name: 'Grand Trunk Express',
    number: '12615',
    departure: '07:20',
    arrival: '04:50+1',
    duration: '21h 30m',
    from: 'NDLS',
    to: 'MAS',
    classes: [
      { code: '1A', name: 'First AC (1A)', price: 8950, availability: 'WL 12', available: true },
      { code: '2A', name: 'Second AC (2A)', price: 5460, availability: 'Available', available: true },
      { code: '3A', name: 'Third AC (3A)', price: 3890, availability: 'Available', available: true },
      { code: 'SL', name: 'Sleeper (SL)', price: 1435, availability: 'Available', available: true }
    ]
  },
  {
    id: '4',
    name: 'Shatabdi Express',
    number: '12002',
    departure: '06:00',
    arrival: '11:00',
    duration: '5h 00m',
    from: 'MAS',
    to: 'SBC',
    classes: [
      { code: 'CC', name: 'AC Chair Car (CC)', price: 1250, availability: 'Available', available: true },
      { code: '2S', name: 'Second Sitting (2S)', price: 620, availability: 'RAC 2', available: true }
    ]
  },
  {
    id: '5',
    name: 'Howrah Express',
    number: '12869',
    departure: '22:45',
    arrival: '17:20+1',
    duration: '18h 35m',
    from: 'MAS',
    to: 'HWH',
    classes: [
      { code: '2A', name: 'Second AC (2A)', price: 4890, availability: 'Available', available: true },
      { code: '3A', name: 'Third AC (3A)', price: 3450, availability: 'WL 8', available: true },
      { code: 'SL', name: 'Sleeper (SL)', price: 1280, availability: 'Available', available: true }
    ]
  }
];

// Function to generate trains for route
export const generateTrainsForRoute = (from, to, date) => {
  // Extract station codes if present in format "Station (CODE)"
  const fromCode = (from.match(/\(([^)]+)\)/) || [])[1] || from;
  const toCode = (to.match(/\(([^)]+)\)/) || [])[1] || to;

  return mockTrains
    .filter(train => {
      return (
        (train.from === fromCode && train.to === toCode) ||
        (train.from === toCode && train.to === fromCode) ||
        Math.random() > 0.3 // Show random trains for demo
      );
    })
    .slice(0, 4); // Limit to 4 trains for demo
};
