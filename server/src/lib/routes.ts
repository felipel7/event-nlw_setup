import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

import { prisma } from './prisma';

async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (req: FastifyRequest, res: FastifyReply) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(req.body);

    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,

        weekDays: {
          create: weekDays.map(week_day => {
            return {
              week_day,
            };
          }),
        },
      },
    });
  });
}

export { appRoutes };
