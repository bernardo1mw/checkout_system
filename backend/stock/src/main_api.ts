import ExpressAdapter from './infra/http/ExpressAdapter';
import HttpController from './infra/http/HttpController';
import PgPromise from './infra/database/PgPromiseAdapter';
import Verify from './application/usecase/Verify';
import StockRepository, {
	UpdateInput,
} from './application/repository/StockRepository';
import IncreaseStock from './application/usecase/IncreaseStock';
import ReduceStock from './application/usecase/ReduceStock';

const connection = new PgPromise();
const httpServer = new ExpressAdapter();
const productsInStock: any = [5, 5, 5, 5, 5];
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
const reduceStock = new ReduceStock(stockRepository);
const verify = new Verify(stockRepository);

new HttpController(httpServer, increaseStock, reduceStock, verify);
httpServer.listen(3006);
