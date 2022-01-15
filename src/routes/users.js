const express = require('express');
const router = express.Router();
const faker = require('faker/locale/es');
const bcrypt = require('bcrypt');

const pool = require('../database');

// LISTAR USUARIOS  
router.get('/get-users', async(req, res) => {
    try {
        let totalUsers = await pool.query('SELECT COUNT(*) FROM users');
        let totalUsersActives = await pool.query('SELECT COUNT(*) FROM users WHERE active = "ACTIVO"');
        let totalUsersInactives = await pool.query('SELECT COUNT(*) FROM users WHERE active = "INACTIVO"');
        let users = await pool.query('SELECT * FROM users');

        const response = {
            status: "success",
            data: users,
            totalUsers: totalUsers,
            totalUsersActives: totalUsersActives,
            totalUsersInactives: totalUsersInactives
        }

        res.json(response);
    } catch (error) {
        console.log("ERROR OBTENIENDO LISTADO DE USUARIOS");
        console.log(error);

        const response = {
            status: "error",
            error: error
        };

        return res.status(500).json(response);
    }


});

// INSERTAR USUARIOS FALSOS
router.get('/add-faker-users', async(req, res) => {
    let admin = {
        uuid: faker.datatype.uuid(),
        user_name: 'fmateosc',
        email: 'fmateosc@gmail.com',
        password: bcrypt.hashSync('fmateosc', 10),
        is_admin: true,
        active: 'ACTIVO'
    };

    await pool.query('INSERT INTO users set ?', [admin]);

    for (let i = 0; i < 49; i++) {
        let newUser = {
            uuid: faker.datatype.uuid(),
            user_name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('password', 10),
            is_admin: true,
            active: 'INACTIVO'
        };

        await pool.query('INSERT INTO users set ?', [newUser]);

        let newProfile = {
            user_id: user.id,
            company: faker.company.companyName(),
            avatar: 'avatar.png',
            job_title: faker.company.catchPhrase(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            country: faker.address.country(),
            postal_code: faker.address.zipCode(),
            phone: faker.phone.phoneNumber()
        };

        await pool.query('INSERT INTO user_profile set ?', [newProfile]);
    }

    res.send('USUARIOS CREADOS');
});

// INSERTAR PERFILES DE USUARIOS FALSOS
router.get('/add-fake-profiles', async(req, res) => {
    var users = await pool.query('SELECT * FROM users ORDER BY user_name');

    users.forEach(async function(user, index) {

    });

    res.send('PERFILES CREADOS');
});

module.exports = router;