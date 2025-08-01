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

const Screen011ForgotPassword = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [emailInput, setEmailInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const validateEmail = signupEmail => {
    const expr =
      /^([\w-\.]+)@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
    let foundError = false;

    if (signupEmail.length < 1) {
      setErrorMessage('Email cannot be empty');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }
    if (!expr.test(signupEmail)) {
      setErrorMessage('Please enter a valid email');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }
    return foundError;
  };

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
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
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
            size={32}
            color={theme.colors.foreground.brand}
            icon={'AntDesign/left'}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'space-evenly', padding: 10, paddingLeft: 30 },
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
                fontFamily: 'IBMPlexSans_700Bold',
                fontSize: 35,
                marginBottom: 10,
              },
              dimensions.width
            )}
          >
            {'Forgot\nPassword?'}
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
            {
              'Please enter your email address and we will send your password by email.'
            }
          </Text>
          {/* Email 2 */}
          <View
            style={StyleSheet.applyWidth(
              { gap: 4, marginTop: 40, width: '90%' },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setEmailInput(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
              keyboardType={'email-address'}
              placeholder={'Enter your Email here...'}
              placeholderTextColor={palettes.Brand.Surface}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                  {
                    backgroundColor: palettes.App['APP SECONDARY BG'],
                    borderBottomWidth: null,
                    borderLeftWidth: null,
                    borderRadius: 16,
                    borderRightWidth: null,
                    borderTopWidth: null,
                    color: palettes.Brand.Surface,
                    fontFamily: 'IBMPlexSans_300Light',
                    paddingBottom: 16,
                    paddingLeft: 20,
                    paddingTop: 16,
                  }
                ),
                dimensions.width
              )}
              value={emailInput}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              { gap: 12, marginTop: 24 },
              dimensions.width
            )}
          >
            {/* Error Message */}
            <>
              {!errorMessage ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes.App['APP SECONDARY BG FOR LIGHT'],
                      borderRadius: 8,
                      height: 32,
                      justifyContent: 'center',
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
            {/* Save info */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    const validationResult = validateEmail(emailInput);
                    if (validationResult) {
                      return;
                    }
                    setIsLoading(true);
                    const resResult = (
                      await XanoApi.setOtpGET(Constants, { email: emailInput })
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
                    navigation.navigate('Screen012ConfirmOTP');
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: palettes.Brand.Surface,
                    borderRadius: 12,
                    color: palettes.App['APP MAIN'],
                    fontSize: 16,
                    paddingBottom: 16,
                    paddingTop: 16,
                    textTransform: 'capitalize',
                    width: '90%',
                  }
                ),
                dimensions.width
              )}
              title={'Send OTP'}
            />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen011ForgotPassword);
