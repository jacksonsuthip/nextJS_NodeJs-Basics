import LoginHeader from "../../components/SignupLogin/loginheader";
import { Button, Card, Row, Col, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import Router from "next/router";

export default function ProfileDetails() {
    const [detail, setDetail] = useState({})

    useEffect(() => {
        let uid = JSON.parse(localStorage.getItem('uId'))
        const trigerAsync = async () => {
            if (uid?.length === 1) {
                const profile = await axios.get(`http://localhost:7000/api/user/get`, {
                    headers: {
                        "uid": uid[0]._id
                    }
                });
                setDetail(profile.data)
            } else {
                message.warning('Plese login to continue');
                Router.push("/SignUp-LogIn/login")
            }
        }
        trigerAsync()
    }, [])

    const logout = () => {
        localStorage.removeItem("uId")
        Router.push("/SignUp-LogIn/login")
    }

    return (
        <div >
            <LoginHeader />
            <Row>
                <Col span={7}></Col>
                <Col span={10}>
                    <Card
                        title="Profile Details"
                        style={{ margin: "20% 0%", }}
                    >
                        <Row>
                            <Col span={2}></Col>
                            <Col span={6}><b>Name</b></Col>
                            <Col span={2}>:</Col>
                            <Col span={8}>{detail.uName}</Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={6}><b>Email</b></Col>
                            <Col span={2}>:</Col>
                            <Col span={8}>{detail.email}</Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={6}><b>Phone No</b></Col>
                            <Col span={2}>:</Col>
                            <Col span={8}>{detail.phno}</Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={6}><b>Date</b></Col>
                            <Col span={2}>:</Col>
                            <Col span={8}>{moment(detail.date).format("DD-MM-YYYY")}</Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col span={7}></Col>
                            <Col span={8}>
                                <Button type="dashed" danger onClick={logout}>
                                    Logout
                                </Button>
                            </Col>
                            <Col span={8}></Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={7}></Col>
            </Row>
        </div>
    )
}
