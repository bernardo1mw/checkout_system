import HttpClient from '../http/HttpClient';
import { StockGateway } from '../../application/gateway/StockGateway';

export default class StockGatewayHttp implements StockGateway {
	constructor(readonly httpClient: HttpClient) {}
	async increaseStock(input: {
		idProduct: number;
		quantity: number;
	}): Promise<any> {
		const response = await this.httpClient.post(
			'http://localhost:3006/increase-stock',
			{ idProduct: input.idProduct, quantity: input.quantity },
		);
		return response;
	}
	async reduceStock(input: {
		idProduct: number;
		quantity: number;
	}): Promise<any> {
		const response = await this.httpClient.post(
			'http://localhost:3006/reduce-stock',
			{ idProduct: input.idProduct, quantity: input.quantity },
		);
		return response;
	}
	async verify(input: { idProduct: number }): Promise<any> {
		const response = await this.httpClient.post(
			'http://localhost:3006/verify',
			{ idProduct: input.idProduct },
		);
		return response;
	}
}
