// 常量
export const menus = [
    {
        icon: 'el-icon-lx-home',
        code: 'dashboard',
        name: '系统首页'
    },
    {
        icon: 'el-icon-lx-home',
        code: 'dashboard1',
        name: '权限管理',
        children:[
            {
                icon: 'el-icon-lx-home',
                code: 'user',
                name: '用户管理'
            },
            {
                icon: 'el-icon-lx-home',
                code: 'person',
                name: '员工管理'
            },
            {
                icon: 'el-icon-lx-home',
                code: 'menu',
                name: '菜单管理'
            }
        ]
    },
    {
        icon: 'el-icon-lx-home',
        code: 'dashboard2',
        name: '自定义菜单栏',
        children:[
            {
                icon: 'el-icon-lx-cascades',
                code: 'table',
                name: '基础表格'
            },
            {
                icon: 'el-icon-lx-copy',
                code: 'tabs',
                name: 'tab选项卡'
            },
            {
                icon: 'el-icon-lx-calendar',
                code: '3',
                name: '表单相关',
                children: [
                    {
                        code: 'c',
                        name: '基本表单'
                    },
                    {
                        code: '3-2',
                        name: '三级菜单',
                        children: [
                            {
                                code: 'editor',
                                name: '富文本编辑器'
                            },
                            {
                                code: 'markdown',
                                name: 'markdown编辑器'
                            }
                        ]
                    },
                    {
                        code: 'upload',
                        name: '文件上传'
                    }
                ]
            },
            {
                icon: 'el-icon-lx-emoji',
                code: 'icon',
                name: '自定义图标'
            },
            {
                icon: 'el-icon-pie-chart',
                code: 'charts',
                name: 'schart图表'
            },
            {
                icon: 'el-icon-rank',
                code: '6',
                name: '拖拽组件',
                children: [
                    {
                        code: 'drag',
                        name: '拖拽列表'
                    },
                    {
                        code: 'dialog',
                        name: '拖拽弹框'
                    }
                ]
            },
            {
                icon: 'el-icon-lx-global',
                code: 'i18n',
                name: '国际化功能'
            },
            {
                icon: 'el-icon-lx-warn',
                code: '7',
                name: '错误处理',
                children: [
                    {
                        code: 'permission',
                        name: '权限测试'
                    },
                    {
                        code: '404',
                        name: '404页面'
                    }
                ]
            },
            {
                icon: 'el-icon-lx-redpacket_fill',
                code: '/donate',
                name: '支持作者'
            },
        ]
    },                
]



// menu 保存备录
// export const menus = [
//     {
//         icon: 'el-icon-lx-home',
//         index: 'dashboard',
//         title: '系统首页'
//     },
//     {
//         icon: 'el-icon-lx-home',
//         index: 'dashboard1',
//         title: '权限管理',
//         subs:[
//             {
//                 icon: 'el-icon-lx-home',
//                 index: 'user',
//                 title: '用户管理'
//             },
//             {
//                 icon: 'el-icon-lx-home',
//                 index: 'person',
//                 title: '员工管理'
//             },
//             {
//                 icon: 'el-icon-lx-home',
//                 index: 'menu',
//                 title: '菜单管理'
//             }
//         ]
//     },
//     {
//         icon: 'el-icon-lx-home',
//         index: 'dashboard2',
//         title: '自定义菜单栏',
//         subs:[
//             {
//                 icon: 'el-icon-lx-cascades',
//                 index: 'table',
//                 title: '基础表格'
//             },
//             {
//                 icon: 'el-icon-lx-copy',
//                 index: 'tabs',
//                 title: 'tab选项卡'
//             },
//             {
//                 icon: 'el-icon-lx-calendar',
//                 index: '3',
//                 title: '表单相关',
//                 subs: [
//                     {
//                         index: 'form',
//                         title: '基本表单'
//                     },
//                     {
//                         index: '3-2',
//                         title: '三级菜单',
//                         subs: [
//                             {
//                                 index: 'editor',
//                                 title: '富文本编辑器'
//                             },
//                             {
//                                 index: 'markdown',
//                                 title: 'markdown编辑器'
//                             }
//                         ]
//                     },
//                     {
//                         index: 'upload',
//                         title: '文件上传'
//                     }
//                 ]
//             },
//             {
//                 icon: 'el-icon-lx-emoji',
//                 index: 'icon',
//                 title: '自定义图标'
//             },
//             {
//                 icon: 'el-icon-pie-chart',
//                 index: 'charts',
//                 title: 'schart图表'
//             },
//             {
//                 icon: 'el-icon-rank',
//                 index: '6',
//                 title: '拖拽组件',
//                 subs: [
//                     {
//                         index: 'drag',
//                         title: '拖拽列表'
//                     },
//                     {
//                         index: 'dialog',
//                         title: '拖拽弹框'
//                     }
//                 ]
//             },
//             {
//                 icon: 'el-icon-lx-global',
//                 index: 'i18n',
//                 title: '国际化功能'
//             },
//             {
//                 icon: 'el-icon-lx-warn',
//                 index: '7',
//                 title: '错误处理',
//                 subs: [
//                     {
//                         index: 'permission',
//                         title: '权限测试'
//                     },
//                     {
//                         index: '404',
//                         title: '404页面'
//                     }
//                 ]
//             },
//             {
//                 icon: 'el-icon-lx-redpacket_fill',
//                 index: '/donate',
//                 title: '支持作者'
//             },
//         ]
//     },                
// ]
