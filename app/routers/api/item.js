/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
const express = require('express');

const { itemController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const controllerJwt = require('../../middleware/jwt');

const router = express.Router();

router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerJwt.ckeckToken, controllerHandler(controller.create));
/**
    * GET /api/item/:id
    * @summary endpoint pour afficher un item par son ID sécurisé pour un TOKEN.
    * @tags item
    * @param {string} token.query.required - token retourné par l'api si le user
    * à le droit de se connecter
    * @return {object} 200 - success response - application/json
    * @example response - 200 - success response example
    * [
    *    {
	*       "item_id": 1,
	*       "item_title": "repas",
	*       "item_color": "#ff00ff",
	*       "item_position": 1,
	*       "item_deadline": "30/09/2022",
	*       "item_status": false,
	*       "item_created_at": "2022-08-24T14:22:03.522Z",
	*       "item_updated_at": null,
	*       "item_todolist_id": 1
    *     }
    * ]
    * @return {string} 401 - error response - application/json
    * @example response - 401 - error response example
    * [
    *   {
    *      "status": "error",
    *      "statusCode": 401,
    *      "message": "item not found"
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
    * PATCH /api/item/:id
    * @summary endpoint pour mettre à jour un item par son ID sécurisé pour un TOKEN.
    * @tags item
    * @param {object} request.body.required - infos de modification d'un item.
    * @return {object} 200 - Success response - application/json
    * @return {object} 401 - Bad request response - application/json
    * @example request - example modification item
    *  {
    *    "title": "titre item",
    *    "color": "#ff00ff",
    *    "position": "5",
    *    "status" : "true"
    *  }
    * @example response - 200 - example success response
    * {
    *   "msg": "item modifié !"
    * }
    * @example response - 401 - example error response champs
    * {
    *   "msg": "Tous les champs sont requis !"
    * }
    */
/**
    * DELETE /api/item/:id
    * @summary endpoint pour supprimer un item sécurisé pour un TOKEN.
    * @tags item
    * @return {object} 200 - Success response - application/json
    * @return {object} 401 - Bad request response - application/json
    * @example response - 200 - example success response
    *  {
    *     "msg": "item supprimé !"
    *  }
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
    * PATCH /api/item/:id/status
    * @summary endpoint pour mettre à jour le status d'un item par son ID sécurisé pour un TOKEN.
    * @tags item
    * @param {object} request.body.required - infos de modification d'un item.
    * @return {object} 200 - Success response - application/json
    * @return {object} 401 - Bad request response - application/json
    * @example request - example modification item
    *  {
    *    "status": "true"
    *  }
    *  @example request - example modification item
    *  {
    *    "status": "false"
    *  }
    * @example response - 200 - example success response
    * {
    *   "msg": "item modifié !"
    * }
    */

router
    .route('/:id/status')
    .patch(controllerJwt.ckeckToken, controllerHandler(controller.updateStatus));

module.exports = router;
