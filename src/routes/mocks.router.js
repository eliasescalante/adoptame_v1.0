import { Router } from 'express';
import bcrypt from 'bcrypt';
import { generateUsers, generatePets } from '../utils/mocking.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(10);
    res.status(200).json({ status: 'success', payload: pets });
});

router.get('/mockingusers', async (req, res) => {
    try {
        const users = generateUsers(50);
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/generateData', async (req, res) => {
    const { usersCount, petsCount } = req.body;

    if (!usersCount || !petsCount) {
        return res.status(400).json({
            status: 'error',
            message: 'Both usersCount and petsCount are required.'
        });
    }

    try {
        const userData = generateUsers(usersCount);
        const petData = generatePets(petsCount);
        await UserModel.insertMany(userData); 
        await PetModel.insertMany(petData);  

        res.status(201).json({
            status: 'success',
            message: `${usersCount} users and ${petsCount} pets have been generated and inserted.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error inserting data into the database.',
        });
    }
});


export default router;
