import Coord from '../src/domain/entity/Coord';
import DistanceCalculator from '../src/domain/entity/DistanceCalculator';
import FreightCalculator from '../src/domain/entity/FreightCalculator';
import Product from '../src/domain/entity/Product';

test('Deve calcular o frete do produto', function () {
	const product = new Product(6, 'A', 1000, 100, 30, 10, 3, 'USD');
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(30);
});

test('Deve calcular o frete usando a distancia entre CEPs', function () {
	const product = new Product(6, 'A', 1000, 100, 30, 10, 3, 'USD');
	const to = new Coord(-27.5945, -48.5477);
	const from = new Coord(-22.9129, -43.2003);
	const distance = DistanceCalculator.calculate(from, to);
	const freight = FreightCalculator.calculate(product, distance);
	expect(freight).toBe(22.4466);
});
