import { prisma } from "../lib/db";

export const getAll = async (
  page: string = "1",
  limit: string = "10",
  q?: string
) => {
  try {
    const skip = Number(limit) * (Number(page) - 1);
    const take = Number(limit);

    const [counter, products] = await prisma.$transaction([
      prisma.product.count({
        where: {
          name: {
            mode: "insensitive",
            contains: q,
          },
        },
      }),
      prisma.product.findMany({
        skip,
        take,
        where: {
          name: {
            mode: "insensitive",
            contains: q,
          },
        },
      }),
    ]);

    return {
      totalData: counter,
      totalPage: Math.ceil(counter / take),
      products,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
