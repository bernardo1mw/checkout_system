import UserRepository from '../../src/application/repository/AccountRepository';
import Login from '../../src/application/usecase/login';
import SignUp from '../../src/application/usecase/sign-up';
import User from '../../src/domain/entities/User';

test('Deve criar uma conta', async () => {
	const users: any = {};
	const userRepository: UserRepository = {
		async save(user: User): Promise<void> {
			users[user.email.value] = user;
		},
		async get(email: string): Promise<User> {
			return users[email];
		},
		countBy: function (input: string): Promise<number> {
			throw new Error('Function not implemented.');
		},
	};
	const signUp = new SignUp(userRepository);

	const input = {
		email: 'teste@gmail.com',
		password: 'abcde123',
		date: new Date('2023-03-01T10:00:00'),
	};

	await signUp.execute(input);

	const login = new Login(userRepository);
	const output = await login.execute(input);
	expect(output.token).toBe(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA',
	);
});
