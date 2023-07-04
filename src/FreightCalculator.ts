import ProductRepository from './ProductRepository';
import ProductRepositoryDatabase from './ProductRepositoryDatabase';

export default class FreightCalculator {
	constructor(
		private readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
	) {}
	static calculate(product: any) {
		const volume =
			((((product.width / 100) * product.height) / 100) * product.length) /
			100;
		const density = parseFloat(product.weight) / volume;
		const itemFreight = 1000 * volume * (density / 100);
		return itemFreight;
	}
	async calculateAll(items: Input) {
		let value = 0;
		for (const item of items) {
			const productData = await this.productRepository.getProduct(
				item.idProduct,
			);
			const itemFreight = FreightCalculator.calculate(productData);
			value += Math.max(itemFreight, 10) * item.quantity;
		}
		return value;
	}
}

export type Input = { idProduct: number; quantity: number }[];
