// src/api/posts.ts
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface CreatePostInput {
  title: string;
  author: string;
  category: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  author?: string;
  category?: string;
  content?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// GET: 게시글 목록
export const getPosts = async (): Promise<Post[] | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    console.log(response.data); // 실제 구조 확인
    return response.data || []; // posts만 추출
  } catch (error) {
    console.error("❌ 게시글 가져오기 실패:", error);
    return null; // 에러 발생 시 null 반환
  }

  // return [
  //   {
  //     id: 1,
  //     title: "첫 번째 게시글",
  //     author: "관리자",
  //     category: "공지사항",
  //     createdAt: "2025-06-01T10:00:00Z",
  //     updatedAt: "2025-06-01T10:00:00Z",
  //     content: "안녕하세요. 첫 번째 게시글입니다.",
  //   },
  //   {
  //     id: 2,
  //     title: "두 번째 게시글",
  //     author: "홍길동",
  //     category: "자유게시판",
  //     createdAt: "2025-06-02T12:30:00Z",
  //     updatedAt: "2025-06-02T12:30:00Z",
  //     content: "자유롭게 글을 써보세요!",
  //   },

  //   {
  //     id: 3,
  //     title: "세 번째 게시글",
  //     author: "김우현",
  //     category: "자유게시판",
  //     createdAt: "2025-06-02T12:30:00Z",
  //     updatedAt: "2025-06-02T12:30:00Z",
  //     content: "안녕!",
  //   },
  // ];
};

export const createPost = async (data: CreatePostInput) => {
  try {
    const res = await axios.post(`${BASE_URL}/posts`, data);
    return res.data;
  } catch (err) {
    console.error("❌ 게시글 작성 실패:", err);
    return null;
  }
};

export const updatePost = async (id: number, data: UpdatePostInput) => {
  try {
    const res = await axios.patch(`${BASE_URL}/posts/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(`❌ 게시글 수정 실패 (id: ${id}):`, err);
    return null;
  }
};

export const deletePost = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/posts/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(`❌ 게시글 삭제 실패 (id: ${id}):`, err);
    return null;
  }
};
