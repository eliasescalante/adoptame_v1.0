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

// Endpoint POST para generar usuarios y mascotas
router.post('/generateData', async (req, res) => {
    const { usersCount, petsCount } = req.body; // Cambié 'users' y 'pets' por 'usersCount' y 'petsCount'

    // Validación para asegurar que los parámetros estén presentes
    if (!usersCount || !petsCount) {
        return res.status(400).json({
            status: 'error',
            message: 'Both usersCount and petsCount are required.'
        });
    }

    try {
        // Generar usuarios y mascotas
        const userData = generateUsers(usersCount);
        const petData = generatePets(petsCount);

        // Insertar en la base de datos
        await UserModel.insertMany(userData); // Insertar usuarios
        await PetModel.insertMany(petData);   // Insertar mascotas

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
