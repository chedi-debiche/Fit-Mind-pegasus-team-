const express = require('express');
const router = express.Router();
const {Reclamation,validate} = require('../models/reclamation');




// Get all reclamations
router.get('/getAll', async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a reclamation by id
router.get('/getById/:id', async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a reclamation by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    await reclamation.remove();
    res.json({ message: 'Reclamation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a reclamation by id


module.exports = router;
