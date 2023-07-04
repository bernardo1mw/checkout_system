import pgp from 'pg-promise';
import OrderRepository from './OrderRepository';

export default class OrderRepositoryDatabase implements OrderRepository {
	async save(): Promise<any> {
		const connection = pgp()('postgres://postgres:123456@localhost:5432/app');
		const date = new Date();
		const order = await connection.result(
			'insert into cccat10.order (order_date) values ($1) returning *;',
			date,
		);
		const orderValues = order.rows.values().next().value;
		await connection.$pool.end();
		return orderValues;
	}
}
