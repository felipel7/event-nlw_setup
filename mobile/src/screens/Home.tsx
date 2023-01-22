import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { api } from '../lib/axios';
import { generateDateRange } from '../utils/generateDateRange';
import dayjs from 'dayjs';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { DayHabit, SQUARE_DAY_SIZE } from '../components/DayHabit';

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

type SummaryType = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

function Home() {
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation();

  async function getData() {
    try {
      setIsLoading(true);
      const response = await api.get('summary');
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something wrong');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }

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
        {summary && (
          <View className="flex-row flex-wrap">
            {daysOfTheYear.map(day => {
              const findHabit = summary.find(d =>
                dayjs(day).isSame(d.date, 'day')
              );

              return (
                <DayHabit
                  key={`${day.toString().replace(/[^a-zA-Z0-9]/g, '')}`}
                  onPress={() => navigate('habit', { date: day.toISOString() })}
                  date={day}
                  amount={findHabit?.amount}
                  completed={findHabit?.completed}
                />
              );
            })}

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
        )}
      </ScrollView>
    </View>
  );
}

export { Home };
