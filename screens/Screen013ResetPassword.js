import React from 'react';
import {
  Button,
  IconButton,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen013ResetPassword = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const passwordValidation = (signupPassword, confirmPassword) => {
    // const expr = /^([\w-\.]+)@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
    const passwordExpr =
      /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z@&_!#%$-\d]{7,}$/;
    let foundError = false;

    // if (signupEmail.length < 1) {
    //     setErrorMessage("Email cannot be empty")
    //     foundError = true;
    //     return foundError;
    // } else {
    //     setErrorMessage("")
    // }
    // if (!expr.test(signupEmail)) {
    //     setErrorMessage("Please enter a valid email")
    //     foundError = true
    //     return foundError;
    // } else {
    //     setErrorMessage("")
    // }
    // if (phoneInputValue.length < 1) {
    //     setErrorMessage("Phone cannot be empty")
    //     foundError = true;
    //     return foundError;
    // } else {
    //     setErrorMessage("")
    // }

    if (signupPassword != confirmPassword) {
      setErrorMessage("Password Dosen't Match.");
      return true;
    } else {
      setErrorMessage('');
    }

    if (!passwordExpr.test(signupPassword)) {
      setErrorMessage('Password doesnt meet the criteria');
      setShowInstructions(true);
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    if (!passwordExpr.test(confirmPassword)) {
      setErrorMessage('Password doesnt meet the criteria');
      setShowInstructions(true);
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    return foundError;
  };
  const xanoSetNewPasswordPOST = XanoApi.useSetNewPasswordPOST();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['APP MAIN'] },
        dimensions.width
      )}
    >
      {/* Container */}
      <View>
        {/* Title Section */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            },
            dimensions.width
          )}
        >
          {/* Back Button */}
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.foreground.brand}
            icon={'AntDesign/left'}
          />
        </View>
        {/* Main */}
        <View
          style={StyleSheet.applyWidth(
            {
              justifyContent: 'space-evenly',
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 20,
            },
            dimensions.width
          )}
        >
          {/* Heading */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.Surface,
                fontFamily: 'Poppins_700Bold',
                fontSize: 35,
                marginBottom: 10,
              },
              dimensions.width
            )}
          >
            {'Reset your\nPassword'}
          </Text>
          {/* sub heading */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.Surface,
                fontFamily: 'Poppins_400Regular',
                fontSize: 15,
                opacity: 0.7,
                paddingBottom: 10,
                textAlign: 'left',
              },
              dimensions.width
            )}
          >
            {'Please enter your new password'}
          </Text>
          {/* Password */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newPasswordValue => {
              try {
                setNewPassword(newPasswordValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            editable={true}
            placeholder={'Password'}
            placeholderTextColor={theme.colors.text.light}
            secureTextEntry={true}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.border.brand,
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                color: palettes.Brand.Surface,
                fontFamily: 'Poppins_400Regular',
                fontSize: 15,
                height: 48,
                marginTop: 20,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 8,
              },
              dimensions.width
            )}
            value={newPassword}
          />
          {/* Confirm Password */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newConfirmPasswordValue => {
              try {
                setConfirmPassword(newConfirmPasswordValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            editable={true}
            placeholder={'Confirm Password'}
            placeholderTextColor={theme.colors.text.light}
            secureTextEntry={true}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.border.brand,
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                color: palettes.Brand.Surface,
                fontFamily: 'Poppins_400Regular',
                fontSize: 15,
                height: 48,
                marginTop: 24,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 8,
              },
              dimensions.width
            )}
            value={confirmPassword}
          />
          {/* Error Message */}
          <>
            {!errorMessage ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'center',
                    backgroundColor: palettes.App['APP SECONDARY BG FOR LIGHT'],
                    borderRadius: 8,
                    height: 32,
                    justifyContent: 'center',
                    marginTop: 24,
                    width: '90%',
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text 4'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text 4'].style,
                      {
                        color: theme.colors.background.danger,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
              </View>
            )}
          </>
          {/* Reset Password */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  const validationResult = passwordValidation(
                    newPassword,
                    confirmPassword
                  );
                  if (validationResult) {
                    return;
                  }
                  setIsLoading(true);
                  const resResult = (
                    await xanoSetNewPasswordPOST.mutateAsync({
                      confirm_password: confirmPassword,
                      password: newPassword,
                    })
                  )?.json;
                  setIsLoading(false);
                  setErrorMessage(resResult?.message);
                  if (!resResult?.authToken) {
                    return;
                  }
                  setGlobalVariableValue({
                    key: 'TEMP_AUTH_TOKEN',
                    value: resResult?.authToken,
                  });
                  navigation.navigate('Screen01Login');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Surface,
                borderRadius: 16,
                color: theme.colors.text.strong,
                fontFamily: 'Poppins_500Medium',
                fontSize: 16,
                height: 46,
                marginTop: 40,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Reset Password'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen013ResetPassword);
