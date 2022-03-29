import express from 'express';
import orderController from '../controller/order';
// ...rest of the initial code omitted for simplicity.
import { body, param } from 'express-validator';
import validate from './validate';

const routesOrder = express.Router();

routesOrder.get('/', orderController.getOrders);
routesOrder.post(
  '/',
  validate(body('price').isNumeric()),
  orderController.createOrder
);
routesOrder.get(
  '/:id',
  validate([param('id').isNumeric()]),
  orderController.getOrder
);
routesOrder.put(
  '/:id',
  validate([param('id').isNumeric()], body('price').isNumeric()),
  orderController.editOrder
);
routesOrder.delete(
  '/:id',
  validate([param('id').isNumeric()]),
  orderController.deleteOrder
);

export { routesOrder };
