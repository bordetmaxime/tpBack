/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const { userController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

// Création router express
const router = express.Router();

/**
 * GET /api/user
 * @summary endpoint pour afficher tous les users de la BDD sécurisé pour un TOKEN.
 * @tags user
 * @param {string} token.query.required - token retourné par l'api si le user
 * à le droit de se connecter
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "member_id": 1,
 *     "member_lastname": "Sadsdcquet",
 *     "member_firstname": "Bidslbo",
 *     "member_email": "terrdsdemilieu@free.fr",
 *     "member_password": "$2b$10$w/QpWSe.oZcOX2KoWfC.u.hrRK4wNrTFxSkTcza4HRpR4erLli.2e",
 *     "member_username": "terrdsdemilieu@free.fr",
 *     "created_at": "2022-08-20T06:38:09.659Z",
 *     "updated_at": null
 *   }
 * ]
 * @return {string} 500 - error response - application/json
 * @example response - 500 - error response example
 * [
 *   {
 *      "status": "error",
 *      "statusCode": 500,
 *      "message": "jwt expired"
 *   }
 * ]
 */

router
    .route('/user')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll));

/**
 * POST /api/user/register
 * @summary endpoint d'incription et de création d'une famille et du premier membre
 * @tags user
 * @param {object} request.body.required - infos de creation d'une famille et du membre
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example
 *  {
 *    "familyName": "famille 4",
 *    "lastname": "gdgf",
 *    "firstname": "dgfg",
 *    "roleId": 1,
 *    "email": "dddl11@free.fr",
 *    "confirmEmail": "dddl11@free.fr",
 *    "password": "test",
 *    "confirmPassword": "test"
 *  }
 * @example response - 200 - example success response
 *  {
 *  	"msg": "Utilisateur et famille créer",
 *  	"token": {
 *  		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjEwODg5MzIsImV4cCI6MTY2MTA4ODk4Mn0.visRx39XBCvLJM0Cwwg1eeUT3jgm2o_MTXKmiOmNzKk",
 *  		"expiresIn": "50000"
 *  	},
 *  	"familyId": 4,
 *  	"memberId": 7
 *  }
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 * @example response - 401 - example error response family
 * {
 *   "msg": "Le nom de famille est déjà utilisé !"
 * }
 * @example response - 401 - example error response password
 * {
 *   "msg": "Les deux mots de passes ne sont pas indentiques !"
 * }
 * @example response - 401 - example error response user
 * {
 *   "msg": "Cet utilisateur existe déjà !"
 * }
 */

router
    .route('/register')
    .post(controllerHandler(controller.register));

/**
 * POST /api/user/auth
 * @summary endpoint de connexion d'un membre d'une famille déjà crée.
 * @tags user
 * @param {object} request.body.required - infos de connexion d'un membre.
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example connexion email
 *  {
 *    "userName": "motDepasse@free.fr",
 *    "password": "motDepasse"
 *  }
 * @example request - example connexion username
 *  {
 *    "userName": "superman",
 *    "password": "motDepasse"
 *  }
 * @example response - 200 - example success response
 *  {
 *  	"token": {
 *  		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjEwODc1NzUsImV4cCI6MTY2MTA4NzYyNX0.xrlUnREkOzNyDNswxsVv2x3BlMIs1dSxxyUIYKw05dY",
 *  		"expiresIn": "50000"
 *  	},
 *  	"member": {
 *  		"id": 2,
 *  		"lastname": "Sacquet",
 *  		"firstname": "Frodon"
 *  	}
 *  }
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 * @example response - 401 - example error response member
 * {
 *   "msg": "utilisateur introuvable !"
 * }
 * @example response - 401 - example error response password and user name
 * {
 *   "msg": "Username ou mot de passe incorrect"
 * }
 */

router
    .route('/auth')
    .post(controllerHandler(controller.login));

module.exports = router;
