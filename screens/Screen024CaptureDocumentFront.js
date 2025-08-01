import React from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import { Image, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import parseBase64Image from '../global-functions/parseBase64Image';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen024CaptureDocumentFront = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isConfirm, setIsConfirm] = React.useState(false);
  const [isImageTaken, setIsImageTaken] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [uploadedPhoto, setUploadedPhoto] = React.useState('');
  const xanoUploadIdentityDocPOST = XanoApi.useUploadIdentityDocPOST();

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
            {'Front Side of Your ID Document. '}
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
                      /* hidden 'Log to Console' action */
                      /* hidden 'Log to Console' action */
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
                      textTransform: 'capitalize',
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
                      setSuccessMessage('');
                      setErrorMessage('');
                      setIsLoading(true);
                      const UploadDocFrontResult = (
                        await xanoUploadIdentityDocPOST.mutateAsync({
                          baseImage: parseBase64Image(imageURL)?.str,
                          content: imageURL,
                          imageType: parseBase64Image(imageURL)?.type,
                        })
                      )?.json;
                      console.log(UploadDocFrontResult);
                      setIsLoading(false);
                      if (UploadDocFrontResult?.CurrentResult === 'Pass') {
                        setSuccessMessage('Image Added Successfully.');
                        undefined;
                        setGlobalVariableValue({
                          key: 'REQUIRED_ACTION',
                          value: (() => {
                            const e = UploadDocFrontResult?.RequiredAction;
                            console.log(e);
                            return e;
                          })(),
                        });
                        setGlobalVariableValue({
                          key: 'CURRENT_RESULT',
                          value: (() => {
                            const e = UploadDocFrontResult?.CurrentResult;
                            console.log(e);
                            return e;
                          })(),
                        });
                        /* hidden 'Navigate' action */
                      } else {
                        setErrorMessage(UploadDocFrontResult?.result);
                      }

                      setIsConfirm(true);
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
      {/* response Modal */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={Boolean(isConfirm)}
      >
        {/* empty */}
        <View
          style={StyleSheet.applyWidth({ height: '50%' }, dimensions.width)}
        />
        {/* Varification */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              height: '50%',
              justifyContent: 'space-around',
              opacity: 1,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Success view */}
          <>
            {!successMessage ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', gap: 20, marginTop: 10 },
                  dimensions.width
                )}
              >
                <Icon
                  color={palettes.Green[600]}
                  name={'AntDesign/checkcircle'}
                  size={90}
                />
                {/* Title */}
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
                  {'Document Identified'}
                </Text>
                {/* sub Title */}
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
                  {'document identification has been\nsuccessfully verified.\n'}
                </Text>
              </View>
            )}
          </>
          {/* Error view */}
          <>
            {!errorMessage ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', gap: 20, marginTop: 10 },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors.background.danger}
                  name={'Entypo/circle-with-cross'}
                  size={90}
                />
                {/* Title */}
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
                  {'Error Occurred !!'}
                </Text>
                {/* sub Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.Brand.Surface,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {errorMessage}
                  {'\n'}
                </Text>
              </View>
            )}
          </>
          {/* Continue */}
          <>
            {!successMessage ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setIsConfirm(false);
                    navigation.navigate('Screen023TakePhoto');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderRadius: 16,
                      color: palettes.App['APP MAIN'],
                      fontSize: 16,
                      width: '80%',
                    }
                  ),
                  dimensions.width
                )}
                title={'Continue'}
              />
            )}
          </>
          {/* Retry */}
          <>
            {!errorMessage ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setIsConfirm(false);
                    setErrorMessage('');
                    setSuccessMessage('');
                    setImageUrl('');
                    setIsImageTaken(false);
                    setUploadedPhoto('');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderRadius: 16,
                      color: palettes.App['APP MAIN'],
                      fontSize: 16,
                      width: '80%',
                    }
                  ),
                  dimensions.width
                )}
                title={'Try Again'}
              />
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.text.strong,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                height: '100%',
                justifyContent: 'center',
                opacity: 0.92,
                overflow: 'hidden',
                position: 'absolute',
                width: '100%',
                zIndex: -3,
              },
              dimensions.width
            )}
          ></View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(Screen024CaptureDocumentFront);
