import StockRepository, {
	UpdateInput,
} from '../../src/application/repository/StockRepository';
import ReduceStock, { Input } from '../../src/application/usecase/ReduceStock';
import Verify from '../../src/application/usecase/Verify';

const productsInStock: any = {};

beforeEach(function () {
	productsInStock[1] = 5;
	productsInStock[2] = 5;
});

test('Deve diminuir o estoque de um produto', async () => {
	const stockRepository: StockRepository = {
		async getById(idProduct: number): Promise<number> {
			return productsInStock[idProduct];
		},
		async reduceStock(input: UpdateInput): Promise<any> {
			productsInStock[input.idProduct] -= input.quantity;
		},
		increaseStock: function (updateInput: UpdateInput): Promise<any> {
			throw new Error('Function not implemented.');
		},
	};
	const reduceStock = new ReduceStock(stockRepository);
	const input = { idProduct: 1, quantity: 2 };
	await reduceStock.execute(input);

	const verify = new Verify(stockRepository);
	const output = await verify.execute(1);
	expect(output).toBe(3);
});

test('Não deve diminuir o estoque caso a quantidade seja maior que o disponível', async () => {
	const stockRepository: StockRepository = {
		async getById(idProduct: number): Promise<number> {
			return productsInStock[idProduct];
		},
		async reduceStock(input: UpdateInput): Promise<any> {
			productsInStock[input.idProduct] -= input.quantity;
		},
		increaseStock: function (updateInput: UpdateInput): Promise<any> {
			throw new Error('Function not implemented.');
		},
	};
	const input = {
		idProduct: 1,
		quantity: 6,
	};
	const reduceStock = new ReduceStock(stockRepository);
	expect(() => reduceStock.execute(input)).rejects.toThrow(
		new Error('Not enough products in stock.'),
	);
});
