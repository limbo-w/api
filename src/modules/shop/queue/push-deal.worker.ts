import { Injectable } from '@nestjs/common';
import { Job, Worker } from 'bullmq';
import chalk from 'chalk';

import { Configure } from '@/modules/core/configure';

import { RedisConfig } from '@/modules/core/types';

import { PUSH_DEAL_QUEUE } from '../constants';
import { DealService } from '../services';
import { PushDealQueueJob } from '../types';

@Injectable()
export class PushDealWorker {
    constructor(protected dealService: DealService, protected configure: Configure) {}

    async addWorker() {
        const redisConf = this.configure.get<RedisConfig>('redis') ?? [];
        const connection = redisConf.find(({ name }) => name === 'default');
        return new Worker(
            PUSH_DEAL_QUEUE,
            async (job: Job<PushDealQueueJob>) => {
                const { deal } = job.data;
                try {
                    await this.dealService.changePushed(deal);
                } catch (err) {
                    console.log(chalk.red(err));
                    throw new Error(err as string);
                }
            },
            { concurrency: 10, connection },
        );
    }
}
