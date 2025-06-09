// src/api/posts.ts
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  createdAt: string;
}

// GET: 게시글 목록
export const getPosts = async (): Promise<Post[] | null> => {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    return response.data.posts || []; // posts만 추출
  } catch (error) {
    console.error("❌ 게시글 가져오기 실패:", error);
    return null; // 에러 발생 시 null 반환
  }
};
