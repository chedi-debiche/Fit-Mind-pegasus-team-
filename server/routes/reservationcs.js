const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const Reservation = require('../models/ReservationC');
const User = require('../models/user');
const Coaching = require('../models/coachings');

// Create a new reservation
router.post('/:coachingId', async (req, res) => {
  try {
    const coachingId = req.params.coachingId;
    const coaching = await Coaching.findById(coachingId);
    // if (!coaching) {
    //   return res.status(400).json({ error: 'Invalid coaching ID' });
    // }
    const reservation = new Reservation({
      username: req.body.username,
      age: req.body.age,
      reservationdate: req.body.reservationdate,
      user: req.body.user,
      emailuser: req.body.emailuser,
       phoneuser: req.body.phoneuser,
      coaching: coachingId
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});





// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reservations for a specific user
router.get('/spesific', async (req, res) => {
  try {
    const user = req.query.user;
    const reservations = await Reservation.find({ user: user });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single reservation
router.get('/:id', getReservation, (req, res) => {
  res.json(res.reservation);
});

// Update a reservation
router.patch('/:id', getReservation, async (req, res) => {
    if (req.body.username != null) {
      res.reservation.username = req.body.username;
    }
    if (req.body.age != null) {
      res.reservation.age = req.body.age;
    }
    if (req.body.reservationdate != null) {
      res.reservation.reservationdate = req.body.reservationdate;
    }
    try {
      const updatedReservation = await res.reservation.save();
      res.json(updatedReservation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Delete a reservation
router.delete('/:id', getReservation, async (req, res) => {
  try {
    await res.reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware function to get a reservation by ID
async function getReservation(req, res, next) {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'Cannot find reservation' });
    }
    res.reservation = reservation;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = router;
