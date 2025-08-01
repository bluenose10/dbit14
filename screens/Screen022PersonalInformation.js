import React from 'react';
import {
  Button,
  DatePicker,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import formatTS from '../global-functions/formatTS';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen022PersonalInformation = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addLine1, setAddLine1] = React.useState('');
  const [addLine2, setAddLine2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [dob, setDob] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [lname, setLname] = React.useState('');
  const [phoneInput, setPhoneInput] = React.useState('');
  const validateForm = () => {
    // Reset error message
    setErrorMessage('');

    // Check if any required field is empty
    if (!fname.trim()) {
      setErrorMessage('First name is required.');
      return false;
    }

    if (!lname.trim()) {
      setErrorMessage('Last name is required.');
      return false;
    }

    if (!phoneInput.trim()) {
      setErrorMessage('Phone number is required.');
      return false;
    }

    if (dob === null) {
      setErrorMessage('Invalid date of birth.');
      return false;
    }

    if (!addLine1.trim()) {
      setErrorMessage('Address Line 1 is required.');
      return false;
    }

    if (!city.trim()) {
      setErrorMessage('City is required.');
      return false;
    }

    if (!country.trim()) {
      setErrorMessage('Country is required.');
      return false;
    }

    // All fields are valid
    return true;
  };
  const xanoPostUserInfoPOST = XanoApi.usePostUserInfoPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (!Constants['SEQUR_USER']) {
        return;
      }
      setFname(Constants['SEQUR_USER']?.first_name);
      setLname(Constants['SEQUR_USER']?.last_name);
      setPhoneInput(Constants['SEQUR_USER']?.phone_no);
      setDob(Constants['SEQUR_USER']?.dob);
      setAddLine1(Constants['SEQUR_USER']?.address_line_1);
      setAddLine2(Constants['SEQUR_USER']?.address_line_2);
      setCity(Constants['SEQUR_USER']?.city);
      setCountry(Constants['SEQUR_USER']?.country);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={true}
      hasSafeArea={true}
      hasTopSafeArea={true}
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
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, gap: 24, justifyContent: 'space-around', padding: 20 },
            dimensions.width
          )}
        >
          {/* Title */}
          <View>
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.Brand.Surface,
                    fontFamily: 'IBMPlexSans_600SemiBold',
                    fontSize: 20,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }
                ),
                dimensions.width
              )}
            >
              {'Personal Information'}
            </Text>
          </View>
          {/* Personal Info Form */}
          <View style={StyleSheet.applyWidth({ gap: 12 }, dimensions.width)}>
            {/* First Name */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'First Name'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setFname(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Enter your First Name...'}
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
                      paddingLeft: 16,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
                value={fname}
              />
            </View>
            {/* Last Name */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Last Name'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setLname(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Enter your Last Name...'}
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
                      paddingLeft: 16,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
                value={lname}
              />
            </View>
            {/* Phone No */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Phone No'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setPhoneInput(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Enter your Phone No...'}
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
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={phoneInput}
              />
            </View>
            {/* Date of Birth */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
              {/* Display */}
              <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                        paddingLeft: 8,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Date of Birth'}
                </Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newTextInputValue => {
                    try {
                      setDob(newTextInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                  keyboardType={'default'}
                  placeholder={'Select Your Date of birth...'}
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
                        paddingLeft: 16,
                      }
                    ),
                    dimensions.width
                  )}
                  value={dob}
                />
                <Icon
                  size={24}
                  color={palettes.Brand.Surface}
                  name={'MaterialCommunityIcons/calendar-clock'}
                  style={StyleSheet.applyWidth(
                    { bottom: 6, position: 'absolute', right: 16 },
                    dimensions.width
                  )}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    bottom: 12,
                    position: 'absolute',
                    right: 16,
                    width: '100%',
                    zIndex: 99,
                  },
                  dimensions.width
                )}
              >
                <DatePicker
                  autoDismissKeyboard={true}
                  disabled={false}
                  hideLabel={false}
                  inline={false}
                  label={'Date'}
                  leftIconMode={'inset'}
                  onDateChange={newDatePickerValue => {
                    try {
                      setDatePickerValue(newDatePickerValue);
                      console.log(newDatePickerValue);
                      const dateResult = formatTS(
                        newDatePickerValue,
                        undefined
                      );
                      setDob(dateResult);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  type={'solid'}
                  borderColorActive={'rgba(0, 0, 0, 0)'}
                  date={datePickerValue}
                  format={'dd mm yy'}
                  labelColor={'rgba(0, 0, 0, 0)'}
                  maximumDate={new Date()}
                  mode={'date'}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderRadius: 16,
                      color: 'rgba(0, 0, 0, 0)',
                      height: 20,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
              </View>
            </View>
            {/* Address Line 1 */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Address Line 1'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setAddLine1(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Enter your Address...'}
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
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={addLine1}
              />
            </View>
            {/* Address Line 2 */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Address Line 2'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setAddLine2(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Enter your Address...'}
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
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={addLine2}
              />
            </View>
            {/* Country */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Country'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setCountry(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Select a country...'}
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
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={country}
              />
            </View>
            {/* Town/City */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
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
                      paddingLeft: 8,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Town/City'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setCity(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                keyboardType={'default'}
                placeholder={'Select a city...'}
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
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={city}
              />
            </View>
          </View>
          {/* CTA's */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', gap: 24, marginBottom: 6 },
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
                    const validationResult = validateForm();
                    if (!validationResult) {
                      return;
                    }
                    setIsLoading(true);
                    const postResult = (
                      await xanoPostUserInfoPOST.mutateAsync({
                        address_line_1: addLine1,
                        address_line_2: addLine2,
                        city: city,
                        country: country,
                        dob: dob,
                        first_name: fname,
                        last_name: lname,
                        phone_no: phoneInput,
                      })
                    )?.json;
                    setIsLoading(false);
                    setErrorMessage(postResult?.message);
                    console.log(postResult);
                    if (postResult?.message) {
                      return;
                    }
                    setGlobalVariableValue({
                      key: 'SEQUR_USER',
                      value: postResult,
                    });
                    navigation.navigate('Screen023TakePhoto');
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
                    borderRadius: 12,
                    color: palettes.App['APP MAIN'],
                    fontSize: 16,
                    textTransform: 'capitalize',
                    width: '90%',
                  }
                ),
                dimensions.width
              )}
              title={'Save Information'}
            />
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen022PersonalInformation);
