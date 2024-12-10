import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@ui-kitten/components';

import { type AppNavigatorT } from './../../../types/AppNavigator.type';
import { type AuthNavigatorT } from './../../../types/AuthNavigator.type';

import { useForm } from './../../../hooks/useForm';
import { useSecureEntry } from './../../../hooks/useSecureEntry';

import { fetchData } from '../../../services/ApiService';

import { styles } from './LoginScreen.styles';

type LoginFormT = {
  username: string;
  password: string;
}

type ScreenParamsT = NativeStackScreenProps<AuthNavigatorT, 'Login'>;

export const LoginScreen = ({ navigation }: ScreenParamsT) => {
  const { reset } = useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();

  const { formValues, onChangeValue, errors, setErrors, resetErrors } = useForm<LoginFormT>({
    initialValues: {
      username: '',
      password: ''
    }
  });

  const { secureTextEntry, renderIcon } = useSecureEntry();

  const handleOnChangeUser = (text: string) => onChangeValue('username', text);

  const handleOnChangePassword = (text: string) => onChangeValue('password', text);

  const handleLogin = async () => {
    try {
      resetErrors();

      const { username, password } = formValues;

      const errors = {} as Record<keyof LoginFormT, string>;

      if (!username.trim()) {
        errors['username'] = 'Username cannot be empty';
      } else if (username.trim().length < 4) {
        errors['username'] = 'Username must have at least 4 characters';
      }

      if (!password.trim()) {
        errors['password'] = 'Password cannot be empty';
      } else if (password.trim().length < 6) {
        errors['password'] = 'Password must have at least 6 characters';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const data = await fetchData('https://fakestoreapi.com/auth/login', 'POST');

      reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
    }
  };

  const handleGoToSignout = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={styles.safeArea} testID='login-screen'>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Input label='Username'
            onChangeText={handleOnChangeUser}
            status={!errors.username ? 'primary' : 'danger'}
            caption={errors.username}
            testID='username-input'
          />
          <Input
            label='Password'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={handleOnChangePassword}
            status={!errors.password ? 'primary' : 'danger'}
            caption={errors.password}
            testID='password-input'
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={handleLogin} style={styles.button} testID='login-btn'>Log In</Button>
          <Button appearance='ghost' onPress={handleGoToSignout} style={styles.button} testID='signout-btn'>Sign Out</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
