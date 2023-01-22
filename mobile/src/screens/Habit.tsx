import { useRoute } from '@react-navigation/native';
import { ScrollView, View, Text } from 'react-native';
import dayjs from 'dayjs';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { ProgressBar } from '../components/ProgressBar';

interface HabitProps {
  date: string;
}

function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);
  const day = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="text-base font-semibold text-zinc-400">{day}</Text>
        <Text className="text-3xl font-extrabold text-white">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />
        <View className="mt-6 ">
          <Checkbox title="Drink 2L of water" checked={false} />
          <Checkbox title="Walk" checked={true} />
          <Checkbox title="Sleep" checked={false} />
        </View>
      </ScrollView>
    </View>
  );
}

export { Habit };
