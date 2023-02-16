import Link from "next/link";
import Head from 'next/head'
import { Button, PageHeader } from 'antd';
import 'antd/dist/antd.css';

const LoginHeader = () => {

  return (
    <div >
      <Head>
        <title>SignUp/LogIn</title>
      </Head>
      <PageHeader
        ghost={false}
        title="Welcom to Development"
        // subTitle="From jsonplaceholder"
        style={{ boxShadow: "0px 6px 6px 1px #dfe6e9",position:"fixed", zIndex:"1", width: "100%" }}
        extra={[
          <Link href="/SignUp-LogIn/login" key={"3"}><Button >LogIn</Button></Link>,
          <Link href="/SignUp-LogIn/signup" key={"2"}><Button >SignUp</Button></Link>,
          <Link href="/dashboard/profileDetails" key={"5"}><Button >Dash Board</Button></Link>,
          <Link href="/SignUp-LogIn/listUsers" key={"4"}><Button >User List</Button></Link>,
          <Link href="/" key={"1"}><Button >Home</Button></Link>
        ]}
      >
      </PageHeader>
    </div>
  )
}

export default LoginHeader;