import ExpressAdapter from './infra/http/ExpressAdapter';
import HttpController from './infra/http/HttpController';
import PgPromise from './infra/database/PgPromiseAdapter';
import ProductRepositoryDatabase from './infra/repository/ProductRepositoryDatabase';
import UserRepository from './application/repository/AccountRepository';
import User from './domain/entities/User';
import SignUp from './application/usecase/sign-up';
import Login from './application/usecase/login';
import Verify from './application/usecase/verify';

const connection = new PgPromise();
const httpServer = new ExpressAdapter();
const users: any = {};
const userRepository: UserRepository = {
	async save(user: User): Promise<void> {
		users[user.email.value] = user;
	},
	async get(email: string): Promise<User> {
		return users[email];
	},
	countBy: function (input: string): Promise<number> {
		throw new Error('Function not implemented.');
	},
};
const signUp = new SignUp(userRepository);
const login = new Login(userRepository);
const verify = new Verify();

new HttpController(httpServer, signUp, login, verify);
httpServer.listen(3004);
