import React from 'react';
import {
  Button,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import * as customDesign from '../custom-files/customDesign';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen021CreateAccount = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [phoneInput, setPhoneInput] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const validation = signupEmail => {
    const expr =
      /^([\w-\.]+)@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
    const passwordExpr =
      /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z@&_!#%$-\d]{7,}$/;
    let foundError = false;
    // if (signupName.length < 1) {
    //     setErrorMessage("Name cannot be empty")
    //     foundError = true;
    //     console.log(typeof Number(signupPassword[0]), signupPassword[0])
    //     return foundError;
    // } else {
    //     setErrorMessage("")
    // }
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
    // if (phoneInputValue.length < 1) {
    //     setErrorMessage("Phone cannot be empty")
    //     foundError = true;
    //     return foundError;
    // } else {
    //     setErrorMessage("")
    // }
    if (passwordInput != confirmPasswordInput) {
      setErrorMessage('Password doesnt Match');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }
    if (!passwordExpr.test(passwordInput)) {
      setErrorMessage('Password doesnt meet the criteria');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }
    return foundError;
  };
  const xanoSignUpPOST = XanoApi.useSignUpPOST();

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['APP MAIN'] },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
      >
        {/* Container */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* Top */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(255, 255, 255)',
                flexWrap: 'nowrap',
                height: '20%',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            {/* Logo */}
            <View
              style={StyleSheet.applyWidth({ marginTop: 40 }, dimensions.width)}
            >
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['_350x15001'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    {
                      opacity: 1,
                      overflow: 'hidden',
                      position: 'relative',
                      width: 250,
                    }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </View>
          {/* Design */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: 'rgb(255, 255, 255)', height: '20%' },
              dimensions.width
            )}
          >
            <Utils.CustomCodeErrorBoundary>
              <customDesign.DiagonalDesign />
            </Utils.CustomCodeErrorBoundary>
          </View>
          {/* bottom */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['APP MAIN'],
                flex: 1,
                justifyContent: 'space-around',
              },
              dimensions.width
            )}
          >
            {/* Sign Up Form */}
            <View
              style={StyleSheet.applyWidth(
                { gap: 10, width: '80%' },
                dimensions.width
              )}
            >
              {/* Title */}
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 10 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: 'rgb(255, 255, 255)',
                        fontFamily: 'IBMPlexSans_600SemiBold',
                        fontSize: 20,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Create Account'}
                </Text>
              </View>
              {/* Form */}
              <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
                {/* Email */}
                <View
                  style={StyleSheet.applyWidth({ gap: 4 }, dimensions.width)}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Brand.Surface,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Email'}
                  </Text>
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
                    returnKeyType={'next'}
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
                    textContentType={'emailAddress'}
                    value={emailInput}
                  />
                </View>
                {/* Password */}
                <View
                  style={StyleSheet.applyWidth({ gap: 4 }, dimensions.width)}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Brand.Surface,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'password'}
                  </Text>
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setPasswordInput(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholder={'Enter A Password here...'}
                    placeholderTextColor={palettes.Brand.Surface}
                    secureTextEntry={true}
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
                    value={passwordInput}
                  />
                </View>
                {/* Confirm password */}
                <View
                  style={StyleSheet.applyWidth({ gap: 4 }, dimensions.width)}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Brand.Surface,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Confirm password'}
                  </Text>
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setConfirmPasswordInput(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholder={'Confirm Your Password...'}
                    placeholderTextColor={palettes.Brand.Surface}
                    secureTextEntry={true}
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
                    value={confirmPasswordInput}
                  />
                </View>
                {/* CTA's */}
                <View
                  style={StyleSheet.applyWidth(
                    { gap: 12, marginTop: '10%' },
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
                  {/* Sign Up Button */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const validationResult = validation(emailInput);
                          if (validationResult) {
                            return;
                          }
                          setIsLoading(true);
                          const AuthResult = (
                            await xanoSignUpPOST.mutateAsync({
                              email: emailInput,
                              password: passwordInput,
                            })
                          )?.json;
                          setIsLoading(false);
                          console.log(AuthResult);
                          if (!AuthResult?.authToken) {
                            setErrorMessage(AuthResult?.message);
                          }
                          if (!AuthResult?.authToken) {
                            return;
                          }
                          setGlobalVariableValue({
                            key: 'AUTH_TOKEN',
                            value: 'Bearer ' + AuthResult?.authToken,
                          });
                          if (navigation.canGoBack()) {
                            navigation.popToTop();
                          }
                          navigation.replace('Screen022PersonalInformation');
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    loading={Boolean(isLoading)}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: palettes.Brand.Surface,
                          color: palettes.App['APP MAIN'],
                          fontSize: 16,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Sign up'}
                  />
                </View>
                {/* Already Registerd */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'center',
                      marginTop: 8,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        { color: palettes.Brand.Surface, textAlign: 'center' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Already Registered?'}
                  </Text>

                  <Pressable
                    onPress={() => {
                      try {
                        navigation.navigate('Screen01Login');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          { color: palettes.Brand.Surface, textAlign: 'center' }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Log in here.'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View />
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen021CreateAccount);
