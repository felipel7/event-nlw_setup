import clsx from 'clsx';
import dayjs from 'dayjs';
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { generateProgressPercentage } from '../lib/generate-progress-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const SQUARE_DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface DayHabits extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

function DayHabit({ amount = 0, completed = 0, date, ...rest }: DayHabits) {
  const amountPercentage =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx('m-1 border-2 rounded-lg', {
        ['bg-zinc-900 border-zinc-800']: amountPercentage === 0,
        ['bg-violet-900 border-violet-700']:
          amountPercentage > 0 && amountPercentage < 20,
        ['bg-violet-800 border-violet-600']:
          amountPercentage >= 20 && amountPercentage < 40,
        ['bg-violet-700 border-violet-500']:
          amountPercentage >= 40 && amountPercentage < 60,
        ['bg-violet-600 border-violet-500']:
          amountPercentage >= 60 && amountPercentage < 80,
        ['bg-violet-500 border-violet-400']: amountPercentage >= 80,
        ['border-white border-3']: isCurrentDay,
      })}
      style={{
        width: SQUARE_DAY_SIZE,
        height: SQUARE_DAY_SIZE,
      }}
      {...rest}
    ></TouchableOpacity>
  );
}

export { DayHabit };
