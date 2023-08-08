import StockRepository from '../repository/StockRepository';
import { Usecase } from './Usecase';

export default class IncreaseStock implements Usecase {
	constructor(readonly stockRepository: StockRepository) {}
	async execute(input: Input): Promise<any> {
		await this.stockRepository.increaseStock(input);
		return true;
	}
}

export type Input = {
	idProduct: number;
	quantity: number;
};
