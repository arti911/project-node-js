import { Request, Response } from 'express';

export const getUser = (request: Request, response: Response) => {
  const { id } = request.params;

  response.render('user', {
    id,
  });
};

export const addUser = (request: Request, response: Response) => {
  response.render('add');
};

export const editUser = (request: Request, response: Response) => {
  const { id } = request.params;

  console.log(id);

  response.render('add');
};
