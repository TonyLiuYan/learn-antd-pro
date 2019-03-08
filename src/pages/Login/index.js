import React, { PureComponent, Fragment } from 'react'
import { Input, Button, Form } from 'antd';
import Link from 'umi/link';

@Form.create()
class Index extends PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })
                            (
                                <div> 用户名：<Input></Input></div>
                            )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })
                            (
                                <div> 密码：<Input></Input></div>
                            )}

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
                <Button><Link to="/">返回主页</Link></Button>
            </Fragment>
        )
    }
}

export default Index
