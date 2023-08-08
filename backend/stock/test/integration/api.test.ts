import axios from 'axios';

axios.defaults.validateStatus = function () {
	return true;
};

test('deve validar o fluxo de autenticação', async () => {
	const input = {
		idProduct: 1,
		quantity: 2,
	};
	await axios.post('http://localhost:3006/increase-stock', input);
	const response = await axios.post('http://localhost:3006/verify', {
		productId: 1,
	});
	expect(response.data).toBe(7);
	await axios.post('http://localhost:3006/reduce-stock', input);
	const res = await axios.post('http://localhost:3006/verify', {
		productId: 1,
	});
	expect(res.data).toBe(5);
});
