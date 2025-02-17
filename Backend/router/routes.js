/**
 * @author Debottam Kar
 * @module routes
 * @description This module sets up the routes for the application.
 * @requires ../controllers/register
 */
const {Router} = require('express');
const home = require('../controllers/home.js');
const session = require('../controllers/session.js');
const login = require('../controllers/login.js');
const movie = require('../controllers/movie.js');
const register = require('../controllers/register.js');
const logout = require('../controllers/logout.js');

const router = Router();

router.route('/home').get(home);
router.route('/session').get(session);
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').delete(logout);
router.route('/movie').post(movie);

module.exports = router;