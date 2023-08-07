import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';

@DtoValidation()
export class ExportOrderDto {
    @ApiProperty({ description: '导出开始时间', type: Date })
    @IsDateString({ strict: true })
    @IsOptional()
    start?: Date;

    @ApiProperty({ description: '导出截止时间', type: Date })
    @IsDateString({ strict: true })
    @IsOptional()
    end?: Date;
}
