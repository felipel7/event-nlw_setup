import { View, Text, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { DayHabit, SQUARE_DAY_SIZE } from '../components/DayHabit';
import { generateDateRange } from '../utils/generateDateRange';

const weekDays = [
  { id: 0, label: 'S' },
  { id: 1, label: 'M' },
  { id: 2, label: 'T' },
  { id: 3, label: 'W' },
  { id: 4, label: 'T' },
  { id: 5, label: 'F' },
  { id: 6, label: 'S' },
];

const minimumSummaryDatesSizes = 18 * 5;
const amountDaysToFill = minimumSummaryDatesSizes - generateDateRange.length;
const daysOfTheYear = generateDateRange();

function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16 ">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map(day => (
          <Text
            key={day.id}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
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
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
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
