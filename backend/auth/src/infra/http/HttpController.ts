import Login from '../../application/usecase/login';
import SignUp from '../../application/usecase/sign-up';
import Verify from '../../application/usecase/verify';
import HttpServer from './HttpServer';

export default class HttpController {
	constructor(
		readonly httpServer: HttpServer,
		readonly signUp: SignUp,
		readonly login: Login,
		readonly verify: Verify,
	) {
		httpServer.on('post', '/signup', async function (params: any, body: any) {
			const output = await signUp.execute(body);
			return output;
		});

		httpServer.on('post', '/login', async function (params: any, body: any) {
			if (typeof body.date === 'string') {
				body.date = new Date(body.date);
			}
			const output = await login.execute(body);
			return output;
		});

		httpServer.on('post', '/verify', async function (params: any, body: any) {
			const output = await verify.execute(body.token);
			return output;
		});
	}
}
