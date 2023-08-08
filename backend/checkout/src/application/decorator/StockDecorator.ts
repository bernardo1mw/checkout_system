import AuthGatewayHttp from '../../infra/gateway/AuthGatewayHttp';
import StockGatewayHttp from '../../infra/gateway/StockGatewayHttp';
import AxiosAdapter from '../../infra/http/AxiosAdapter';
import { AuthGateway } from '../gateway/AuthGateway';
import { StockGateway } from '../gateway/StockGateway';
import { Usecase } from '../usecase/Usecase';

export class StockDecorator implements Usecase {
	constructor(
		readonly usecase: Usecase,

		readonly stockGateway: StockGateway = new StockGatewayHttp(
			new AxiosAdapter(),
		),
	) {}

	async execute(input: any): Promise<any> {
		if (input && input.items) {
			{
				try {
					for (const item of input.items) {
						await this.stockGateway.reduceStock(item);
					}
					return this.usecase.execute(input);
				} catch (error) {
					throw new Error('Auth error');
				}
			}
		} else {
			return this.usecase.execute(input);
		}
	}
}
