import { PrismaService } from './../src/prisma/prisma.service';
import products from './products';

const prisma = new PrismaService();

(function seed() {
  products.forEach(async (product) => {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        brand: product.brand,
      },
    });
  });
})();
