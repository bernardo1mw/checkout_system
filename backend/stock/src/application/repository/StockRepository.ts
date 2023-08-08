export default interface StockRepository {
	getById(idProduct: number): Promise<number>;
	reduceStock(updateInput: UpdateInput): Promise<any>;
	increaseStock(updateInput: UpdateInput): Promise<any>;
}
export type UpdateInput = {
	idProduct: number;
	quantity: number;
};
