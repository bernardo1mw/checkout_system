import Product from './Product';

export default class FreightCalculator {
	static calculate(product: Product, distance?: number, quantity = 1) {
		const volume = product.getVolume();
		const density = product.weight / volume;
		if (!distance) {
			distance = 1000;
		}
		const itemFreight = distance * volume * (density / 100);
		return Math.max(itemFreight, 10) * quantity;
	}
}
