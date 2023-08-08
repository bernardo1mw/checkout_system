import StockRepository from '../repository/StockRepository';
import { Usecase } from './Usecase';

export default class ReduceStock implements Usecase {
	constructor(readonly stockRepository: StockRepository) {}
	async execute(input: Input): Promise<any> {
		const quantityInStock = await this.stockRepository.getById(
			input.idProduct,
		);
		if (input.quantity > quantityInStock) {
			throw new Error('Not enough products in stock.');
		}
		await this.stockRepository.reduceStock(input);
		return true;
	}
}

export type Input = {
	idProduct: number;
	quantity: number;
};
