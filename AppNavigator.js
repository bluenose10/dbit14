import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import * as GlobalVariables from './config/GlobalVariableContext';
import HomeScreen from './screens/HomeScreen';
import Screen011ForgotPassword from './screens/Screen011ForgotPassword';
import Screen012ConfirmOTP from './screens/Screen012ConfirmOTP';
import Screen013ResetPassword from './screens/Screen013ResetPassword';
import Screen01Login from './screens/Screen01Login';
import Screen021CreateAccount from './screens/Screen021CreateAccount';
import Screen022PersonalInformation from './screens/Screen022PersonalInformation';
import Screen023TakePhoto from './screens/Screen023TakePhoto';
import Screen024CaptureDocumentFront from './screens/Screen024CaptureDocumentFront';
import Screen025CaptureDocumentBack from './screens/Screen025CaptureDocumentBack';
import Screen026ApplicationSent from './screens/Screen026ApplicationSent';
import Screen0AskAboutDocumentations from './screens/Screen0AskAboutDocumentations';
import Screen0Welcome from './screens/Screen0Welcome';
import WebSessionScreen from './screens/WebSessionScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useNavigation from './utils/useNavigation';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor }) {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.base,
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="Screen0Welcome"
        screenOptions={{
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Screen011ForgotPassword"
          component={Screen011ForgotPassword}
          options={{
            title: '0:1:1 Forgot Password',
          }}
        />
        <Stack.Screen
          name="Screen012ConfirmOTP"
          component={Screen012ConfirmOTP}
          options={{
            title: '0:1:2 Confirm OTP',
          }}
        />
        <Stack.Screen
          name="Screen013ResetPassword"
          component={Screen013ResetPassword}
          options={{
            title: '0:1:3 Reset Password',
          }}
        />
        <Stack.Screen
          name="Screen01Login"
          component={Screen01Login}
          options={{
            title: '0:1 -Login',
          }}
        />
        <Stack.Screen
          name="Screen021CreateAccount"
          component={Screen021CreateAccount}
          options={{
            title: '0:2:1 Create Account',
          }}
        />
        <Stack.Screen
          name="Screen022PersonalInformation"
          component={Screen022PersonalInformation}
          options={{
            title: '0:2:2 Personal Information',
          }}
        />
        <Stack.Screen
          name="Screen023TakePhoto"
          component={Screen023TakePhoto}
          options={{
            title: '0:2:3 Take Photo',
          }}
        />
        <Stack.Screen
          name="Screen024CaptureDocumentFront"
          component={Screen024CaptureDocumentFront}
          options={{
            title: '0:2:4 Capture Document Front',
          }}
        />
        <Stack.Screen
          name="Screen025CaptureDocumentBack"
          component={Screen025CaptureDocumentBack}
          options={{
            title: '0:2:5 Capture Document Back',
          }}
        />
        <Stack.Screen
          name="Screen026ApplicationSent"
          component={Screen026ApplicationSent}
          options={{
            title: '0:2:6 Application Sent',
          }}
        />
        <Stack.Screen
          name="Screen0AskAboutDocumentations"
          component={Screen0AskAboutDocumentations}
          options={{
            title: '0 - Ask About Documentations',
          }}
        />
        <Stack.Screen
          name="Screen0Welcome"
          component={Screen0Welcome}
          options={{
            title: '0 - Welcome',
          }}
        />
        <Stack.Screen
          name="WebSessionScreen"
          component={WebSessionScreen}
          options={{
            title: 'WebSession',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
