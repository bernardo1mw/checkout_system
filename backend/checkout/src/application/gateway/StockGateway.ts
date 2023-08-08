export interface StockGateway {
	verify(input: { idProduct: number }): Promise<any>;
	increaseStock(input: { idProduct: number; quantity: number }): Promise<any>;
	reduceStock(input: { idProduct: number; quantity: number }): Promise<any>;
}
