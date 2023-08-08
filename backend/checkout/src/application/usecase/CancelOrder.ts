import OrderRepository from '../repository/OrderRepository';
import OrderRepositoryDatabase from '../../infra/repository/OrderRepositoryDatabase';
import { StockGateway } from '../gateway/StockGateway';

export default class CancelOrder {
	constructor(
		readonly orderRepository: OrderRepository,
		readonly stockGateway: StockGateway,
	) {}

	async execute(id: string): Promise<any> {
		const order = await this.orderRepository.getById(id);
		order.status = 'CANCELED';
		for (const item of order.items) {
			await this.stockGateway.increaseStock(item);
		}
		return true;
	}
}
