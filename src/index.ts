import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { create } from 'express-handlebars';

import userRouter from './routes/userRouter';
import User from './models/user';

const hbs = create({
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
  defaultLayout: 'layout',
  extname: 'hbs',
});

const PORT = process.env.PORT || 5000;

const app = express();

const jsonParser = express.json();

const userDefault = new User();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(cors());

app.get('/api/users', userDefault.getAll.bind(userDefault));

app.get('/api/users/:id', userDefault.getUser.bind(userDefault));

app.post('/api/users', jsonParser, userDefault.createUser.bind(userDefault));

app.delete('/api/users/:id', userDefault.deleteUser.bind(userDefault));

app.put('/api/users', jsonParser, userDefault.editUser.bind(userDefault));

app.use('/user', userRouter);

app.use('/', (request, response) => {
  response.render('index');
});

app.listen(PORT, () => {
  console.log('Сервер ожидает подключения...');
});
