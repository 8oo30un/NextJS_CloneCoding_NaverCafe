/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost, createPost, updatePost } from "../api/post";
import type { Post } from "../api/post";
import Modal from "../components/modal";
import { useRouter } from "next/router";
import PopularPosts from "./popularPosts";
import PostList from "./postList";

const BannerLeft = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  const [currentHourText, setCurrentHourText] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("ko-KR", {
        hour: "numeric",
        hour12: true,
      });
      const formatted = formatter.format(now);
      setCurrentHourText(`${formatted} 기준`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="flex flex-col w-[90%]  mx-auto  mt-[38px] h-[280px]  ">
      <div className="h-[30%]">
        <h2 className="mb-4 flex font-[15px] font-bold">카페 홈</h2>
        <div className="flex flex-col justify-between h-[40%] ">
          <div className="flex items-end justify-between w-full  py-1 ">
            <div className="flex items-end gap-2">
              <h2 className="font-bold text-[15px]">🔥 나의 인기글</h2>
              <span className="text-[11px] text-gray-500">
                {currentHourText}
              </span>
            </div>
            <div className="text-[12px] font-bold cursor-pointer hover:underline">
              더보기 ▶︎
            </div>
          </div>
        </div>

        <div className="h-[70%]">
          <PopularPosts posts={posts} />
        </div>
      </div>

      <div className=" flex items-center justify-between mt-[215px] w-[27%]">
        <div className="flex items-center justify-center w-[93px] h-[35px] bg-[#EBF8EC] text-[#469D51] rounded-[6px] text-[16px] font-bold">
          <span>내 게시글</span>
        </div>
        <button
          onClick={() => {
            setModalMode("create");
            setFormData({ title: "", author: "", category: "", content: "" });
            setIsModalOpen(true);
          }}
          className=" w-[93px] h-[35px] border border-[#F0F0F0] text-[#676767] rounded hover:bg-[#EBF8EC] rounded-[6px] text-[16px] font-bold"
        >
          작성하기
        </button>
      </div>

      <PostList
        posts={posts}
        onEdit={(post) => {
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
        onDelete={handleDelete}
      />

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
