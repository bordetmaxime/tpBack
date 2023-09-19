/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const { todolistController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();
/**
 * POST /api/todolist/
 * @summary endpoint pour créer une todolist sécurisé pour un TOKEN.
 * @tags todolist
 * @param {object} request.body.required - infos de création d'une todolist.
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example ajout todolist
 *
 *  {
 *  	"familyId": 1,
 *  	"title": "a faihfhgre",
 *      "color": "color",
 *  	"memberId": 1
 *  }
* @example response - 200 - example success response
 * {
 *	"msg": "Todolist crée",
 *	"newTodolist": {
 *		"todolist_id": 25,
 *		"todolist_title": "a faihfhgre",
 *		"todolist_color": "color",
 *		"todolist_position": 0,
 *		"todolist_status": false,
 *		"todolist_created_at": "2022-08-23T08:54:20.426Z",
 *		"todolist_updated_at": null,
 *		"todolist_member_id": 1
 *	}
 *}
 * @example response - 401 - example error response champs
 * {
 *   "msg": "le champs titre est requis !"
 * }
 */

router
    .route('/')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.getAll))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.create));
/**
 * GET /api/todolist/:id
 * @summary endpoint pour afficher une todolist par son ID sécurisé pour un TOKEN.
 * @tags todolist
 * @param {string} token.query.required - token retourné par l'api si le user
 * à le droit de se connecter
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 *  {
 *  	"todolist_id": 4,
 *  	"todolist_title": "post4",
 *  	"todolist_color": "#ff00ff",
 *  	"todolist_position": 1,
 *  	"todolist_status": false,
 *  	"todolist_created_at": "2022-08-23T13:12:41.301Z",
 *  	"todolist_updated_at": null,
 *  	"todolist_member_id": 4
 *  }
 * @return {string} 401 - error response - application/json
 * @example response - 401 - error response example
 * [
 *   {
 *      "status": "error",
 *      "statusCode": 401,
 *      "message": "todolist not found"
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
/**
 * PATCH /api/todolist/:id
 * @summary endpoint pour mettre à jour une todolist par son ID sécurisé pour un TOKEN.
 * @tags todolist
 * @param {object} request.body.required - infos de modification d'une todolist.
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example modification todolist
 *  {
 *    "title": "titre todolist",
 *    "color": "#ff00ff",
 *    "position": "5",
 *    "status" : "true"
 *  }
 * @example response - 200 - example success response
 * {
 *	"msg": "Todolist modifiée",
 *	"newTodolist": {
 *		"todolist_id": 25,
 *		"todolist_title": "titre todolist",
 *		"todolist_color": "#ff00ff",
 *		"todolist_position": 5,
 *		"todolist_status": true,
 *		"todolist_created_at": "2022-08-23T08:54:20.426Z",
 *		"todolist_updated_at": null,
 *		"todolist_member_id": 1
 *	}
 *}
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 */
/**
 * DELETE /api/todolist/:id
 * @summary endpoint pour supprimer une todolist sécurisé pour un TOKEN.
 * @tags todolist
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example response - 200 - example success response
 * {
 *	"msg": "Todolist su^pprimée",
 *	"newTodolist": {
 *		"todolist_id": 25,
 *		"todolist_title": "titre todolist",
 *		"todolist_color": "#ff00ff",
 *		"todolist_position": 5,
 *		"todolist_status": true,
 *		"todolist_created_at": "2022-08-23T08:54:20.426Z",
 *		"todolist_updated_at": null,
 *		"todolist_member_id": 1
 *	}
 *}
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
 */
router
    .route('/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.readOne))
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.update))
    .delete(controllerJwt.ckeckToken, controllerHandler(controller.delete));
/**
 * GET /api/todolist/:id/items
 * @summary endpoint pour afficher tous les items d'une todolist sécurisé pour un TOKEN.
 * @tags todolist
 * @param {string} token.query.required - token retourné par l'api si le user
 * à le droit de se connecter
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 *  {
 *	  "todolistAndItems": [
 *		{
 *			"item_id": 1,
 *			"item_title": "repas",
 *			"item_color": "#ff00ff",
 *			"item_position": 1,
 *			"item_deadline": "30/09/2022",
 *			"item_status": false,
 *			"item_created_at": "2022-08-24T14:22:03.522Z",
 *			"item_updated_at": null,
 *			"item_todolist_id": 1
 *		},
 *		{
 *			"item_id": 2,
 *			"item_title": "course",
 *			"item_color": "#ff00ff",
 *			"item_position": 2,
 *			"item_deadline": "25/08/2022",
 *			"item_status": false,
 *			"item_created_at": "2022-08-24T14:22:03.522Z",
 *			"item_updated_at": null,
 *			"item_todolist_id": 1
 *		}
 *    ]
 *  }
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
/**
 * POST /api/todolist/:id/items
 * @summary endpoint pour créer un item dans une todolist sécurisé pour un TOKEN.
 * @tags todolist
 * @param {object} request.body.required - infos de création d'un item.
 * @return {object} 200 - Success response - application/json
 * @return {object} 401 - Bad request response - application/json
 * @example request - example ajout item
 *  {
 *    "title": "title item",
 *    "color": "fofff",
 *    "dealine": "25/01/1980"
 *  }
 * @example response - 200 - example success response
 * {
 *	"msg": "item ajouté !",
 *	"newItemOfTodo": {
 *		"item_id": 8,
 *		"item_title": "test item",
 *		"item_color": "plaùfxsisir",
 *		"item_position": 0,
 *		"item_deadline": "totwxw1dùf",
 *		"item_status": false,
 *		"item_created_at": "2022-08-25T06:01:08.486Z",
 *		"item_updated_at": null,
 *		"item_todolist_id": 1
 *	}
 *}
 * @example response - 401 - example error response champs
 * {
 *   "msg": "Tous les champs sont requis !"
 * }
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
    .route('/:id/items')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.readAllItem))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.addItemOfTodolist));

/**
 * GET /api/todolist/family/:id
 * @summary endpoint pour afficher tous les todolists d'une famille sécurisé pour un TOKEN.
 * @tags todolist
 * @param {string} token.query.required - token retourné par l'api si le user
 * à le droit de se connecter
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 *  [
 *  	{
 *  		"family_id": 1,
 *  		"todolist_id": 1,
 *  		"todolist_title": "post1",
 *  		"todolist_color": "#ff00ff",
 *  		"todolist_position": 1,
 *  		"todolist_status": false,
 *  		"todolist_created_at": "2022-08-24T14:22:03.522Z",
 *  		"todolist_updated_at": null,
 *  		"todolist_member_id": 1
 *  	},
 *  	{
 *  		"family_id": 1,
 *  		"todolist_id": 2,
 *  		"todolist_title": "post2",
 *  		"todolist_color": "#ff00ff",
 *  		"todolist_position": 1,
 *  		"todolist_status": false,
 *  		"todolist_created_at": "2022-08-24T14:22:03.522Z",
 *  		"todolist_updated_at": null,
 *  		"todolist_member_id": 2
 *  	},
 *  	{
 *  		"family_id": 1,
 *  		"todolist_id": 6,
 *  		"todolist_title": "post6",
 *  		"todolist_color": "#ff00ff",
 *  		"todolist_position": 1,
 *  		"todolist_status": false,
 *  		"todolist_created_at": "2022-08-24T14:22:03.522Z",
 *  		"todolist_updated_at": null,
 *  		"todolist_member_id": 1
 *  	}
 *  ]
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
    .route('/family/:id')
    .get(controllerJwt.ckeckToken, controllerHandler(controller.allTodolistOfFamily));
module.exports = router;
