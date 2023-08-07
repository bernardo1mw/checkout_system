import User from '../../domain/entities/User';

export default interface UserRepository {
	countBy(input: string): Promise<number>;
	save(user: User): Promise<void>;
	get(email: string): Promise<User>;
}
