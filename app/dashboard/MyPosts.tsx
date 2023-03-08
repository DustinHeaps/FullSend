"use client"

import EditPost from "./EditPost"
import { useGetPostsByUser } from '../hooks/posts'


export default function MyPosts(): JSX.Element {
  const { data, isLoading } = useGetPostsByUser()
    if (isLoading) return <h1>Posts are loading...</h1>
    if (data) console.log(data)
  return (
    <div>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}