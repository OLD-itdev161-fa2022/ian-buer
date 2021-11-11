import jwt, { decode } from 'jsonwebtoken';
import config from 'config';

const auth = (req, res ,next) => {
    const token = req.header('x-auth-token');
    const secret = config.get('jwtSecret');

    if (!token)
    {
        return res.status(401).json({message: 'Missing authentication token. Access denied.'});
    }

    try
    {
        const decodedToken = jwt.verify(token, secret);
        req.user = decodedToken.user;

        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid authentication token. Access denied.'});
    }
};

export default auth;