import { Table } from "antd";
import { useEffect, useState } from "react";
import LoginHeader from "../../components/SignupLogin/loginheader";

export default function ListUsers({ userList }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let userTemp = JSON.parse(JSON.stringify(users));
        userList.map((val, i) => {
            const dateFormate = val.date.split('T')[0].split('-')
            userTemp.push({
                key: i + 1,
                name: val.uName,
                phno: val.phno,
                email: val.email,
                date: `${dateFormate[2]}-${dateFormate[1]}-${dateFormate[0]}`
            })
            setUsers(userTemp)
        })
    }, [userList])

    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phno',
            key: 'phno',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <div >
            <LoginHeader />
            <Table
                dataSource={users}
                columns={columns}
                style={{ padding: "10%" }}
                pagination={{ position: ['bottomCenter'], pageSize: 5 }}
            />
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:7000/api/user/all')
    const userList = await res.json()
    return {
        props: { userList }
    }
}