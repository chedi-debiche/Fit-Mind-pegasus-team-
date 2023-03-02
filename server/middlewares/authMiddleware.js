const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  // Récupérer le cookie JWT contenant le jeton d'authentification
  const token = req.cookies.jwt;

  // Vérifier si le cookie existe
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Vérifier si le jeton est valide et extraire les informations de l'utilisateur
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
