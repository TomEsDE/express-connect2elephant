import userService from '../service/user';

class UserController {
  async createUser(req, res) {
    try {
      console.log('createuser >> req.body: ', req.body);
      const id = await userService.createUser(req.body);
      console.log('after createuser >> id: ', id);

      if (!id) throw new Error('Error createUser');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getUsers(req, res) {
    try {
      console.log('getuserS');
      const result = await userService.getUsers();
      console.log('after getuserS', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getUser(req, res) {
    try {
      console.log('getuser >> params.id: ', req.params?.id);
      const result = await userService.getUser(req.params.id);
      console.log('after getuser', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json({ error: 'not found' });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async editUser(req, res) {
    try {
      console.log('editUser >> params.id: ', req.params?.id);
      console.log('editUser >> req.body: ', req.body);
      const result = await userService.editUser(req.params.id, req.body);
      console.log('after editUser', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async deleteUser(req, res) {
    try {
      console.log('deleteUser >> params.id: ', req.params?.id);
      const result = await userService.deleteUser(req.params.id);
      console.log('after deleteUser', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getUserOrders(req, res) {
    try {
      console.log('getUserOrders >> params.id: ', req.params?.id);
      const result = await userService.getUserOrders(req.params.id);
      console.log('after getUserOrders', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async checkInactive(req, res) {
    try {
      console.log('checkInactive');
      const result = await userService.checkInactive(req.params.id);
      console.log('after checkInactive', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
