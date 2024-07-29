import { z } from "zod";
import { prisma } from "../libs/db";
import { CreateOrderSchema } from "../schemas/order-schema";

type Product = {
  id: string;
  price: number;
};

type CartItem = {
  quantity: number;
  cartId: string;
  productId: string;
  product: Product;
};

export const create = async (
  userId: string,
  cartId: string,
  cartItems: CartItem[],
  body: z.infer<typeof CreateOrderSchema>
) => {
  try {
    const { address, paymentMethod } = body;
    const totalPrice = cartItems?.reduce((sum, item) => {
      return sum + item.quantity * +item.product.price;
    }, 0);

    const order = await prisma.order.create({
      data: {
        address,
        paymentMethod,
        orderTotal: totalPrice,
        orderStatus: "pending",
        userId,
        orderItems: {
          create: cartItems.map((item) => {
            return {
              quantity: item.quantity,
              productId: item.product.id,
            };
          }),
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    // remove cart items
    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        products: {
          deleteMany: {},
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
