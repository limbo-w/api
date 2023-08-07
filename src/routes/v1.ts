import { MediaManageController } from '@/modules/media/controllers/media-manage.controller';
import { MediaController } from '@/modules/media/controllers/media.controller';
import * as rbacManageControllers from '@/modules/rbac/controllers';
import { VersionOption } from '@/modules/restful/types';
import * as shopControllers from '@/modules/shop/controllers';
import * as shopManageControllers from '@/modules/shop/controllers/manage';
import { BannerManageController } from '@/modules/shop/controllers/manage/banner.controller';
import * as userControllers from '@/modules/user/controllers';
import * as userManageControllers from '@/modules/user/controllers/manage';

export const v1: VersionOption = {
    routes: [
        {
            name: 'app',
            path: '/',
            controllers: [],
            doc: {
                title: '应用接口',
                description: '前端APP应用接口',
                tags: [
                    { name: '分类查询', description: '查看商品分类列表' },
                    { name: '商品操作', description: '查看商品,筛选商品,收藏及下单等' },
                    {
                        name: '订单查询',
                        description: '在联盟下单后,后台同步之后用户侧可以查看订单列表',
                    },
                    {
                        name: '账户操作',
                        description: '用户登录后对账户进行的更改密码,换绑邮箱等一系列操作',
                    },
                    { name: 'Auth操作', description: '用户登录,登出,注册,发送找回密码等操作' },
                    {
                        name: '文件操作',
                        description: '浏览及下载文件等',
                    },
                    {
                        name: '优惠券与折扣',
                        description: '读取优惠券与折扣设置',
                    },
                    {
                        name: 'Banner查询',
                        description: '查询Banner广告位数据',
                    },
                ],
            },
            children: [
                {
                    name: 'shop',
                    path: 'shop',
                    controllers: Object.values(shopControllers),
                },
                {
                    name: 'user',
                    path: '',
                    controllers: Object.values(userControllers),
                },
                {
                    name: 'media',
                    path: '',
                    controllers: [MediaController],
                },
            ],
        },
        {
            name: 'manage',
            path: 'manage',
            controllers: [],
            doc: {
                title: '管理接口',
                description: '后台管理面板接口',
                tags: [
                    {
                        name: '分类管理',
                        description: '管理商品分类',
                    },
                    {
                        name: '品牌管理',
                        description: '管理商品品牌',
                    },
                    {
                        name: '联盟管理',
                        description: '管理入驻联盟',
                    },
                    {
                        name: '商品管理',
                        description: '管理商品',
                    },
                    {
                        name: '订单管理',
                        description: '查看及从联盟方同步订单',
                    },
                    { name: '用户管理', description: '管理应用的所有用户' },
                    {
                        name: '角色管理',
                        description:
                            '默认包含super-admin等系统角色角色,但是可以增删查改(系统角色不可操作)',
                    },
                    {
                        name: '权限管理',
                        description: '权限为系统硬编码后自动同步到数据库,只能查看',
                    },
                    {
                        name: '文件管理',
                        description: '上传的动态文件管理',
                    },
                    {
                        name: '优惠券与折扣',
                        description: '设置与读取优惠券与折扣配置',
                    },
                    {
                        name: 'Banner管理',
                        description: 'Banner广告位管理',
                    },
                ],
            },
            children: [
                {
                    name: 'shop',
                    path: 'shop',
                    controllers: Object.values(shopManageControllers),
                },
                {
                    name: 'user',
                    path: '',
                    controllers: Object.values(userManageControllers),
                },
                {
                    name: 'rbac',
                    path: 'rbac',
                    controllers: Object.values(rbacManageControllers),
                },
                {
                    name: 'media',
                    path: '',
                    controllers: [MediaManageController],
                },
                {
                    name: 'banner',
                    path: '',
                    controllers: [BannerManageController],
                },
            ],
        },
    ],
};
