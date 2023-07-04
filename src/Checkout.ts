import CouponRepository from './CouponRepository';
import CouponRepositoryDatabase from './CouponRepositoryDatabase';
import CurrencyGateway from './CurrencyGateway';
import CurrencyGatewayHttp from './CurrencyGatewayHttp';
import FreightCalculator from './FreightCalculator';
import OrderRepository from './OrderRepository';
import OrderRepositoryDatabase from './OrderRepositoryDatabase';
import ProductRepository from './ProductRepository';
import ProductRepositoryDatabase from './ProductRepositoryDatabase';
import { validate } from './validator';

export default class Checkout {
	constructor(
		readonly currencyGateway: CurrencyGateway = new CurrencyGatewayHttp(),
		readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
		readonly couponRepository: CouponRepository = new CouponRepositoryDatabase(),
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase(),
	) {}

	async execute(input: Input): Promise<Output> {
		const isValid = validate(input.cpf);
		if (!isValid) throw new Error('Invalid cpf');
		const output: Output = {
			total: 0,
			freight: 0,
			serial: '',
		};
		const currencies = await this.currencyGateway.getCurrencies();
		const items: number[] = [];
		if (input.items) {
			const freightCalculator = new FreightCalculator();
			const itemFreight = await freightCalculator.calculateAll(input.items);
			output.freight += Math.max(itemFreight, 10);
			for (const item of input.items) {
				if (item.quantity <= 0) throw new Error('Invalid quantity');
				if (items.includes(item.idProduct))
					throw new Error('Duplicated item');
				const productData = await this.productRepository.getProduct(
					item.idProduct,
				);
				if (
					productData.width <= 0 ||
					productData.height <= 0 ||
					productData.length <= 0 ||
					parseFloat(productData.weight) <= 0
				)
					throw new Error('Invalid dimension');
				if (productData.currency === 'USD') {
					output.total +=
						parseFloat(productData.price) *
						item.quantity *
						currencies.usd;
				} else {
					output.total += parseFloat(productData.price) * item.quantity;
				}

				items.push(item.idProduct);
			}
		}
		if (input.coupon) {
			const couponData = await this.couponRepository.getCoupon(input.coupon);
			if (couponData.expire_date.getTime() >= new Date().getTime()) {
				const percentage = parseFloat(couponData.percentage);
				output.total -= (output.total * percentage) / 100;
			}
		}
		if (input.from && input.to) {
			output.total += output.freight;
		}
		const order = await this.orderRepository.save();
		// console.log(order);
		output.serial = this.makeSerial(order.id);
		return output;
	}

	makeSerial(id: number): string {
		let _serial = '' + id;
		const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 8 - id.toString().length; i++) {
			_serial += 0;
		}
		const serial =
			new Date().getFullYear() + _serial.split('').reverse().join('');

		return serial;
	}
}

type Input = {
	cpf: string;
	items: { idProduct: number; quantity: number }[];
	coupon?: string;
	from?: string;
	to?: string;
};

type Output = {
	total: number;
	freight: number;
	serial?: string;
};
