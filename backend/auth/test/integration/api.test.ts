import axios from 'axios';

axios.defaults.validateStatus = function () {
	return true;
};

test('deve validar o fluxo de autenticação', async () => {
	const input = {
		email: 'teste@gmail.com',
		password: 'abc123',
		date: new Date('2023-03-01T10:00:00'),
	};
	await axios.post('http://localhost:3004/signup', input);
	const response = await axios.post('http://localhost:3004/login', input);
	const output = response.data;
	expect(output.token).toBe(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ.-842E0wQ7zdUR9iPXKcpIdXn0Vc9AFrxusy-eZb7-xA',
	);
});
