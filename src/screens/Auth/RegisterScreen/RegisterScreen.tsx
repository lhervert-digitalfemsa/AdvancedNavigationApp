import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@ui-kitten/components';

import { type AppNavigatorT } from './../../../types/AppNavigator.type';
import { type AuthNavigatorT } from './../../../types/AuthNavigator.type';

import { useForm } from './../../../hooks/useForm';
import { useSecureEntry } from './../../../hooks/useSecureEntry';

import { styles } from './RegisterScreen.styles';

type RegisterFormT = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

type ScreenParamsT = NativeStackScreenProps<AuthNavigatorT, 'Register'>;

export const RegisterScreen = ({ navigation }: ScreenParamsT) => {
  const { reset } = useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();

  const { formValues, onChangeValue, errors, setErrors, resetErrors } = useForm<RegisterFormT>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  });

  const { secureTextEntry, renderIcon } = useSecureEntry();

  const handleOnChangeName = (text: string) => onChangeValue('firstName', text);

  const handleOnChangeLastName = (text: string) => onChangeValue('lastName', text);

  const handleOnChangeEmail = (text: string) => onChangeValue('email', text);

  const handleOnChangeUser = (text: string) => onChangeValue('username', text);

  const handleOnChangePassword = (text: string) => onChangeValue('password', text);

  const handleRegister = () => {
    try {
      resetErrors();

      const { email, username, password, firstName, lastName } = formValues;

      const errors = {} as Record<keyof RegisterFormT, string>;

      if (!email.trim()) {
        errors['email'] = 'Email cannot be empty';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors['email'] = 'Email is not valid';
      }

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

      if (!firstName.trim()) {
        errors['firstName'] = 'First name cannot be empty';
      }

      if (!lastName.trim()) {
        errors['lastName'] = 'Last name cannot be empty';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      // Send data

      reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
    }
  };

  const handleGoToLogin = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={styles.safeArea} testID='Register-screen'>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Input
            label='Name'
            onChangeText={handleOnChangeName}
            status={!errors.firstName ? 'primary' : 'danger'}
            caption={errors.firstName}
            testID='firstName-input'
          />
          <Input
            label='Last name'
            onChangeText={handleOnChangeLastName}
            status={!errors.lastName ? 'primary' : 'danger'}
            caption={errors.lastName}
            testID='lastName-input'
          />
          <Input
            label='Email'
            onChangeText={handleOnChangeEmail}
            status={!errors.email ? 'primary' : 'danger'}
            caption={errors.email}
            testID='email-input'
          />
          <Input
            label='Username'
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
          <Button onPress={handleRegister} testID='register-btn' >Register</Button>
          <Button appearance='ghost' onPress={handleGoToLogin} testID='login-btn'>Do you have an account? Log In</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
