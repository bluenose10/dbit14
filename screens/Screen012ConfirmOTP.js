import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  PinInput,
  Pressable,
  ScreenContainer,
  Timer,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { email: null, otp: null };

const Screen012ConfirmOTP = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTimerEnd, setIsTimerEnd] = React.useState(false);
  const [pinInputValue, setPinInputValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [codeInputValue, setCodeInputValue] = React.useState(undefined);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* hidden 'Start Timer' action */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  const viewViewTimerTimerRef = React.useRef();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['APP MAIN'] },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          { backgroundColor: palettes.App['APP MAIN'], flex: 1 },
          dimensions.width
        )}
      >
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
        {/* Sub Heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.Brand.Surface,
              fontFamily: 'IBMPlexSans_400Regular',
              fontSize: 16,
              letterSpacing: 0.3,
              lineHeight: 21,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 75,
              opacity: 1,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'OTP has been send to Your Email.'}
        </Text>
        {/* OTP */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 50,
              paddingLeft: 20,
              paddingRight: 20,
            },
            dimensions.width
          )}
        >
          <PinInput
            autoComplete={'one-time-code'}
            cellCount={4}
            changeTextDelay={500}
            keyboardType={'number-pad'}
            onChangeText={newPinInputValue => {
              const codeInputValue = newPinInputValue;
              try {
                setPinInputValue(newPinInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            onInputFull={finalValue => {
              const handler = async () => {
                const codeInputValue = finalValue;
                try {
                  setIsLoading(true);
                  const resResult = (
                    await XanoApi.matchingOtpGET(Constants, {
                      otp_inp: finalValue,
                    })
                  )?.json;
                  setIsLoading(false);
                  if (!resResult?.authToken) {
                    setErrorMessage(resResult?.message);
                  }
                  if (!resResult?.authToken) {
                    return;
                  }
                  setGlobalVariableValue({
                    key: 'TEMP_AUTH_TOKEN',
                    value: resResult?.authToken,
                  });
                  navigation.navigate('Screen013ResetPassword');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            renderItem={({ cellValue, isFocused }) => {
              return null;
            }}
            secureTextEntry={false}
            {...GlobalStyles.PinInputStyles(theme)['Pin Input'].props}
            blurOnFull={true}
            clearOnCellFocus={true}
            focusedBorderColor={palettes.Brand.Surface}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.PinInputStyles(theme)['Pin Input'].style,
                {
                  borderColor: palettes.App['APP SECONDARY BG FOR LIGHT'],
                  color: palettes.Brand.Surface,
                  fontFamily: 'IBMPlexSans_400Regular',
                  minHeight: 70,
                  minWidth: 70,
                }
              ),
              dimensions.width
            )}
            value={pinInputValue}
          />
        </View>
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
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 32,
              justifyContent: 'center',
              marginTop: 45,
            },
            dimensions.width
          )}
        >
          {/* Resend code */}
          <>
            {isTimerEnd ? null : (
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.Brand.Surface,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 15,
                    letterSpacing: 0.3,
                    lineHeight: 21,
                    marginLeft: 20,
                    opacity: 1,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {'Resend Again In '}
              </Text>
            )}
          </>
          {/* Timer */}
          <>
            {isTimerEnd ? null : (
              <View
                onLayout={event => {
                  try {
                    viewViewTimerTimerRef.current?.start();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Timer
                  format={'mm:ss'}
                  onTimerEnd={() => {
                    try {
                      setIsTimerEnd(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  updateInterval={1000}
                  {...GlobalStyles.TimerStyles(theme)['Timer'].props}
                  countDirection={'down'}
                  initialTime={30000}
                  ref={viewViewTimerTimerRef}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TimerStyles(theme)['Timer'].style,
                      {
                        color: palettes.Brand.Surface,
                        fontSize: 16,
                        padding: 0,
                      }
                    ),
                    dimensions.width
                  )}
                  timerEndTime={0}
                />
              </View>
            )}
          </>
          <>
            {!isTimerEnd ? null : (
              <Pressable
                onPress={() => {
                  const handler = async () => {
                    try {
                      setIsTimerEnd(false);
                      const resResult = (
                        await XanoApi.setOtpGET(Constants, {
                          email: params?.email ?? defaultProps.email,
                        })
                      )?.json;
                      if (resResult?.authToken) {
                        setErrorMessage('New OTP Send to your Email');
                      }
                      if (!resResult?.authToken) {
                        setErrorMessage(resResult?.message);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* Resend Options */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row', gap: 6 },
                    dimensions.width
                  )}
                >
                  <Icon
                    color={palettes.Brand.Surface}
                    name={'AntDesign/reload1'}
                    size={20}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 4'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text 4'].style,
                      dimensions.width
                    )}
                  >
                    {'Resend The OTP.'}
                  </Text>
                </View>
              </Pressable>
            )}
          </>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen012ConfirmOTP);
