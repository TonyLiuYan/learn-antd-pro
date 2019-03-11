const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
    treeShaking: true,
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true
            },
            dynamicImport: false,
            title: '中税网',
            dll: false,
            routes: {
                exclude: [
                    /components\//,
                ],
            },
        }],
    ],
    routes: [
        {
            path: '/login',
            component: '../layouts/layoutLogin',
            routes: [
                { path: '/login', component: './Login/index' },
            ]
        },
        {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin'],
            routes: [
                { path: '/', redirect: './index' },
                {
                    path: '/index', name: '菜单1', component: './index', routes: [
                        { path: '/index/index11', name: '菜单1-1',component: './index' ,authority: ['user']},
                        { path: '/index/index12', name: '菜单1-2',component: './index' },
                    ]
                },
                { path: '/index2', name: '菜单2', component: './index' },
                { path: '/index3', name: '菜单3', component: './index' },
            ]
        },
    ],
    proxy: {
        "/api": {
            target: "https://easy-mock.com/mock/5c82106a74340a4ed3ba02b3/",
            changeOrigin: true,
        }
    },
    // resolve:{
    //   alias:{
    //     '@/api':resolveApp('src/api')
    //   }
    // }
}
