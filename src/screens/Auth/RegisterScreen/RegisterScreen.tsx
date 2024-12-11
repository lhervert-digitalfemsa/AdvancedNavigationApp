import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import type {
  NativeStackScreenProps,
  // NativeStackNavigationProp,
} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
import { Button, Input, Text, useTheme } from '@ui-kitten/components';

// import {type AppNavigatorT} from './../../../types/AppNavigator.type';
import { type AuthNavigatorT } from './../../../types/AuthNavigator.type';

import { Alert } from '../../../components/atoms/Alert';

import { useForm } from './../../../hooks/useForm';
import { useSecureEntry } from './../../../hooks/useSecureEntry';

import { fetchData } from '../../../services/ApiService';

import { styles } from './RegisterScreen.styles';

type RegisterFormT = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

type RegisterResponseT = {
  id: number;
};

type ScreenParamsT = NativeStackScreenProps<AuthNavigatorT, 'Register'>;

export const RegisterScreen = ({ navigation }: ScreenParamsT) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // const {reset} =
  //   useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();

  const { formValues, onChangeValue, errors, setErrors, resetErrors } =
    useForm<RegisterFormT>({
      initialValues: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
      },
    });

  const { secureTextEntry, renderIcon } = useSecureEntry();

  const handleOnChangeName = (text: string) => onChangeValue('firstName', text);

  const handleOnChangeLastName = (text: string) =>
    onChangeValue('lastName', text);

  const handleOnChangeEmail = (text: string) => onChangeValue('email', text);

  const handleOnChangeUser = (text: string) => onChangeValue('username', text);

  const handleOnChangePassword = (text: string) =>
    onChangeValue('password', text);

  const handleRegister = async () => {
    try {
      setLoading(true);

      setFormError('');
      resetErrors();

      const { email, username, password, firstName, lastName } = formValues;
      console.log('formValues:', formValues);

      const formErrors = {} as Record<keyof RegisterFormT, string>;

      if (!email.trim()) {
        formErrors.email = 'Email cannot be empty';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formErrors.email = 'Email is not valid';
      }

      if (!username.trim()) {
        formErrors.username = 'Username cannot be empty';
      } else if (username.trim().length < 4) {
        formErrors.username = 'Username must have at least 4 characters';
      }

      if (!password.trim()) {
        formErrors.password = 'Password cannot be empty';
      } else if (password.trim().length < 6) {
        formErrors.password = 'Password must have at least 6 characters';
      }

      if (!firstName.trim()) {
        formErrors.firstName = 'First name cannot be empty';
      }

      if (!lastName.trim()) {
        formErrors.lastName = 'Last name cannot be empty';
      }

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      // The endpoint only returns the id of the new user.
      const data = await fetchData<RegisterResponseT>(
        'https://fakestoreapi.com/users',
        {
          username,
          password,
          email,
          firstName,
          lastName,
        },
        'POST',
      );

      if (data.id) {
        handleGoToLogin();

        return;
      }
    } catch (error) {
      setFormError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => navigation.replace('Login');

  return (
    <KeyboardAvoidingView
      style={styles.avoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      testID="register-screen">
      <ScrollView contentContainerStyle={styles.container}>
        <Text category="h1" style={styles.header}>
          Find anything you want
          <Text category="h1" style={{ color: theme['color-primary-500'] }}>
            {' '}
            with us
          </Text>
        </Text>
        <View style={styles.formContainer}>
          <Input
            label="Name"
            onChangeText={handleOnChangeName}
            status={!errors?.firstName ? 'primary' : 'danger'}
            caption={errors?.firstName}
            testID="firstName-input"
          />
          <Input
            label="Last name"
            onChangeText={handleOnChangeLastName}
            status={!errors?.lastName ? 'primary' : 'danger'}
            caption={errors?.lastName}
            testID="lastName-input"
          />
          <Input
            label="Email"
            onChangeText={handleOnChangeEmail}
            status={!errors?.email ? 'primary' : 'danger'}
            caption={errors?.email}
            autoCapitalize="none"
            testID="email-input"
          />
          <Input
            label="Username"
            onChangeText={handleOnChangeUser}
            status={!errors?.username ? 'primary' : 'danger'}
            caption={errors?.username}
            testID="username-input"
          />
          <Input
            label="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={handleOnChangePassword}
            status={!errors?.password ? 'primary' : 'danger'}
            caption={errors?.password}
            testID="password-input"
          />
          <Button
            onPress={handleRegister}
            style={styles.registerBtn}
            disabled={loading}
            testID="register-btn">
            Register
          </Button>
        </View>
        <View>
          <Button
            appearance="ghost"
            onPress={handleGoToLogin}
            disabled={loading}
            testID="login-btn">
            Do you have an account? Log In
          </Button>
        </View>
      </ScrollView>
      {!!formError && <Alert text={formError} />}
    </KeyboardAvoidingView>
  );
};
