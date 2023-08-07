import { TokenGenerator } from '../../domain/TokenGenerator';
import User from '../../domain/entities/User';
import UserRepository from '../repository/AccountRepository';

export default class Verify {
	constructor() {}
	async execute(token: string): Promise<any> {
		const tokenGenerator = new TokenGenerator('key');
		return tokenGenerator.verify(token);
	}
}
