import React, { useContext, useState } from 'react';
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

import { styles } from './LoginScreen.styles';
import AppContext, { AppContextType } from '../../../hooks/useContext';

type LoginFormT = {
  username: string;
  password: string;
};

type LoginResponseT = {
  token: string;
};

type ScreenParamsT = NativeStackScreenProps<AuthNavigatorT, 'Login'>;

export const LoginScreen = ({ navigation }: ScreenParamsT) => {
  const theme = useTheme();
  const { login } = useContext(AppContext) as AppContextType;
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // const {reset} =
  // useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();

  const { formValues, onChangeValue, errors, setErrors, resetErrors } =
    useForm<LoginFormT>({
      initialValues: {
        username: 'mor_2314',
        password: '83r5^_',
      },
    });

  const { secureTextEntry, renderIcon } = useSecureEntry();

  const handleOnChangeUser = (text: string) => onChangeValue('username', text);

  const handleOnChangePassword = (text: string) =>
    onChangeValue('password', text);

  const handleLogin = async () => {
    try {
      setLoading(true);

      setFormError('');
      resetErrors();

      const { username, password } = formValues;

      const formErrors = {} as Record<keyof LoginFormT, string>;

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

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      const data = await fetchData<LoginResponseT>(
        'https://fakestoreapi.com/auth/login',
        {
          username,
          password,
        },
        'POST',
      );

      if (data.token) {
        login({
          name: username,
          token: data.token,
        });
      }
    } catch (error) {
      setFormError('Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignout = () => {

    navigation.replace('Register');
  }

  return (
    <KeyboardAvoidingView
      style={styles.avoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      testID="login-screen">
      <ScrollView contentContainerStyle={styles.container}>
        <Text category="h1" style={styles.header}>
          Welcome to Fake
          <Text category="h1" style={{ color: theme['color-primary-500'] }}>
            Store
          </Text>
        </Text>
        <View style={styles.formContainer}>
          <Input
            label="Username"
            onChangeText={handleOnChangeUser}
            status={!errors?.username ? 'primary' : 'danger'}
            caption={errors?.username}
            value={formValues.username}
            testID="username-input"
          />
          <Input
            label="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={handleOnChangePassword}
            status={!errors?.password ? 'primary' : 'danger'}
            caption={errors?.password}
            value={formValues.password}
            testID="password-input"
          />
        </View>
        <View>
          <Button onPress={handleLogin} disabled={loading} testID="login-btn">
            Log In
          </Button>
          <Button
            appearance="ghost"
            onPress={handleGoToSignout}
            disabled={loading}
            testID="signout-btn">
            Sign Out
          </Button>
        </View>
      </ScrollView>
      {!!formError && <Alert text={formError} />}
    </KeyboardAvoidingView>
  );
};
