import { useRouter } from "next/router"
import Link from "next/link";
import { Button, Card, PageHeader } from "antd";
import 'antd/dist/antd.css';

export default function Postitem({ data }) {
  const route = useRouter()
  console.log('Route', route.query.postitemID);
  // console.log('data', data);
  return (
    <div >
      <PageHeader
        ghost={false}
        title="API Sample"
        subTitle="From jsonplaceholder"
        style={{ boxShadow: "0px 6px 6px 1px #dfe6e9" }}
        extra={[
          <Link href="/api-test" key={"1"}><Button >Back</Button></Link>
        ]}
      >
      </PageHeader>
      <Card
        title={data.id}
        style={{
          width: 600,
          margin:"5% 25%"
        }}
      >
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </Card>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.postitemID}`)
  const data = await res.json()
  return { props: { data } }
}