import orderService from '../service/order';

class OrderController {
  async createOrder(req, res) {
    try {
      console.log('createorder >> req.body: ', req.body);
      const id = await orderService.createOrder(req.body);
      console.log('after createorder >> id: ', id);

      if (!id) throw new Error('Error createOrder');

      return res.status(200).json({ id: id });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getOrders(req, res) {
    try {
      console.log('getorderS');
      const result = await orderService.getOrders();
      console.log('after getorderS', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async getOrder(req, res) {
    try {
      console.log('getorder >> params.id: ', req.params?.id);
      const result = await orderService.getOrder(req.params.id);
      console.log('after getorder', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json({ error: 'not found' });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async editOrder(req, res) {
    try {
      console.log('editOrder >> params.id: ', req.params?.id);
      console.log('editOrder >> req.body: ', req.body);
      const result = await orderService.editOrder(req.params.id, req.body);
      console.log('after editOrder', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async deleteOrder(req, res) {
    try {
      console.log('deleteOrder >> params.id: ', req.params?.id);
      const result = await orderService.deleteOrder(req.params.id);
      console.log('after deleteOrder', result);

      if (result) return res.status(200).json(result);
      else return res.status(404).json('not found');
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new OrderController();
