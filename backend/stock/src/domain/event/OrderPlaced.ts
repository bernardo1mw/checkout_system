export class orderPlaced {
	items: { idProduct: number; quantity: number }[];
	constructor() {
		this.items = [];
	}
}
