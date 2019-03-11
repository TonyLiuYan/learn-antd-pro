import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
export default {
    namespace: 'menu',

    state: {

    },

    effects: {
        *getMenuData({ payload }, { put }) {
            const { routes, authority } = payload;
            //routes:是布局页面下面设置的路由信息
            //authority:是布局页面的权限信息
            const originalMenuData = memoizeOneFormatter(routes, authority);
            console.log('originalMenuData', originalMenuData)
        }
    },

    reducers: {

    }

}


/**
 * 整理路由信息，重点是整理路由的name和authority属性
 */
function formatter(data, parentAuthority) {
    return data.map(item => {
        if (!item.name || !item.path) {
            return null;
        }
        const name = item.name
        const result = {
            ...item,
            name,
            authority: item.authority || parentAuthority,
        };
        if (item.routes) {
            const children = formatter(item.routes, item.authority);
            result.children = children;
        }
        delete result.routes;
        return result;
    }).filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
