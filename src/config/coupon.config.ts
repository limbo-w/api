import { ConfigureFactory } from '@/modules/core/types';
import { defaultCouponConfig } from '@/modules/shop/constants';
import { CouponConfig } from '@/modules/shop/types';

/**
 * 优惠券配置
 */
export const coupon: ConfigureFactory<CouponConfig> = {
    register: (configure) => ({
        value: 15,
        register: 15,
        consume: 10,
    }),
    defaultRegister: defaultCouponConfig as any,
    storage: true,
};
