import Postlist from '../components/apiexample/postlist'

export default function Apitest({ posts }) {
    return <Postlist listDetails={posts} />
}

// API
export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    const posts = await res.json()
    return {
        props: { posts }
    }
}
