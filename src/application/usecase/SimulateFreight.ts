import DistanceCalculator from '../../domain/entity/DistanceCalculator';
import FreightCalculator from '../../domain/entity/FreightCalculator';
import ProductRepository from '../../ProductRepository';
import ProductRepositoryDatabase from '../../ProductRepositoryDatabase';
import ZipcodeRepository from '../../ZipcodeRepository';
import ZipcodeRepositoryDatabase from '../../ZipcodeRepositoryDatabase';

export default class SimulateFreight {
	constructor(
		readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
		readonly zipcodeRepository: ZipcodeRepository = new ZipcodeRepositoryDatabase(),
	) {}

	async execute(input: Input): Promise<Output> {
		const output: Output = {
			freight: 0,
		};
		let distance;
		if (input.from && input.to) {
			const from = await this.zipcodeRepository.getCoordinate(input.from);
			const to = await this.zipcodeRepository.getCoordinate(input.to);
			distance = DistanceCalculator.calculate(from, to);
		}
		if (input.items) {
			for (const item of input.items) {
				const product = await this.productRepository.getProduct(
					item.idProduct,
				);
				const itemFreight = FreightCalculator.calculate(
					product,
					distance,
					item.quantity,
				);
				output.freight += itemFreight;
			}
		}
		return output;
	}
}

type Input = {
	items: { idProduct: number; quantity: number }[];
	from?: string;
	to?: string;
};

type Output = {
	freight: number;
};
