import Connection from '../database/Connection';
import AccountRepository from '../../application/repository/AccountRepository';
import Account from '../../domain/entities/User';

export default class AccountRepositoryDatabase implements AccountRepository {
	constructor(readonly connection: Connection) {}

	async save(account: Account): Promise<void> {
		await this.connection.query(
			'insert into cccat10.account (id_account, username,email, password) values ($1, $2, $3, $4)',
			[
				account.getState().uuid,
				account.getState().username,
				account.getState().email,
				account.getState().password,
			],
		);
	}

	async countBy(input: string): Promise<number> {
		const [options] = await this.connection.query(
			'select count(*) from cccat10.acount where username = $1 or email = $1',
			[input],
		);
		return parseInt(options.count);
	}
}
