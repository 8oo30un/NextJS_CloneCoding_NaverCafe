"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../api/post"; // ✅ 경로 주의
import type { Post } from "../api/post";

const BannerLeft = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await getPosts();

      if (result === null) {
        setFetchFailed(true);
      } else {
        setPosts(result);
      }

      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>📚 게시글 목록</h2>
      {fetchFailed ? (
        <div className="text-red-500 font-bold">
          게시글을 불러오지 못했습니다.
        </div>
      ) : posts.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title} - {post.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BannerLeft;
