import Email from '../../src/domain/value-objects/Email';

test('Deve criar um email valido', () => {
	const email = new Email('teste@gmail.com');
	expect(email.value).toBe('teste@gmail.com');
});

test('Deve criar um email invalido', () => {
	expect(() => {
		new Email('teste@gmail');
	}).toThrow(new Error('Invalid email'));
});
