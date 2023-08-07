import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { PUSH_DEAL_QUEUE } from '../constants';
import { PushDealQueueJob } from '../types';

import { PushDealWorker } from './push-deal.worker';

@Injectable()
export class PushDealJob {
    constructor(
        @InjectQueue(PUSH_DEAL_QUEUE) protected queue: Queue,
        protected worker: PushDealWorker,
    ) {
        this.worker.addWorker();
    }

    async push(params: PushDealQueueJob) {
        try {
            await this.queue.add('push-deal', params);
        } catch (err) {
            throw new BadRequestException(err);
        }
        return { result: true };
    }
}
