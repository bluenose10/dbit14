import React from 'react';
import {
  Button,
  IconButton,
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
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen01Login = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [emailInput, setEmailInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowingPassword, setIsShowingPassword] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const validateEmailAndPassword = (signupEmail, pass) => {
    const expr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    if (pass.length < 1) {
      setErrorMessage('Password cannot be empty');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }
    // if (!passwordExpr.test(pass)) {
    //     setErrorMessage("Password doesnt meet the criteria")
    //     setShowInstructions(true)
    //     foundError = true
    //     return foundError;
    // }
    // else {
    //     setErrorMessage("")
    // }
    return foundError;
  };
  const xanoLoginPOST = XanoApi.useLoginPOST();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
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
        <View
          style={StyleSheet.applyWidth(
            { backgroundColor: palettes.App['APP MAIN'], flex: 1 },
            dimensions.width
          )}
        >
          {/* Top  */}
          <View
            style={StyleSheet.applyWidth(
              { alignSelf: 'center', height: '30%', justifyContent: 'center' },
              dimensions.width
            )}
          >
            <Image
              {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
              resizeMode={'cover'}
              source={imageSource(Images['untitled250x100px1'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image 2'].style,
                  { position: 'relative', width: 250 }
                ),
                dimensions.width
              )}
            />
          </View>
          {/* Bottom Container */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Surface,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 65,
                height: '70%',
                justifyContent: 'space-around',
                padding: '8%',
              },
              dimensions.width
            )}
          >
            {/* Login Items */}
            <View
              style={StyleSheet.applyWidth(
                { gap: 16, padding: '4%' },
                dimensions.width
              )}
            >
              {/* Titles */}
              <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
                {/* Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 30,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Login'}
                </Text>
                {/* Subtitle */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { letterSpacing: 0.3, textAlign: 'center' }
                    ),
                    dimensions.width
                  )}
                >
                  {'Sign in to continue.'}
                </Text>
              </View>
              {/* CTA's */}
              <View
                style={StyleSheet.applyWidth({ gap: 12 }, dimensions.width)}
              >
                {/* Email Input */}
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
                          fontSize: 14,
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
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholder={'Enter Your Email...'}
                    returnKeyType={'next'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        {
                          backgroundColor:
                            palettes.App['APP SECONDARY BG FOR LIGHT'],
                          borderBottomWidth: null,
                          borderLeftWidth: null,
                          borderRadius: 16,
                          borderRightWidth: null,
                          borderTopWidth: null,
                          color: palettes.App['APP MAIN'],
                          fontFamily: 'IBMPlexSans_400Regular',
                          fontSize: 16,
                          paddingBottom: 16,
                          paddingLeft: 20,
                          paddingRight: 12,
                          paddingTop: 16,
                        }
                      ),
                      dimensions.width
                    )}
                    textContentType={'name'}
                    value={emailInput}
                    webShowOutline={false}
                  />
                </View>
                {/* Password Input */}
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
                        { letterSpacing: 1.5, textTransform: 'uppercase' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Password'}
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
                    placeholder={'Enter a Password...'}
                    secureTextEntry={Boolean(!isShowingPassword)}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        {
                          backgroundColor:
                            palettes.App['APP SECONDARY BG FOR LIGHT'],
                          borderBottomWidth: null,
                          borderLeftWidth: null,
                          borderRadius: 16,
                          borderRightWidth: null,
                          borderTopWidth: null,
                          color: palettes.App['APP MAIN'],
                          fontFamily: 'IBMPlexSans_400Regular',
                          fontSize: 16,
                          paddingBottom: 16,
                          paddingLeft: 20,
                          paddingRight: 12,
                          paddingTop: 16,
                        }
                      ),
                      dimensions.width
                    )}
                    value={passwordInput}
                  />
                  <View
                    style={StyleSheet.applyWidth(
                      { bottom: 0, position: 'absolute', right: 0 },
                      dimensions.width
                    )}
                  >
                    {/* Close Eye  */}
                    <>
                      {!isShowingPassword ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setIsShowingPassword(!isShowingPassword);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          size={32}
                          color={palettes.App['APP MAIN']}
                          icon={'Ionicons/eye-off'}
                          style={StyleSheet.applyWidth(
                            { bottom: 8, position: 'absolute', right: 16 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                    {/* Open Eye */}
                    <>
                      {isShowingPassword ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setIsShowingPassword(!isShowingPassword);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          size={32}
                          color={palettes.App['APP MAIN']}
                          icon={'Ionicons/eye'}
                          style={StyleSheet.applyWidth(
                            { bottom: 8, position: 'absolute', right: 16 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </View>
                {/* Button And Error Message Container */}
                <View
                  style={StyleSheet.applyWidth(
                    { gap: 12, marginTop: '4%' },
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
                  {/* Login Button */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const validationResult = validateEmailAndPassword(
                            emailInput,
                            passwordInput
                          );
                          if (validationResult) {
                            return;
                          }
                          setIsLoading(true);
                          const AuthResult = (
                            await xanoLoginPOST.mutateAsync({
                              email: emailInput,
                              password: passwordInput,
                            })
                          )?.json;
                          console.log(AuthResult);
                          setIsLoading(false);
                          setErrorMessage(AuthResult?.message);
                          if (!AuthResult?.authToken) {
                            return;
                          }
                          setGlobalVariableValue({
                            key: 'SEQUR_USER',
                            value: AuthResult?.user_information,
                          });
                          setGlobalVariableValue({
                            key: 'AUTH_TOKEN',
                            value: AuthResult?.authToken,
                          });
                          if (AuthResult?.isOnboarded) {
                            navigation.navigate('HomeScreen');
                          } else {
                            navigation.navigate('Screen022PersonalInformation');
                          }
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
                        { backgroundColor: palettes.App['APP MAIN'] }
                      ),
                      dimensions.width
                    )}
                    title={'Log in'}
                  />
                </View>
              </View>
            </View>
            {/* forgot Password */}
            <View style={StyleSheet.applyWidth({ gap: 10 }, dimensions.width)}>
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('Screen011ForgotPassword');
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
                      { textAlign: 'center', textTransform: 'capitalize' }
                    ),
                    dimensions.width
                  )}
                >
                  {'forgot password?'}
                </Text>
              </Pressable>
              {/* Pressable 2 */}
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('Screen021CreateAccount');
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
                      { textAlign: 'center', textTransform: 'capitalize' }
                    ),
                    dimensions.width
                  )}
                >
                  {'signup !'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen01Login);
