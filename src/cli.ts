import Checkout from './Checkout';
import { CouponValidator } from './CouponValidator';
import FreightCalculator from './FreightCalculator';

const input: Input = { cpf: '', items: [] };
process.stdin.on('data', async function (chunk) {
	const command = chunk.toString().replace(/\n/g, '');
	if (command.startsWith('set-cpf')) {
		input.cpf = command.replace('set-cpf ', '');
	}
	if (command.startsWith('add-item')) {
		const [idProduct, quantity] = command.replace('add-item ', '').split(' ');
		input.items.push({
			idProduct: parseInt(idProduct),
			quantity: parseInt(quantity),
		});
	}
	if (command.startsWith('simulate-freight')) {
		const freightCalculator = new FreightCalculator();
		const freight = await freightCalculator.calculateAll(input.items);
		console.log('VALOR DO FRETE: %d', freight);
	}
	if (command.startsWith('add-coupon')) {
		const code = command.replace('add-coupon ', '');
		const couponValidator = new CouponValidator();
		const isValid = await couponValidator.execute(code);
		if (isValid) {
			console.log('O cupom é valido');
			input.coupon = code;
		} else console.log('O cupom é invalido');
	}
	if (command.startsWith('checkout')) {
		try {
			const checkout = new Checkout();
			const output = await checkout.execute(input);
			console.log(output);
		} catch (e: any) {
			console.log(e.message);
		}
	}
});

type Input = {
	cpf: string;
	items: { idProduct: number; quantity: number }[];
	coupon?: string;
	from?: string;
	to?: string;
};
