const express = require('express');
const app = express();
const PORT = 3000; // Choose a port number

// Middleware
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// POST /rooms
app.post('/rooms', (req, res) => {
  // Extract room details from the request body
  const { number, seats, amenities, pricePerHour } = req.body;

  // Logic to create a room with the provided details

  // Return the newly created room
  res.status(201).json({ message: 'Room created successfully' });
});
// POST /bookings
app.post('/bookings', (req, res) => {
  // Extract booking details from the request body
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Logic to book a room with the provided details

  // Return the booking confirmation
  res.status(201).json({ message: 'Room booked successfully' });
});
// GET /rooms
app.get('/rooms', (req, res) => {
  // Logic to retrieve all rooms with booking data

  // Return the list of rooms with booking data
  res.status(200).json({ rooms });
});
// GET /customers
app.get('/customers', (req, res) => {
  // Logic to retrieve all customers with booking data

  // Return the list of customers with booking data
  res.status(200).json({ customers });
});
// GET /customers/:customerId/bookings
app.get('/customers/:customerId/bookings', (req, res) => {
  const { customerId } = req.params;

  // Logic to retrieve booking details for the specified customer

  // Return the list of booking details for the customer
  res.status(200).json({ bookings });
});
// Create an array to store the rooms
let rooms = [];

// POST /rooms
app.post('/rooms', (req, res) => {
  // Extract room details from the request body
  const { seats, amenities, pricePerHour } = req.body;

  // Generate a unique room ID
  const roomId = generateRoomId();

  // Create a room object with the provided details
  const room = {
    roomId,
    seats,
    amenities,
    pricePerHour
  };

  // Add the room to the rooms array
  rooms.push(room);

  // Return a success response
  res.status(201).json({ message: 'Room created successfully' });
});

// Function to generate a unique room ID
function generateRoomId() {
  // Logic to generate a unique ID
}
// Create an array to store the bookings
let bookings = [];

// POST /bookings
app.post('/bookings', (req, res) => {
  // Extract booking details from the request body
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Check if the requested room is available for the given date and time
  const isRoomAvailable = checkRoomAvailability(roomId, date, startTime, endTime);

  if (!isRoomAvailable) {
    // If the room is already booked, return an error response
    return res.status(400).json({ error: 'Room is not available for the specified date and time' });
  }

  // Generate a unique booking ID
  const bookingId = generateBookingId();

  // Create a booking object with the provided details
  const booking = {
    bookingId,
    customerName,
    date,
    startTime,
    endTime,
    roomId
  };

  // Add the booking to the bookings array
  bookings.push(booking);

  // Return a success response
  res.status(201).json({ message: 'Room booked successfully' });
});

// Function to check room availability for a given date and time
function checkRoomAvailability(roomId, date, startTime, endTime) {
  // Logic to check if the room is available
}
// GET /rooms
app.get('/rooms', (req, res) => {
  // Iterate through the rooms array and retrieve the booking data for each room
  const roomsWithBookings = rooms.map(room => {
    const roomBookings = bookings.filter(booking => booking.roomId === room.roomId);
    return {
      ...room,
      bookings: roomBookings
    };
  });

  // Return the list of rooms with their corresponding booking data
  res.status(200).json({ rooms: roomsWithBookings });
});
// GET /customers
app.get('/customers', (req, res) => {
  // Iterate through the bookings array and retrieve the customer data for each booking
  const customersWithBookings = bookings.map(booking => {
    const room = rooms.find(room => room.roomId === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? room.roomName : '',
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime
    };
  });

  // Return the list of customers with their corresponding booking data
  res.status(200).json({ customers: customersWithBookings });
});
// GET /customers/:customerId/bookings
app.get('/customers/:customerId/bookings', (req, res) => {
  const { customerId } = req.params;

  // Iterate through the bookings array and filter the bookings for the specified customer
  const customerBookings = bookings.filter(booking => booking.customerId === customerId);

  // Return the list of booking details for the customer
  res.status(200).json({ bookings: customerBookings });
});
