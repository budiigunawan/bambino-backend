import { z } from "zod";
import { prisma } from "../libs/db";
import { UpdateCartSchema } from "../schemas/cart-schema";

export const get = async (userId: string) => {
  try {
    const existingCart = await prisma.cart.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { products: { include: { product: true } } },
    });

    return existingCart;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const create = async (userId: string) => {
  try {
    const newCart = await prisma.cart.create({
      data: { userId, subTotal: 0 },
      include: { products: { include: { product: true } } },
    });

    return newCart;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateItem = async (
  id: string,
  isItemExist: boolean,
  body: z.infer<typeof UpdateCartSchema>
) => {
  try {
    const { productId, quantity } = body;

    if (isItemExist) {
      return await prisma.cart.update({
        where: { id },
        data: {
          products: {
            updateMany: {
              where: {
                productId,
              },
              data: {
                quantity,
              },
            },
          },
        },
        include: {
          products: true,
        },
      });
    } else {
      return await prisma.cart.update({
        where: { id },
        data: {
          products: {
            create: {
              productId,
              quantity,
            },
          },
        },
        include: {
          products: true,
        },
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
