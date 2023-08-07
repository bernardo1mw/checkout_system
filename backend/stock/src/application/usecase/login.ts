import { TokenGenerator } from '../../domain/TokenGenerator';
import User from '../../domain/entities/User';
import UserRepository from '../repository/AccountRepository';

export default class Login {
	constructor(
		//readonly uuidGenerator: UuidGenerator,
		readonly userRepository: UserRepository,
	) {}
	async execute(input: Input): Promise<Output> {
		const { email, password, date } = input;
		const user = await this.userRepository.get(email);
		if (!user) throw new Error('Authentication failed');
		const isValidPassword = await user.validatePassword(password);
		if (!isValidPassword) throw new Error('Authentication failed');
		const tokenGenerator = new TokenGenerator('key');

		const token = tokenGenerator.generate(user, 1000000, date);
		return { token };
	}
}

export type Input = {
	email: string;
	password: string;
	date: Date;
};

export type Output = {
	token: string;
};
