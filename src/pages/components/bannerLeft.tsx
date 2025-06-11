/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost, createPost, updatePost } from "../api/post";
import type { Post } from "../api/post";
import Modal from "../components/modal";
import { useRouter } from "next/router";
import PopularPosts from "./popularPosts";

const BannerLeft = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  //modal function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  //form function
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });

  const fetchPosts = async () => {
    const result = await getPosts();
    console.log("📦 getPosts 응답:", result); // 여기서 id 있는지 확인

    if (result === null) {
      setFetchFailed(true);
    } else {
      setPosts(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (modalMode === "create") {
      const result = await createPost(formData);
      if (result) {
        alert("게시글이 성공적으로 추가되었습니다.");
        await fetchPosts(); // ✅ 추가 후 전체 리스트 다시 불러오기

        setPosts((prev) => [...prev, result]);
      } else {
        alert("게시글 추가 실패");
      }
    } else if (modalMode === "edit" && selectedPost) {
      const result = await updatePost(selectedPost.id, formData);
      if (result) {
        alert("게시글이 성공적으로 수정되었습니다.");
        setPosts((prev) =>
          prev.map((post) =>
            post.id === selectedPost.id ? { ...post, ...formData } : post
          )
        );
      } else {
        alert("게시글 수정 실패");
      }
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    console.log("id:", id);
    const result = await deletePost(id);
    console.log("result:", result);
    if (result) {
      alert("🗑️ 삭제되었습니다.");
      setPosts(posts.filter((p) => p.id !== id));
    } else {
      alert("❌ 삭제 실패");
    }
  };

  const router = useRouter();

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-items-center bg-gray-50"></div>
    );
  return (
    <div className="flex flex-col w-[90%]  mx-auto  mt-[38px] border h-screen ">
      <h2 className="mb-4 flex font-[15px] font-bold">카페 홈</h2>

      <div>
        <button
          onClick={() => {
            setModalMode("create");
            setFormData({ title: "", author: "", category: "", content: "" });
            setIsModalOpen(true);
          }}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          추가하기
        </button>
      </div>

      <div className="flex flex-col  justify-between h-[30%] border border-amber-400">
        <h2 className="h-[10%] font-bold font-[12px] ">🔥 나의 인기글</h2>
        <PopularPosts posts={posts} />
      </div>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span
              onClick={() => router.push(`/posts/${post.id}`)}
              className="cursor-pointer hover:underline"
            >
              {post.title} - {post.author}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setModalMode("edit");
                  setSelectedPost(post);
                  setFormData({
                    title: post.title,
                    author: post.author,
                    category: post.category,
                    content: post.content || "",
                  });
                  setIsModalOpen(true);
                }}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal visible={isModalOpen} onClose={closeModal}>
        <h3 className="text-lg font-bold mb-4">
          {modalMode === "create" ? "게시글 추가" : "게시글 수정"}
        </h3>
        <div className="flex flex-col space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목"
            className="border rounded px-3 py-2"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="작성자"
            className="border rounded px-3 py-2"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="카테고리"
            className="border rounded px-3 py-2"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="내용"
            rows={4}
            className="border rounded px-3 py-2 resize-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white rounded py-2 hover:bg-green-600"
          >
            {modalMode === "create" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BannerLeft;
