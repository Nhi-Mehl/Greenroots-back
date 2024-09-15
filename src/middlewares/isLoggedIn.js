// Middleware to know if user is logged in by checking the token
import jwt from 'jsonwebtoken';
import { User, Blacklisted_token } from '../models/index.js';

const isLoggedIn = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Remove the Bearer prefix from the token
    // If the token is not prefixed with Bearer, we set it to null
    const tokenWithoutBearer = token ? token.slice(7) : null;

    console.log(token);

    // If no token is found, we respond with a 401 status code
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // vérification si le token est blacklisté
        const blacklisted = await Blacklisted_token.findOne({
            where: { token }
        });

        if (blacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
        // Verify the token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Find the user by the id from the token
        const user = await User.findByPk(decoded.id);

        // If no user is found, we respond with a 401 status code
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // If an error occurs, we respond with a 500 status code
        return res.status(500).json({ message: error.message });
    }
}

export default isLoggedIn;