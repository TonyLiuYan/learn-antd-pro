
// ref: https://umijs.org/config/
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
            path: '/',
            component: '../layouts/index',
            routes: [
                { path: '/', redirect: './index' },
                { path: '/index', component: './index' },
                { path: '/login', component: './Login/index' },
            ]
        },
    ]
}  