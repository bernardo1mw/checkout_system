import UserRepository from '../../src/application/repository/AccountRepository';
import Login from '../../src/application/usecase/login';
import SignUp from '../../src/application/usecase/sign-up';
import Verify from '../../src/application/usecase/verify';
import User from '../../src/domain/entities/User';

test('Deve verificar um token', async () => {
	const verify = new Verify();
	const payload = await verify.execute(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA',
	);
	expect(payload.email).toBe('teste@gmail.com');
});
