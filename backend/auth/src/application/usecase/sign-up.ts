import User from '../../domain/entities/User';
import UserRepository from '../repository/AccountRepository';

export default class SignUp {
	constructor(
		//readonly uuidGenerator: UuidGenerator,
		readonly userRepository: UserRepository,
	) {}
	async execute(input: Input): Promise<void> {
		const { email, password } = input;
		const user = await User.create({ email, password });
		await this.userRepository.save(user);
	}
}

export type Input = {
	email: string;
	password: string;
};
