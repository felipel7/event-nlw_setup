import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-base bg-zinc-400">
      There's no habits to show!
      <Text
        className="text-base underline text-violet-400 active:text-violet-500"
        onPress={() => navigate('new-habit')}
      >
        Create a new Habit!
      </Text>
    </Text>
  );
}

export { HabitsEmpty };
