/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
const express = require('express');

const { memberController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();
/**
 * POST /api/member/
 * @summary endpoint d'ajout d un membre à une famille sécurisé pour un TOKEN.
 * @tags member
 * @param {object} request.body.required - infos de creation d'un membre
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example
 * {
 *			"familyId" : 1,
 *			"lastname": "mathieu",
 *          "username": "mathieu",
 *          "roleId": 1,
 *          "datebirth": "01/01/2000",
 *          "password": "test",
 *          "confirmPassword": "test",
 *          "topsize": "L",
 *          "bottomsize": "M",
 *          "shoesize": "36",
 *          "size": "150",
 *   		"school": "notredame",
 *			"hobbies": "foot"
 *}
 * @example response - 200 - example success response
 *   {
 *   	"msg": "Ajout du nouveau membre !",
 *   	"viewsMember": {
 *   		"member_id": 9,
 *   		"member_lastname": null,
 *   		"member_firstname": "Mathieu",
 *   		"member_email": null,
 *   		"member_username": "test133",
 *   		"data_id": 7,
 *   		"birth": "01/01/2000",
 *   		"size": 150,
 *   		"top_size": "L",
 *   		"bottom_size": "M",
 *   		"shoes_size": 36,
 *   		"school": "notredame",
 *   		"hobbies": "foot"
 *   	}
 *   }
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 * @example response - 401 - example error response password
 * {
 *   "msg": "Les deux mots de passes ne sont pas indentiques !"
 * }
 */
router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerHandler(controller.create));

/**
 * PATCH /api/member/:id
 * @summary endpoint pour mettre à jour un membre sécurisé pour un TOKEN.
 * @tags member
 * @param {object} request.body.required - infos de modification du membre.
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example modification membre
 * [
 *  {
 *	    "member_lastname": "Sacquet",
 *	    "member_firstname": "Bilbo",
 *	    "member_email": "terremilieu@free.fr",
 *      "roleId": 1,
 *	    "member_data_date_birth": "25/01/1980",
 *	    "member_data_size": 180,
 *	    "member_data_top_size": "xl",
 *	    "member_data_bottom_size": "40",
 *	    "member_data_shoes_size": 46,
 *	    "member_data_school": "Oclock",
 *	    "member_data_hobbies": "rien"
 *  }
 * ]
 * @example response - 200 - example success response
 * {
 *   "msg": "Le membre a bien été modifié !"
 * }
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 */

router
    .route('/:id')
    .get(controllerHandler(controller.getOne))
    .patch(controllerHandler(controller.update));

// router CRUD  membre data par ID

// router
//  .route('/:id/memberdata')
// .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
// .post(controllerJwt.ckeckToken, controllerHandler(controller.create))
// .patch(controllerJwt.ckeckToken, controllerHandler(controller.update))
// .delete(controllerJwt.ckeckToken, controllerHandler(controller.delete));

// router Read du dashboard du member

// router
//    .route('/:id/home')
//    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll));

// router RU de la family du member

// router
//    .route('/:id/family/:id')
//    .get(controllerJwt.ckeckToken, controllerHandler(controller.getOne))
//    .patch(controllerJwt.ckeckToken, controllerHandler(controller.update));

// router
//    .route('/addMember')
//    .post(controllerHandler(controller.create));
// router
//    .route('/addMember')
//    .post(controllerHandler(controller.create));

module.exports = router;
