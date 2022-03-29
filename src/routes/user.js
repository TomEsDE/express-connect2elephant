import express from 'express';
import userController from '../controller/user';

// ...rest of the initial code omitted for simplicity.
import { body, param } from 'express-validator';
import validate from './validate';

const routesUser = express.Router();

routesUser.get('/', userController.getUsers);
routesUser.post(
  '/',
  validate([
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('age').isNumeric(),
    body('active').isBoolean(),
  ]),
  userController.createUser
);

routesUser.get(
  '/:id',
  validate([param('id').isNumeric()]),
  userController.getUser
);

routesUser.put(
  '/:id',
  validate([
    param('id').isNumeric(),
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('age').isNumeric(),
    body('active').isBoolean(),
  ]),
  userController.editUser
);

routesUser.delete(
  '/:id',
  validate([param('id').isNumeric()]),
  userController.deleteUser
);

routesUser.get(
  '/:id/orders',
  validate([param('id').isNumeric()]),
  userController.getUserOrders
);

routesUser.put(
  '/:id/check-inactive',
  validate([param('id').isNumeric()]),
  userController.checkInactive
);

// can be reused by many routes

export { routesUser };
