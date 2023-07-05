import pgp from 'pg-promise';
import ZipcodeRepository from './ZipcodeRepository';
import Coord from './domain/entity/Coord';

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {
	async getCoordinate(code: string): Promise<Coord> {
		const connection = pgp()('postgres://postgres:123456@localhost:5432/app');
		const [coordinates] = await connection.query(
			'select * from cccat10.zipcode where code = $1',
			[code],
		);
		await connection.$pool.end();
		return new Coord(coordinates.lat, coordinates.long);
	}
}
