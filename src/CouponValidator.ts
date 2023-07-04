import CouponRepository from './CouponRepository';
import CouponRepositoryDatabase from './CouponRepositoryDatabase';

export class CouponValidator {
	constructor(
		private readonly couponRepository: CouponRepository = new CouponRepositoryDatabase(),
	) {}

	async execute(code: string): Promise<boolean> {
		const coupon = await this.couponRepository.getCoupon(code);
		if (!coupon) return false;
		if (coupon.expire_date.getTime() >= new Date().getTime()) return true;
		return false;
	}
}
