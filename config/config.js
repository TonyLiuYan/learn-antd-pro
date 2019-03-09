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
            component: '../layouts/index',
            routes: [
                { path: '/', redirect: './index' },
                { path: '/index', component: './index' },
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
