import { BullModule } from '@nestjs/bullmq';

import { ModuleBuilder } from '../core/decorators';
import { DatabaseModule } from '../database/database.module';
import { addEntities } from '../database/helpers';

import { MediaModule } from '../media/media.module';

import { RbacModule } from '../rbac/rbac.module';
import { UserModule } from '../user/user.module';

import { PUSH_DEAL_QUEUE } from './constants';

import * as DtoMaps from './dtos';
import * as EntityMaps from './entities';
import { PushDealJob } from './queue/push-deal.job';
import { PushDealWorker } from './queue/push-deal.worker';
import { ShopRbac } from './rbac';
import * as RepositoryMaps from './repositories';
import * as ServerMaps from './services';

const entities = Object.values(EntityMaps);
const repositories = Object.values(RepositoryMaps);
const dtos = Object.values(DtoMaps);
const services = Object.values(ServerMaps);

const providers = [...dtos, ...services, PushDealJob, PushDealWorker, ShopRbac];

@ModuleBuilder((configure) => {
    // if (configure.get<boolean>('app.server', true)) providers.push(DealPushGateway as any);
    return {
        imports: [
            UserModule,
            RbacModule,
            MediaModule,
            addEntities(configure, entities),
            DatabaseModule.forRepository(repositories),
            BullModule.registerQueue({
                name: PUSH_DEAL_QUEUE,
            }),
        ],
        providers,
        exports: [DatabaseModule.forRepository(repositories), ...services],
    };
})
export class ShopModule {}
