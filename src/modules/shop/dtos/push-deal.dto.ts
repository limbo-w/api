import { Injectable } from '@nestjs/common';
import { IsDefined, IsUUID } from 'class-validator';
/**
 * websocket认证请求验证
 */
@Injectable()
export class WSAuthDto {
    @IsDefined({
        message: 'Token必须填写',
    })
    token!: string;
}
/**
 * websocket发送消息请求验证
 */
export class WSDealPushDto extends WSAuthDto {
    @IsUUID(undefined, {
        message: 'ID格式错误',
    })
    @IsDefined({
        message: '商品ID必须指定',
    })
    id: string;
}
