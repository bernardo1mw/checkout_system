import User from '../../src/domain/entities/User';
import Email from '../../src/domain/value-objects/Email';

test('Deve criar um novo usuario', async () => {
	const user = await User.create({
		email: 'teste@gmail.com',
		password: 'abc123',
	});
	const isValidPassword = await user.validatePassword('abc123');
	expect(isValidPassword).toBeTruthy;
});

test('Deve criar um usuario a partir do banco de dados', async () => {
	const user = await User.buildExistingUser(
		'teste@gmail.com',
		'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2',
		'salt',
	);
	const isValidPassword = await user.validatePassword('abc123');
	expect(isValidPassword).toBeTruthy;
});
