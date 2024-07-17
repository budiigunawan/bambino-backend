import { z } from "zod";
import { prisma } from "../lib/db";
import {
  CreateProductSchema,
  UpdateProductSchema,
} from "../schemas/product-schema";
import { slugify } from "../lib/helpers";

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

export const getById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    return product;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const create = async (body: z.infer<typeof CreateProductSchema>) => {
  try {
    const { name, price, stock, imageUrl } = body;

    const slug = slugify(name);

    return await prisma.product.create({
      data: {
        name,
        slug,
        price,
        stock,
        imageUrl,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const update = async (
  id: string,
  body: z.infer<typeof UpdateProductSchema>
) => {
  try {
    const { name, price, stock, imageUrl, overview, materials } = body;

    const slug = slugify(name);

    return await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        slug,
        imageUrl,
        overview,
        materials,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteById = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};
