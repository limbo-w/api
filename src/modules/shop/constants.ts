import { CouponConfig } from './types';

export enum DealOrderType {
    CREATED = 'createdAt',
    UPDATED = 'updatedAt',
    ENDED = 'endedAt',
    CUSTOM = 'custom',
}
export const PUSH_DEAL_QUEUE = 'push-deal-queue';
export const defaultCouponConfig = (): CouponConfig => ({
    value: 15,
    register: 15,
    consume: 10,
});
