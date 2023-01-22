import { View, Text, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { DayHabit, SQUARE_DAY_SIZE } from '../components/DayHabit';
import { generateDateRange } from '../utils/generateDateRange';

export const weekDays = [
  { id: 0, label: 'S', name: 'Sunday' },
  { id: 1, label: 'M', name: 'Monday' },
  { id: 2, label: 'T', name: 'Tuesday' },
  { id: 3, label: 'W', name: 'Wednesday' },
  { id: 4, label: 'T', name: 'Thursday' },
  { id: 5, label: 'F', name: 'Friday' },
  { id: 6, label: 'S', name: 'Saturday' },
];

const minimumSummaryDatesSizes = 18 * 5;
const amountDaysToFill = minimumSummaryDatesSizes - generateDateRange.length;
const daysOfTheYear = generateDateRange();

function Home() {
  return (
    <View className="flex-1 px-8 pt-16 bg-background ">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map(day => (
          <Text
            key={day.id}
            className="mx-1 text-xl font-bold text-center text-zinc-400"
            style={{
              width: SQUARE_DAY_SIZE,
            }}
          >
            {day.label}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {daysOfTheYear.map(day => (
            <DayHabit key={`${day.toString().replace(/[^a-zA-Z0-9]/g, '')}`} />
          ))}

          {amountDaysToFill > 0 &&
            Array.from({ length: amountDaysToFill }).map((_, i) => (
              <View
                key={i}
                className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40"
                style={{
                  width: SQUARE_DAY_SIZE,
                  height: SQUARE_DAY_SIZE,
                }}
              ></View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

export { Home };
