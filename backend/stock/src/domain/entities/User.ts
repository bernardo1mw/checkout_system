import Email from '../value-objects/Email';
import Password from '../value-objects/Password';
import Username from '../value-objects/Username';

export default class User {
	private uuid: string;
	private username: string;

	private constructor(readonly email: Email, readonly password: Password) {}

	static async create(input: CreateInput) {
		return new User(
			new Email(input.email),
			await Password.create(input.password),
		);
	}

	async validatePassword(password: string) {
		return this.password.validate(password);
	}

	static async buildExistingUser(email: string, hash: string, salt: string) {
		return new User(new Email(email), new Password(hash, salt));
	}

	// hashPassword(hashedPassword: string) {
	// 	this.password = hashedPassword;
	// }

	// getState() {
	// 	return {
	// 		id_account: this.id,
	// 		username: this.username,
	// 		uuid: this.uuid,
	// 		password: this.password,
	// 		email: this.email,
	// 	};
	// }
}

export type CreateInput = {
	email: string;
	password: string;
	uuid?: string;
};
