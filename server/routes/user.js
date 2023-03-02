const express = require('express');
const router = express.Router();
const { signup, login, me, forgotPassword  } = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour créer un nouvel utilisateur
router.post('/signup', signup);

// Route pour connecter un utilisateur existant
router.post('/login', login);

// Route pour récupérer les informations de l'utilisateur actuellement connecté
router.get('/me', authMiddleware, me);

// Route pour réinitialiser le mot de passe
router.post('/forgot-password', forgotPassword);

module.exports = router;
