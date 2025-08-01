import React from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  LinearGradient,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import { Image, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import parseBase64Image from '../global-functions/parseBase64Image';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen023TakePhoto = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState(
    'https://i.ibb.co.com/qrMZbCC/user-Image.png'
  );
  const [isConfirm, setIsConfirm] = React.useState(false);
  const [isImageTaken, setIsImageTaken] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [uploadedPhoto, setUploadedPhoto] = React.useState('');
  const xanoUploadUserImagePOST = XanoApi.useUploadUserImagePOST();

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
          { alignItems: 'center', flex: 1, gap: 20, padding: 20 },
          dimensions.width
        )}
      >
        {/* Logo */}
        <View
          style={StyleSheet.applyWidth(
            { height: '15%', justifyContent: 'center' },
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
        {/* Take Photo */}
        <View style={StyleSheet.applyWidth({ gap: 12 }, dimensions.width)}>
          {/* Title */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.Brand.Surface,
                fontFamily: 'IBMPlexSans_600SemiBold',
                fontSize: 20,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Take Photo'}
          </Text>
          {/* Description */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.Brand.Surface,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {
              'Adjust your photo so your face fits inside the\nblue frame, from the top of your forehead to\nthe bottom of chin.'
            }
          </Text>
        </View>
        {/* Image */}
        <View
          style={StyleSheet.applyWidth(
            { height: 400, width: 300 },
            dimensions.width
          )}
        >
          {/* User Uploaded Image */}
          <>
            {!uploadedPhoto ? null : (
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
                resizeMode={'contain'}
                source={imageSource(uploadedPhoto)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image 2'].style,
                    { height: 400, width: null }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Temp Image */}
          <>
            {uploadedPhoto ? null : (
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
                source={imageSource(Images['tempimage'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image 2'].style,
                    { height: 400, width: null }
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
        {/* CTA's */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, gap: 12, justifyContent: 'center', width: '100%' },
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
          {/* Before Upload */}
          <>
            {isUploaded ? null : (
              <View
                style={StyleSheet.applyWidth({ gap: 20 }, dimensions.width)}
              >
                {/* Take Image */}
                <>
                  {isImageTaken ? null : (
                    <Button
                      accessible={true}
                      iconPosition={'left'}
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const imageResult = await openCameraUtil({
                              mediaTypes: 'Images',
                              allowsEditing: false,
                              cameraType: 'front',
                              videoMaxDuration: undefined,
                              quality: 0.4,
                              permissionErrorMessage:
                                'Sorry, we need camera permissions to make this work.',
                              showAlertOnPermissionError: true,
                              outputBase64: true,
                            });

                            if (imageResult) {
                              setIsImageTaken(true);
                            }
                            setUploadedPhoto(imageResult);
                            console.log(imageResult);
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
                            borderRadius: 16,
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
                {/* Retake Image */}
                <>
                  {!isImageTaken ? null : (
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

                            setUploadedPhoto(imageResult);
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
                            borderRadius: 16,
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
                {/* Upload Image */}
                <>
                  {!isImageTaken ? null : (
                    <Button
                      accessible={true}
                      iconPosition={'left'}
                      onPress={() => {
                        const handler = async () => {
                          try {
                            setErrorMessage('');
                            setSuccessMessage('');
                            setIsLoading(true);
                            const resResult = (
                              await xanoUploadUserImagePOST.mutateAsync({
                                content: uploadedPhoto,
                                imageType:
                                  parseBase64Image(uploadedPhoto)?.type,
                                ped: Constants['PERSON_ENTRY_ID'],
                                photo: parseBase64Image(uploadedPhoto)?.str,
                              })
                            )?.json;
                            setIsLoading(false);
                            console.log(resResult);
                            if (resResult?.CurrentResult === 'Pass') {
                              setSuccessMessage('Image added Successfully.');
                              setIsUploaded(true);
                            } else {
                              setErrorMessage('Something Went Wrong.');
                            }

                            setIsConfirm(true);
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
                            borderRadius: 16,
                            color: palettes.App['APP MAIN'],
                            fontSize: 16,
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Upload Photo'}
                    />
                  )}
                </>
              </View>
            )}
          </>
        </View>
      </View>
      {/* Face identified Modal */}
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
                  {'Face Identified'}
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
                  {'Face identification has been\nsuccessfully verified.\n'}
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
                      { color: palettes.Brand.Surface, textAlign: 'center' }
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
                    navigation.navigate('HomeScreen');
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

export default withTheme(Screen023TakePhoto);
