import React from "react";

export interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  imageUrl?: string; // 사진 URL (있을 수도, 없을 수도)
}

interface PopularPostsProps {
  posts: Post[];
}

const PopularPosts: React.FC<PopularPostsProps> = ({ posts }) => {
  const displayPosts = posts.slice(0, 3);

  return (
    <div className="flex gap-3 h-full overflow-x-auto mt-[24px] ">
      {displayPosts.map((post) => (
        <div key={post.id} className=" w-full  h-[80%]  rounded gap-3 ">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-full h-[80%] bg-gray-300 rounded mb-[8px]" />
          )}
          <div className="flex flex-col justify-between">
            <h3 className="font-bold text-sm line-clamp-2">{post.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularPosts;
