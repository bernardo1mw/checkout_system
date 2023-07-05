import OrderRepository from '../../OrderRepository';
import OrderRepositoryDatabase from '../../OrderRepositoryDatabase';

export default class GetAllOrders {
	constructor(
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase(),
	) {}

	async execute(): Promise<Output[]> {
		const orders = await this.orderRepository.getAll();
		return orders.map((order) => {
			return {
				code: order.getCode(),
				total: order.getTotal(),
				freight: order.freight,
			};
		});
	}
}

type Output = {
	code: string;
	total: number;
	freight: number;
};
