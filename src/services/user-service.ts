import { prisma } from "../libs/db";

export const getAll = async (
  page: string = "1",
  limit: string = "10",
  q?: string
) => {
  try {
    const skip = Number(limit) * (Number(page) - 1);
    const take = Number(limit);

    const [counter, users] = await prisma.$transaction([
      prisma.user.count({
        where: {
          fullName: {
            mode: "insensitive",
            contains: q,
          },
        },
      }),
      prisma.user.findMany({
        skip,
        take,
        where: {
          fullName: {
            mode: "insensitive",
            contains: q,
          },
        },
      }),
    ]);

    return {
      totalData: counter,
      totalPage: Math.ceil(counter / take),
      users,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
