import { FastifyInstance } from 'fastify';
import { prisma } from './prisma';

async function appRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return await prisma.habit.findMany({
      where: {
        title: {
          startsWith: 'beb',
        },
      },
    });
  });
}

export { appRoutes };
