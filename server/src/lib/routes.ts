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

  app.get('/day', async (req: FastifyRequest, res: FastifyReply) => {
    const getDay = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDay.parse(req.query);

    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    const dayHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },

      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map(dh => dh.habit_id);

    return { dayHabits, completedHabits };
  });
}

export { appRoutes };
