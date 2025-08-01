import React from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen025CaptureDocumentBack = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const xanoUploadIdentityDocBackPOST = XanoApi.useUploadIdentityDocBackPOST();

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
      {/* Container */}
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
            size={32}
            color={theme.colors.foreground.brand}
            icon={'AntDesign/left'}
          />
          {/* Title */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 4'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 4'].style,
                { fontFamily: 'IBMPlexSans_600SemiBold', fontSize: 20 }
              ),
              dimensions.width
            )}
          >
            {'Capture Documents'}
          </Text>
          {/* Close Button */}
          <IconButton
            size={32}
            color={theme.colors.foreground.brand}
            icon={'AntDesign/close'}
          />
        </View>
        {/* Document Container */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.border.brand,
              flex: 1,
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <>
            {imageURL ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['APP SECONDARY BG'],
                    borderRadius: 16,
                    flex: 1,
                    justifyContent: 'center',
                    margin: '8%',
                    opacity: 0.8,
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
                        fontFamily: 'IBMPlexSans_600SemiBold',
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Take picture of your ID documentation'}
                </Text>
              </View>
            )}
          </>
          <>
            {!imageURL ? null : (
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
                resizeMode={'contain'}
                source={imageSource(`${imageURL}`)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image 2'].style,
                    {
                      borderRadius: 16,
                      height: '84%',
                      marginLeft: '8%',
                      marginRight: '8%',
                      width: '84%',
                    }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Loading Spiner */}
          <>
            {!isLoading ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    height: '100%',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <BlurView
                  experimentalBlurMethod={'none'}
                  {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
                  intensity={20}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                      {
                        alignItems: 'center',
                        flexBasis: 1,
                        height: '100%',
                        justifyContent: 'center',
                        width: '100%',
                      }
                    ),
                    dimensions.width
                  )}
                  tint={'dark'}
                >
                  <CircularProgress
                    isAnimated={true}
                    thickness={10}
                    trackColor={theme.colors.border.base}
                    animationDuration={3000}
                    color={palettes.App['APP MAIN']}
                    indeterminate={true}
                    lineCap={'round'}
                    maximumValue={100}
                    minimumValue={0}
                    showTrack={true}
                    startPosition={'top'}
                    style={StyleSheet.applyWidth(
                      { height: '30%', width: '20%' },
                      dimensions.width
                    )}
                    trackLineCap={'round'}
                  />
                </BlurView>
              </View>
            )}
          </>
        </View>
        {/* Info Text */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['APP SECONDARY BG FOR LIGHT'],
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
                { color: theme.colors.text.strong, textAlign: 'center' }
              ),
              dimensions.width
            )}
          >
            {'Back Side of Your ID Document. '}
          </Text>
        </View>
        {/* CTA's */}
        <View
          style={StyleSheet.applyWidth(
            { gap: 12, height: '30%', justifyContent: 'center', padding: 20 },
            dimensions.width
          )}
        >
          {/* Error Message */}
          <>
            {!(errorMessage || successMessage) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['APP SECONDARY BG FOR LIGHT'],
                    borderRadius: 8,
                    height: 32,
                    justifyContent: 'center',
                  },
                  dimensions.width
                )}
              >
                <>
                  {!errorMessage ? null : (
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
                  )}
                </>
                {/* Text 2 */}
                <>
                  {!successMessage ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 4'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 4'].style,
                          {
                            color: palettes.Brand['Success Green'],
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {successMessage}
                    </Text>
                  )}
                </>
              </View>
            )}
          </>
          {/* Take Photo */}
          <>
            {imageURL ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      const imageResult = await openCameraUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        cameraType: 'back',
                        videoMaxDuration: undefined,
                        quality: 0.2,
                        permissionErrorMessage:
                          'Sorry, we need camera permissions to make this work.',
                        showAlertOnPermissionError: true,
                        outputBase64: true,
                      });

                      setImageURL(imageResult);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button 4'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button 4'].style,
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderRadius: 12,
                      color: palettes.App['APP MAIN'],
                      fontSize: 16,
                    }
                  ),
                  dimensions.width
                )}
                title={'Take Photo'}
              />
            )}
          </>
          {/* Retake Photo */}
          <>
            {!imageURL ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      const imageResult = await openCameraUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        cameraType: 'back',
                        videoMaxDuration: undefined,
                        quality: 0.2,
                        permissionErrorMessage:
                          'Sorry, we need camera permissions to make this work.',
                        showAlertOnPermissionError: true,
                        outputBase64: true,
                      });

                      setImageURL(imageResult);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button 4'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button 4'].style,
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderRadius: 12,
                      color: palettes.App['APP MAIN'],
                      fontSize: 16,
                    }
                  ),
                  dimensions.width
                )}
                title={'Retake Photo'}
              />
            )}
          </>
          {/* Upload Document */}
          <>
            {!imageURL ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      setIsLoading(true);
                      const uploadDocBackResult = (
                        await xanoUploadIdentityDocBackPOST.mutateAsync({
                          content: imageURL,
                        })
                      )?.json;
                      setIsLoading(false);
                      if (uploadDocBackResult?.result === 'success') {
                        setSuccessMessage('Document Uploaded Successfully. ');
                        navigation.navigate('Screen026ApplicationSent');
                      } else {
                        setErrorMessage(uploadDocBackResult?.result);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button 4'].props}
                loading={Boolean(isLoading)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button 4'].style,
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderRadius: 12,
                      color: palettes.App['APP MAIN'],
                      fontSize: 16,
                    }
                  ),
                  dimensions.width
                )}
                title={'Upload Document'}
              />
            )}
          </>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen025CaptureDocumentBack);
