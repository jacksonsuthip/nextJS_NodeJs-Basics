import LoginHeader from "../../components/SignupLogin/loginheader";
import { Button, Form, Input, Card, Row, Col, DatePicker, Space, message } from 'antd';
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

export default function Postitem() {

    const [uValu, setsuccess] = useState({})
    const [btnClick, setBtnClick] = useState(true)

    const onFinish = async (values) => {
        try {
            const create = await axios.post('http://localhost:7000/api/user/create', {
                uName: values.name,
                uEmail: values.email,
                uPhno: values.phno,
                date: values.date.format('YYYY-MM-DD'),
                uPassword: values.password
            });
            console.log('create: ', create);
            message.success('Registration Success . . .');
            Router.push("/SignUp-LogIn/login")
        } catch (err) {
            console.log('err: ', err);
            message.error('Faild to Register');
        }
    };

    function checkUname(val) {
        axios.post('http://localhost:7000/api/user/uname', { name: val })
            .then((res) => {
                if (res.data) {
                    setsuccess({ help: "Please try different username", success: "warning" })
                    setBtnClick(true)
                } else {
                    setsuccess({ success: "success" })
                    setBtnClick(false)
                }
            })
    }

    return (
        <div>
            <LoginHeader />
            <Row>
                <Col span={7}></Col>
                <Col span={10}>
                    <Card
                        title="SignUp"
                        style={{
                            margin: "16% 0%",
                        }}
                    >
                        <Form
                            name="normal_login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 10 }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                                validateStatus={uValu?.success} hasFeedback
                                help={uValu?.help}
                            >
                                <Input onBlur={e => checkUname(e.target.value)} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="Ph. No"
                                name="phno"
                            >
                                <Input placeholder="Phone No" />
                            </Form.Item>
                            <Form.Item label="Date" name="date"
                                rules={[{
                                    required: true,
                                    message: 'Please input Date!',
                                }]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ offset: 9 }}
                            >
                                <Space>
                                    <Button type="primary" htmlType="submit" disabled={btnClick}>
                                        Submit
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={7}></Col>
            </Row>
        </div>
    )
}
