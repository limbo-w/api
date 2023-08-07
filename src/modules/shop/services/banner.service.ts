import { Injectable } from '@nestjs/common';

import { isNil } from 'lodash';

import { Configure } from '@/modules/core/configure';
import { BaseService } from '@/modules/database/base';
import { MediaRepository } from '@/modules/media/repositories';

import { ManageCreateBannerDto, ManageUpdateDealDto } from '../dtos';
import { BannerEntity } from '../entities';

import { BannerRepository } from '../repositories';

import { StoreRepository } from '../repositories/store.repository';

@Injectable()
export class BannerService extends BaseService<BannerEntity, BannerRepository> {
    constructor(
        protected repository: BannerRepository,
        protected storeRepository: StoreRepository,
        protected mediaRepository: MediaRepository,
        protected configure: Configure,
    ) {
        super(repository);
    }

    async create({ image, store, ...data }: ManageCreateBannerDto) {
        const item = await this.repository.save({
            ...data,
            image: await this.mediaRepository.findOneByOrFail({ id: image }),
            store: await this.storeRepository.findOneByOrFail({ id: store }),
        });
        return this.detail(item.id);
    }

    async update({ id, store, image, ...data }: ManageUpdateDealDto) {
        const item = await this.detail(id);
        if (!isNil(image)) {
            if ((!isNil(item.image) && item.image.id !== image) || isNil(item.image)) {
                if (!isNil(item.image)) await this.mediaRepository.remove(item.image);
                const current = await this.mediaRepository.findOneByOrFail({ id: image });
                current.banner = await this.repository.findOneByOrFail({ id });
                await this.mediaRepository.save(current);
            }
        }
        await this.repository.update(id, {
            ...data,
            store: store ? await this.storeRepository.findOneByOrFail({ id: store }) : undefined,
        });
        return this.detail(id);
    }
}
