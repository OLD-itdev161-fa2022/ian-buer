import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';

const app = express();

app.use(express.json({extended: false}));

connectDatabase();

app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.post('/api/users', [
        check('name', 'Please enter your name').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return res.status(422).json({errors: errors.array()});
        }
        else
        {
            return res.send(req.body);
        }
    });

app.listen(3000, () => console.log('Express server running on port 3000'));