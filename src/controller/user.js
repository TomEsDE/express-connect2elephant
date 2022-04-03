import { NotFoundError } from '../js/HttpError';
import userService from '../service/user';

class UserController {
  async createUser(req, res, next) {
    try {
      const id = await userService.createUser(req.body);
      if (!id) throw new Error('Error createUser');

      return res.status(200).json({ id: id });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await userService.getUsers();

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const result = await userService.getUser(req.params.id);

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      const result = await userService.editUser(req.params.id, req.body);

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id);

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const result = await userService.getUserOrders(req.params.id);

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }

  async checkInactive(req, res, next) {
    try {
      const result = await userService.checkInactive(req.params.id);

      if (result) return res.status(200).json(result);
      else return next(new NotFoundError());
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
