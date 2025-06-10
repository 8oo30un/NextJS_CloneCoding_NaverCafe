"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import type { Post } from "../api/post";

const BannerLeft = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      console.log("📡 getPosts() 호출 시작");

      const result = await getPosts();

      if (result === null) {
        console.warn("⚠️ 게시글 데이터를 불러오지 못했습니다.");
        setFetchFailed(true);
      } else {
        console.log("✅ 게시글 데이터 수신:", result);
        setPosts(result);
      }

      setLoading(false);
      console.log("✅ 로딩 완료");
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
