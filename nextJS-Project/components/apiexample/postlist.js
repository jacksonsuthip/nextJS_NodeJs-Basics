import Link from "next/link"
import Head from 'next/head'
import 'antd/dist/antd.css';
import { Button, List, PageHeader } from "antd";

export default function Postlist({ listDetails }) {
    console.log("props-listDetails", listDetails);
    return (
        <div >
            <Head><title>Api-Test</title></Head>
            <PageHeader
                ghost={false}
                title="API Sample"
                subTitle="From jsonplaceholder"
                style={{ boxShadow: "0px 6px 6px 1px #dfe6e9", height: "" }}
                extra={[
                    <Link href="/" key={"1"}><Button >Home</Button></Link>
                ]}
            >
            </PageHeader>
            <List
                size="large"
                header={<div></div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={listDetails}
                renderItem={(item) =>
                    <Link href="/post/[postitemID]" as={`/post/${item.id}`}>
                        <List.Item>{item.id} - {item.title}</List.Item>
                    </Link>
                }
            />
        </div>
    )
}

