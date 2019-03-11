import React, { PureComponent } from 'react'
import { connect } from 'dva';



@connect(({menu})=>({
    menu
}))
class BasicLayout extends PureComponent {

    componentDidMount = () => {
        const {
            dispatch,
            route:{routes,authority},
            route,
        } = this.props;
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes, authority },
          });

        console.log('route', route)
        console.log('routes', routes)
        // console.log('this.props', this.props)
    }


    render() {

        const { children } = this.props
        return (
            <div>
                <div>测试布局</div>
                {children}
            </div>
        )
    }
}

export default BasicLayout
