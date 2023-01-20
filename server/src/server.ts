import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
app.register(cors);

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
