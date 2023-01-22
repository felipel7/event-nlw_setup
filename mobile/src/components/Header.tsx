import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import Logo from '../assets/logo.svg';

function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-row items-center justify-between w-full">
      <Logo />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center px-4 border rounded-lg h-11 border-violet-500"
        onPress={() => navigate('new-habit')}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />

        <Text className="ml-3 text-base font-semibold text-white">New</Text>
      </TouchableOpacity>
    </View>
  );
}

export { Header };
