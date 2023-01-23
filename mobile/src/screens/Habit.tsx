import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { api } from '../lib/axios';
import { generateProgressPercentage } from '../lib/generate-progress-percentage';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { Loading } from '../components/Loading';
import { ProgressBar } from '../components/ProgressBar';

interface HabitProps {
  date: string;
}

type DayInfoType = {
  completedHabits: string[];
  dayHabits: {
    id: string;
    title: string;
  }[];
};

function Habit() {
  const [isLoading, setIsLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoType | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);
  const isDateInThePast = parsedDate.endOf('day').isBefore(new Date());
  const day = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const dayHabitsProgress = dayInfo?.dayHabits.length
    ? generateProgressPercentage(
        dayInfo.dayHabits.length,
        completedHabits.length
      )
    : 0;

  async function getHabits() {
    try {
      setIsLoading(true);

      const response = await api.get('day', {
        params: {
          date,
        },
      });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleHabit(id: string) {
    try {
      if (completedHabits.includes(id)) {
        setCompletedHabits(prev => prev.filter(h => h !== id));
      } else {
        setCompletedHabits(prev => [...prev, id]);
      }

      await api.patch(`habits/${id}/toggle`);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong...');
    }
  }

  useEffect(() => {
    getHabits();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-base font-semibold text-zinc-400">
          {day}
        </Text>
        <Text className="text-3xl font-extrabold text-white">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={dayHabitsProgress} />
        <View
          className={clsx('mt-6', {
            ['opacity-50']: isDateInThePast,
          })}
        >
          {dayInfo?.dayHabits ? (
            dayInfo.dayHabits.map(habit => (
              <Checkbox
                key={habit.id}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInThePast}
                title={habit.title}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
        {isDateInThePast && (
          <Text className="mt-10 text-center text-white">
            You can't change habits from the past.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export { Habit };
