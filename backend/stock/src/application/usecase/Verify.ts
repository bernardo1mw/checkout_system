import StockRepository from '../repository/StockRepository';
import { Usecase } from './Usecase';

export default class Verify implements Usecase {
	constructor(readonly stockRepository: StockRepository) {}
	async execute(idProduct: number): Promise<any> {
		const stock = await this.stockRepository.getById(idProduct);
		if (!stock) return 0;
		return stock;
	}
}
