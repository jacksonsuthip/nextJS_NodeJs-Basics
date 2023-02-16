import LoginHeader from "../../components/SignupLogin/loginheader";
import { Button, Form, Input, Card, Row, Col, message } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function LogIn({ ip }) {

    const [warning, setWarning] = useState('')
    const [uValu, setsuccess] = useState({})
    const [form] = Form.useForm();

    useEffect(() => {
        let uid = JSON.parse(localStorage.getItem('uId'))
        if (uid?.length === 1) {
            message.success('You are alredy LogedIn');
            Router.push("/dashboard/profileDetails")
        }
    }, [])

    const onFinish = async (values) => {
        try {
            const login = await axios.post('http://localhost:7000/api/user/login', {
                name: values.username,
                password: values.password
            });
            console.log('login: ', login.data.length);
            if (login.data.length === 1) {
                localStorage.setItem("uId", JSON.stringify(login.data))
                await axios.post('http://localhost:7000/api/user/login/save', {
                    id: login.data[0]._id,
                    name: login.data[0].uName,
                    ip: ip
                })
                message.success('Login Success . . .');
                Router.push("/dashboard/profileDetails")
            } else {
                message.warning('Username or Password is incorrect !');
                setWarning('warning')
                form.setFieldsValue({ password: '' })
            }
        } catch (err) {
            console.log('err: ', err);
            message.error('Faild to login');
        }
    };

    function checkUname(val) {
        axios.post('http://localhost:7000/api/user/uname', { name: val })
            .then((res) => {
                if (res.data) {
                    setsuccess({ success: "success" })
                } else {
                    setsuccess({ help: "Can't find this Username", success: "warning" })
                }
            })
    }

    return (
        <div >
            <LoginHeader />
            <Row>
                <Col span={7}></Col>
                <Col span={10}>
                    <Card
                        title="Login"
                        style={{ margin: "20% 0%", }}
                    >
                        <Form
                            name="normal_login"
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Row>
                                <Col span={6}></Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Username!',
                                            },
                                        ]}
                                        validateStatus={uValu?.success} hasFeedback
                                        help={uValu?.help}
                                    >
                                        <Input prefix={<UserOutlined />}
                                            placeholder="Username"
                                            onBlur={e => checkUname(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Password!',
                                            },
                                        ]}
                                        validateStatus={warning} hasFeedback
                                    >
                                        <Input prefix={<LockOutlined />}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" >
                                            Log in
                                        </Button>
                                        &nbsp;&nbsp;Or&nbsp;&nbsp;
                                        <Link href="/SignUp-LogIn/signup">Create New!</Link>
                                    </Form.Item>
                                </Col>
                                <Col span={6}></Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col span={7}></Col>
            </Row>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    return {
        props: { ip },
    };
}
