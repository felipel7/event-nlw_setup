import { TouchableOpacity, Dimensions } from 'react-native';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const SQUARE_DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

function DayHabit() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{
        width: SQUARE_DAY_SIZE,
        height: SQUARE_DAY_SIZE,
      }}
    ></TouchableOpacity>
  );
}

export { DayHabit };
