import Coord from './domain/entity/Coord';

export default interface ZipcodeRepository {
	getCoordinate(code: string): Promise<Coord>;
}
