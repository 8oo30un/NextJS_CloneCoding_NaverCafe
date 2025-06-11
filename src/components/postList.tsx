import React from "react";
import { useRouter } from "next/router";
import { Post } from "@/pages/api/post";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  const router = useRouter();

  return (
    <ul className="space-y-2 h-screen">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex justify-between items-center p-2 rounded border-b border-b-gray-300 cursor-pointer hover:underline h-[23%]"
        >
          <div className="flex w-[40%] ">
            <div className="flex flex-col justify-between w-[70%] ">
              <span
                onClick={() => router.push(`/posts/${post.id}`)}
                className=""
              >
                {post.title}
              </span>
              <span
                onClick={() => router.push(`/posts/${post.id}`)}
                className=" text-sm text-gray-600 truncate max-w-full w-full "
              >
                {post.content}
              </span>
            </div>
            <div className="flex flex-col  items-end justify-end w-full h-full text-sm text-gray-600">
              <div className="mt-[50%]">카테고리: {post.category}</div>
            </div>
          </div>

          <div className="space-x-2  pt-[78px] ">
            <button
              onClick={() => onEdit(post)}
              className="px-2 py-1 text-sm border border-[#d9d9d9] text-gray-600 rounded hover:bg-[#EBF8EC]"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="px-2 py-1 text-sm border border-[#d9d9d9] text-gray-600 rounded rounded hover:bg-[#EBF8EC]"
            >
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
