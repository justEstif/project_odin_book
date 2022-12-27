import withAuth from "@/lib-server/middleware/with-auth";
import withValidation from "@/lib-server/middleware/with-validation";
import prisma from "@/lib-server/prisma";
import type { NextApiHandler } from "next";
import { z } from "zod";
import { commentsSchema } from "@/lib-server/validations/posts";

const handler: NextApiHandler<TGetResponse | TPostResponse> = async (
  req,
  res
) => {
  const { method, query, body } = req;

  if (method === "GET") {
    const { postId } = query as z.infer<typeof commentsSchema["get"]["query"]>;
    const data = await getPostComments({ postId });
    res.status(200).json(data);
  } else if (method === "POST") {
    const { postId, currentUserId } = query as z.infer<
      typeof commentsSchema["post"]["query"]
    >;
    const postBody = body as z.infer<typeof commentsSchema["post"]["body"]>;
    const data = await createComment({ postId, currentUserId, postBody });
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withValidation(
  [
    {
      requestMethod: "GET",
      schema: commentsSchema["get"]["query"],
      validationTarget: "query",
    },
    {
      requestMethod: "POST",
      schema: commentsSchema["post"]["query"],
      validationTarget: "query",
    },
    {
      requestMethod: "POST",
      schema: commentsSchema["post"]["body"],
      validationTarget: "body",
    },
  ],
  withAuth(handler)
);

export type TGetResponse = Awaited<ReturnType<typeof getPostComments>>;
const getPostComments = async ({ postId }: { postId: string }) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      comments: {
        include: {
          parentComment: { select: { id: true } },
          childComments: { select: { id: true } },
        },
      },
    },
  });
};

export type TPostResponse = Awaited<ReturnType<typeof createComment>>;
const createComment = async ({
  postId,
  currentUserId,
  postBody,
}: {
  postId: string;
  currentUserId: string;
  postBody: z.infer<typeof commentsSchema["post"]["body"]>;
}) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      comments: {
        create: {
          content: postBody.content,
          user: { connect: { id: currentUserId } },
        },
      },
    },
  });
};
