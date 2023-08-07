import { TokenGenerator } from '../../src/domain/TokenGenerator';
import User from '../../src/domain/entities/User';

test('Deve gerar o token do usuario', async () => {
	const user = await User.create({
		email: 'teste@gmail.com',
		password: 'abc123',
	});
	const expiresIn = 1000000;
	const issueDate = new Date('2023-03-01T10:00:00');
	const tokenGenerator = new TokenGenerator('key');
	const token = tokenGenerator.generate(user, expiresIn, issueDate);
	expect(token).toBe(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA',
	);
});

test('Deve validar o token do usuario', async () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA';

	const tokenGenerator = new TokenGenerator('key');
	const payload = tokenGenerator.verify(token);
	expect(payload).toBeDefined();
	expect(payload.email).toBe('teste@gmail.com');
});

test('Deve tentar validar o token invalido', async () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA';

	const tokenGenerator = new TokenGenerator('key');
	expect(() => {
		tokenGenerator.verify(token);
	}).toThrow(new Error('invalid token'));
});
