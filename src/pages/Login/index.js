import React, { PureComponent, Fragment } from 'react'
import { Input,Button } from 'antd';
import Link from 'umi/link';
class Index extends PureComponent {



    render() {
        return (
            <Fragment>
                <div> 用户名：<Input></Input></div>
                <div> 密码：<Input></Input></div>
                <Button>登录</Button>
                <Button><Link to="/">返回主页</Link></Button>
            </Fragment>
        )
    }
}
export default Index
