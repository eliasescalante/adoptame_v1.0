import { faker } from '@faker-js/faker'; // Asegúrate de usar la versión correcta de Faker
import bcrypt from 'bcrypt';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const saltRounds = 10;

export function generateUsers(count) {
    const users = [];

    for (let i = 0; i < count; i++) {
        const hashedPassword = bcrypt.hashSync('coder123', saltRounds);
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.number.int({ min: 0, max: 1 }) === 0 ? 'user' : 'admin', // Genera un rol aleatorio
            pets: [],
        });
    }

    return users;
}

export function generatePets(count) {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.dog(),        // O usa otro método de Faker para generar el nombre
            specie: faker.animal.type(),     // Asegúrate de proporcionar un valor para `specie`
            birthDate: faker.date.past(),    // Para un ejemplo de fecha de nacimiento
            adopted: faker.datatype.boolean(),
            image: 'https://placekitten.com/200/200',
        });
    }

    return pets;
}
