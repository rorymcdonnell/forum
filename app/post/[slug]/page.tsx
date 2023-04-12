"use client";

import Image from "next/image";
import Post from "@/app/components/Post";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddComment from "@/app/components/AddComment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  console.log("data details: ", data);

  if (isLoading || data === undefined) {
    return "Loading...";
  } else {
    return (
      <div>
        <Post
          id={data?.id}
          name={data?.user.name}
          avatar={data?.user.image}
          postTitle={data?.title}
          comments={data?.comments}
        />
        <AddComment id={data?.id} />
        {data?.comments?.map((comment) => (
          <div className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src={comment.user?.image}
                alt="avatar"
              />
              <h3 className="font-bold">{comment?.user?.name}</h3>
              <h2 className="text-sm">{comment.createdAt}</h2>
            </div>
            <div className="py-4">{comment.message}</div>
          </div>
        ))}
      </div>
    );
  }
}
