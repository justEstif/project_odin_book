import type { NextApiHandler } from "next";
import withAuth from "@/lib-server/middleware/with-auth";
import prisma from "@/lib-server/prisma";

const handler: NextApiHandler<TGetResponse> = async (req, res) => {
  const {
    method,
    query: { userId, currentUserId },
  } = req;

  switch (method) {
    /**
     * @description get received requests of current user
     * @access only if current user matches request id
     */
    case "GET":
      if (
        typeof userId === "string" &&
        typeof currentUserId === "string" &&
        userId === currentUserId
      ) {
        const data = await getReceivedRequests({ currentUserId });
        res.status(200).json(data);
      }
      res.status(403).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withAuth(handler);

export type TGetResponse = Awaited<ReturnType<typeof getReceivedRequests>>;
const getReceivedRequests = async ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  return await prisma.user.findUnique({
    where: { id: currentUserId },
    select: {
      receivedRequests: {
        select: {
          id: true,
          profile: { select: { name: true, image: true } },
        },
      },
    },
  });
};
