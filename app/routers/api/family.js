/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const { familyController: controller } = require('../../controllers/api');

const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();
/**
 * GET /api/family/:id
 * @summary endpoint pour afficher une famillepar son ID sécurisé pour un TOKEN.
 * @tags family
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *  {
 *  	"famille_id": 1,
 *  	"name": "hobbitfff",
 *  	"description": ""
 *  }
 * ]
 */
/**
 * PATCH /api/family/:id
 * @summary endpoint pour mettre à jour une family et sa description par son ID sécurisé pour un TOKEN.
 * @tags family
 * @param {object} request.body.required - infos de modification d'une todolist.
 * @return {object} 200 - Success response - application/json
 * @example request - example modification todolist
 *  {
 *  	"famille_id": 1,
 *  	"name": "hobbithhhhfff",
 *  	"description": "ggggg"
 *  }
 * @example response - 200 - example success response
 *  {
 *  	"msg": "Famille modifiée !",
 *  	"updateFamily": {
 *  		"family_id": 1,
 *  		"family_name": "hobbitfff",
 *  		"family_description": null,
 *  		"family_created_at": "2022-08-24T14:21:11.568Z"
 *  	}
 *  }
 */
router
    .route('/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.familyOne))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.update));
/**
 * GET /api/family/:id/members
 * @summary endpoint pour afficher les members d'une famille par son ID sécurisé pour un TOKEN.
 * @tags family
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *  	{
 *  		"family_id": 1,
 *  		"family": "hobbitfff",
 *  		"member_id": 12,
 *  		"member_lastname": "plaùfxsisir",
 *  		"member": null,
 *  		"role_id": 1,
 *  		"role_label": "papa",
 *  		"role": "/icone/papa.png"
 *  	},
 *  	{
 *  		"family_id": 1,
 *  		"family": "hobbitfff",
 *  		"member_id": 11,
 *  		"member_lastname": "plaùfxsisir",
 *  		"member": null,
 *  		"role_id": 1,
 *  		"role_label": "papa",
 *  		"role": "/icone/papa.png"
 *  	}
 * ]
 */
/**
 * POST /api/family/:id/members/
 * @summary endpoint d'ajout d un membre à une famille sécurisé pour un TOKEN.
 * @tags member
 * @param {object} request.body.required - infos de creation d'un membre
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example
 * {
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
 */
router
    .route('/:id/members')
    .get(controllerHandler(controller.allmemberAndFamily))
    .post(controllerHandler(controller.AddMemberOfFamily));

/**
 * GET /api/family/:idFamily/member/:id
 * @summary endpoint pour afficher le member et son role en fonction de la famille identifiée par l'idFamily.
 * @tags family
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 * 	{
 *    	"member_lastname": "Sacquet",
 *    	"member_firstname": "Bilbo",
 *    	"member_email": "terremilieu@free.fr",
 *    	"member_username": "terremilieu@free.fr",
 *    	"roleid": 1,
 *    	"label": "papa",
 *    	"icon": "/icone/papa.png",
 *    	"data_id": 1,
 *    	"birth": "25/01/1980",
 *    	"size": 180,
 *    	"top_size": "xl",
 *    	"bottom_size": "40",
 *    	"shoes_size": 46,
 *    	"school": "Oclock",
 *    	"hobbies": "rien"
 *    }
 * ]
 */
/**
 * DELETE /api/family/:idFamily/member/:id
 * @summary endpoint pour supprimer un membre par son ID et son family ID sécurisé pour un TOKEN.
 * @tags member
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example response - 200 - example success response
 *  {
 *    "msg": "membre supprimé !"
 *  }
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 */
router
    .route('/:idFamily/member/:id')
    .get(controllerHandler(controller.familyAndOneMember))
    .delete(controllerHandler(controller.DeletefamilyAndOneMember));
module.exports = router;
