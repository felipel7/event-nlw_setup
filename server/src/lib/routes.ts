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

    const completedHabits = day?.dayHabits.map(dh => dh.habit_id) ?? [];

    return { dayHabits, completedHabits };
  });

  app.patch(
    '/habits/:id/toggle',
    async (req: FastifyRequest, res: FastifyReply) => {
      const toggleHabit = z.object({
        id: z.string().uuid(),
      });

      const { id } = toggleHabit.parse(req.params);

      // startOf remove minutes and hours of the date
      const today = dayjs().startOf('day').toDate();

      let day = await prisma.day.findUnique({
        where: {
          date: today,
        },
      });

      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      });

      if (dayHabit) {
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });
      } else {
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        });
      }
    }
  );

  app.get('/summary', async (req: FastifyRequest, res: FastifyReply) => {
    const summary = await prisma.$queryRaw`
      SELECT D.id, D.date, 
      (
        SELECT cast(count(*) as float) FROM day_habits DH
        WHERE DH.day_id = D.id
      ) as completed,
      (
        SELECT cast(count(*) as float) FROM habit_week_days HWD
        JOIN habits H ON H.id = HWD.habit_id
        WHERE HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
        AND H.created_at <= D.date
      ) as amount
      FROM days D
      `;

    return summary;
  });
}

export { appRoutes };
