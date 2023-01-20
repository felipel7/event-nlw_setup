import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.get('/', async () => {
  return await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'beb',
      },
    },
  });
});

app.listen({
  port: 3333,
});
