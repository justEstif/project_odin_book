"use client";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]";
import { TPostResponse } from "@/api/posts/[postId]/likes";
import { fetcher } from "@/lib-client/swr/fetcher";
import Comments from "./comments";

type Props = {
  postId: string;
};

const Post = ({ postId }: Props) => {
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<TGetResponse>(`/api/posts/${postId}`, fetcher);

  const { data: userLike, trigger } = useSWRMutation<Awaited<TPostResponse>>(
    `/api/posts/${postId}/likes`,
    updateLike
  );

  const handleLikeBtnClick = () => {
    trigger(post?.id);
  };

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof post === "undefined") {
    return <div>Page has error</div>;
  }

  return (
    <div>
      {post?.content && <div>{post.content}</div>}
      <button onClick={handleLikeBtnClick}>
        {(userLike && userLike?.likes.length && "Unlike") || "Like"}
      </button>
      <Comments postId={postId} />
    </div>
  );
};

export default Post;

const updateLike = async (url: string) => {
  const res = await fetch(url, { method: "POST" });
  if (res.ok) {
    return (await res.json()) as TPostResponse;
  }
  throw new Error("An error occured");
};
