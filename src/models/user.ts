import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { IUser } from '../user.interface';

const dirname = path.resolve();

const filePath = `${dirname}/src/user.json`;

class User {
  users: IUser[];

  constructor() {
    this.users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  createUser(request: Request, response: Response) {
    if (!request.body) {
      return response.sendStatus(400);
    }

    const { name, age } = request.body;

    const maxId = Math.max(...this.users.map((item) => item.id));

    const user = {
      id: Math.abs(maxId) === Infinity ? 0 : maxId + 1,
      name,
      age,
    };

    this.users.push(user);

    fs.writeFileSync(filePath, JSON.stringify(this.users));

    return response.send(user);
  }

  getUser(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return;
    }

    const user = this.users.find((item) => item.id === +id);

    if (user) {
      response.send(user);
    } else {
      response.redirect('/');
    }
  }

  editUser(request: Request, response: Response) {
    if (!request.body) {
      return response.sendStatus(400);
    }

    const { id, name, age } = request.body;

    let user = this.users.find((item) => item.id === +id);

    if (user) {
      user = {
        ...user,
        name,
        age,
      };

      fs.writeFileSync(filePath, JSON.stringify(user));

      return response.send(user);
    }

    return response.sendStatus(404);
  }

  deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return;
    }

    const index = this.users.findIndex((item) => item.id === +id);

    if (index >= 0) {
      this.users.splice(index, 1);

      fs.writeFileSync(filePath, JSON.stringify(this.users));

      response.redirect('/');
    } else {
      response.sendStatus(404);
    }
  }

  getAll(request: Request, response: Response) {
    response.send(this.users);
  }
}

export default User;
