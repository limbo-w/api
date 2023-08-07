import { defaultAppConfig } from '@/modules/core/constants';
import { AppConfig, ConfigureFactory } from '@/modules/core/types';

/**
 * 应用配置
 */
export const app: ConfigureFactory<AppConfig> = {
    register: (configure) => ({
        host: '127.0.0.1',
        port: 3101,
        // 默认时区
        timezone: 'Asia/Shanghai',
        // 默认语言
        locale: 'zh-cn',
        url: configure.env('APP_URL', undefined),
    }),
    defaultRegister: defaultAppConfig,
};
