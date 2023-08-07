import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';

import { ListQueryDto } from './list-query.dto';

@DtoValidation({ type: 'query' })
export class SearchListQueryDto extends ListQueryDto {
    @ApiPropertyOptional({
        description: '搜索关键字',
    })
    @IsOptional()
    search?: string;
}
