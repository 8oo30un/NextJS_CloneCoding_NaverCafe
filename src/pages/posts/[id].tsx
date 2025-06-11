import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerRight from "../components/bannerRight";
import { Post } from "../api/post";
const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.error("❌ 게시글 불러오기 실패", err));
    }
  }, [id]);

  if (!post)
    return (
      <div className="w-full h-screen flex items-center justify-items-center bg-gray-50"></div>
    );
  return (
    <div className="pt-[77px] ml-[313px] min-h-screen ">
      <div className="flex w-full ">
        <div className="w-[70%]  h-screen">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600">by {post.author}</p>
          <p className="mt-4">{post.category}</p>
          <p className="mt-4">{post.content}</p>
        </div>
        <div className="w-[30%] border-l border-l-[#d7d8d9] h-screen">
          <BannerRight />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
