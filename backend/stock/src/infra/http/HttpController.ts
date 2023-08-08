import IncreaseStock from '../../application/usecase/IncreaseStock';
import ReduceStock from '../../application/usecase/ReduceStock';
import Verify from '../../application/usecase/Verify';
import HttpServer from './HttpServer';

export default class HttpController {
	constructor(
		readonly httpServer: HttpServer,
		readonly increaseStock: IncreaseStock,
		readonly reduceStock: ReduceStock,
		readonly verify: Verify,
	) {
		httpServer.on(
			'post',
			'/increase-stock',
			async function (params: any, body: any) {
				const output = await increaseStock.execute(body);
				return output;
			},
		);

		httpServer.on(
			'post',
			'/reduce-stock',
			async function (params: any, body: any) {
				const output = await reduceStock.execute(body);
				return output;
			},
		);

		httpServer.on('post', '/verify', async function (params: any, body: any) {
			const output = await verify.execute(body.idProduct);
			return output;
		});
	}
}
