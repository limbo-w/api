import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/database/base';

import { ManageCreateCategoryDto } from '../dtos';
import { ManageUpdateCategoryDto } from '../dtos/manage/update-category.dto';
import { CategoryEntity } from '../entities';
import { CategoryRepository } from '../repositories';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity, CategoryRepository> {
    constructor(protected repository: CategoryRepository) {
        super(repository);
    }

    async create(data: ManageCreateCategoryDto) {
        const item = await this.repository.save(data);
        return this.detail(item.id);
    }

    async update({ id, ...data }: ManageUpdateCategoryDto) {
        await this.repository.update(id, data);
        return this.detail(id);
    }
}
