import StockRepository, {
	UpdateInput,
} from '../../src/application/repository/StockRepository';
import IncreaseStock from '../../src/application/usecase/IncreaseStock';
import Verify from '../../src/application/usecase/Verify';

const productsInStock: any = {};

beforeEach(function () {
	productsInStock[1] = 5;
	productsInStock[2] = 5;
});

test('Deve aumentar o estoque de um produto', async () => {
	const stockRepository: StockRepository = {
		async getById(idProduct: number): Promise<number> {
			return productsInStock[idProduct];
		},
		async reduceStock(input: UpdateInput): Promise<any> {
			productsInStock[input.idProduct] -= input.quantity;
		},
		async increaseStock(input: UpdateInput): Promise<any> {
			productsInStock[input.idProduct] += input.quantity;
		},
	};
	const increaseStock = new IncreaseStock(stockRepository);
	const input = { idProduct: 1, quantity: 2 };
	await increaseStock.execute(input);

	const verify = new Verify(stockRepository);
	const output = await verify.execute(1);
	expect(output).toBe(7);
});
