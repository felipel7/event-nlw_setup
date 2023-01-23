import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { api } from '../lib/axios';
import colors from 'tailwindcss/colors';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { weekDays } from './Home';

function NewHabit() {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [title, setTitle] = useState('');

  function handleToggleSelectedDay(day_id: number) {
    if (selectedDays.includes(day_id)) {
      setSelectedDays(prev => prev.filter(id => id !== day_id));
    } else {
      setSelectedDays(prev => [...prev, day_id]);
    }
  }

  async function handleNewHabitCreation() {
    try {
      if (!title.trim() || selectedDays.length === 0) {
        return Alert.alert(
          'You must choose',
          'the days frequency and the title before you can establish a new habit.'
        );
      }

      await api.post('/habits', {
        title,
        weekDays: selectedDays,
      });

      setTitle('');
      setSelectedDays([]);

      Alert.alert('Success!', 'Your new habit has been created.');
    } catch (error) {
      console.log(error);
      Alert.alert('Sorry', 'Something went wrong...');
    }
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-3xl font-extrabold text-white">
          Create a new Habit
        </Text>

        <Text className="mt-6 text-base font-semibold text-white">
          Start developing a new habit
        </Text>

        <TextInput
          className="h-12 pl-4 mt-3 text-white border-2 rounded-lg bg-zinc-900 focus:border-2 focus:border-green-600 border-zinc-800"
          placeholder="Type your new habit here..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mt-4 mb-3 text-base font-semibold text-white">
          What's the frequency?
        </Text>
        {weekDays.map(day => (
          <Checkbox
            key={day.id}
            title={day.name}
            checked={selectedDays.includes(day.id)}
            onPress={() => handleToggleSelectedDay(day.id)}
          />
        ))}

        <TouchableOpacity
          onPress={handleNewHabitCreation}
          className="flex-row items-center justify-center w-full mt-6 bg-green-600 rounded-md h-14"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="ml-2 text-base font-semibold text-white">Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export { NewHabit };
