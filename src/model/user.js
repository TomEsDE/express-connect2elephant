import db from '../db/db';

class User {
  async createUser(firstName, lastName, age, active = false) {
    const [id] = await db('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        age: age,
        active: active,
      })
      .returning('id');

    return id.id;
  }

  async getUsers() {
    const result = await db('users').select({
      id: 'id',
      firstName: 'first_name',
      lastName: 'last_name',
      age: 'age',
      active: 'active',
    });

    return result;
  }

  async getUser(id) {
    const [result] = await db('users')
      .select({
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        age: 'age',
        active: 'active',
      })
      .where({ id: id });

    return result;
  }

  async updateUser(id, firstName, lastName, age, active) {
    const result = await db('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        age: age,
        active: active,
      })
      .where({ id: id });

    return result;
  }

  async deleteUser(id) {
    const result = await db('users').delete().where({ id: id });

    return result;
  }

  async checkInactive(id) {
    const [result] = await db('users')
      .select({
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        age: 'age',
        active: 'active',
      })
      .where({ id: id });

    return result;
  }
}

export default new User();
