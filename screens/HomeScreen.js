import React from 'react';
import {
  Button,
  CircularProgress,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomeScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [gettingStatus, setGettingStatus] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [nextStepValue, setNextStepValue] = React.useState('');
  const [shouldGetStatus, setShouldGetStatus] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [user, setUser] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const AuthMeResult = (await XanoApi.authMeGET(Constants))?.json;
        setUser(
          (() => {
            const e = AuthMeResult;
            console.log(e);
            return e;
          })()
        );
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      <>
        {!shouldGetStatus ? null : (
          <XanoApi.FetchGetJourneyStatusGET
            handlers={{
              onData: fetchData => {
                try {
                  /* hidden 'Log to Console' action */
                  setGettingStatus(true);

                  const bs = fetchData?.nextStep;
                  setNextStepValue(bs);
                  setStatus(fetchData?.status);
                  /* hidden 'Log to Console' action */
                  setGettingStatus(false);
                  if (bs === 'Passed') {
                    setShouldGetStatus(false);
                  }
                  /* hidden 'Log to Console' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Log to Console' action */
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            refetchInterval={5000}
            staleTime={0}
          >
            {({ loading, error, data, refetchGetJourneyStatus }) => {
              const fetchData = data?.json;
              if (loading) {
                return <View />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return null;
            }}
          </XanoApi.FetchGetJourneyStatusGET>
        )}
      </>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App['APP MAIN'],
            flexDirection: 'row',
            height: 56,
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Text 2 */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text 4'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text 4'].style, {
              color: palettes.Brand.hs_white,
              fontSize: 20,
              textTransform: 'capitalize',
            }),
            dimensions.width
          )}
        >
          {'Hey,  '}
          {user?.name}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            { height: 44, width: 44 },
            dimensions.width
          )}
        >
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
            source={
              imageSource(Images['tempimage']) ??
              imageSource(
                `${(() => {
                  const e = user?._user_info_of_user?.selfie_url;
                  console.log(e);
                  return e;
                })()}`
              )
            }
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image 2'].style,
                { borderRadius: 50, height: '100%', width: '100%' }
              ),
              dimensions.width
            )}
          />
        </View>
      </View>
      {/* Container */}
      <>
        {gettingStatus ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: '4%',
              },
              dimensions.width
            )}
          >
            {/* Failed Verification */}
            <>
              {nextStepValue === 'Passed' ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 20 },
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
                        { marginBottom: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'We were not able to Verify you. Try again!'}
                  </Text>
                  {/* Buttons */}
                  <View
                    style={StyleSheet.applyWidth({ gap: 20 }, dimensions.width)}
                  >
                    {/* Upload Now */}
                    <Button
                      accessible={true}
                      iconPosition={'left'}
                      onPress={() => {
                        try {
                          if (navigation.canGoBack()) {
                            navigation.popToTop();
                          }
                          navigation.replace('Screen0AskAboutDocumentations');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                      loading={Boolean(isLoading)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'].style,
                          {
                            backgroundColor: palettes.App['APP SECONDARY BG'],
                            borderRadius: 16,
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '600',
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Continue'}
                    />
                  </View>
                </View>
              )}
            </>
            {/* Passed Verification  */}
            <>
              {!(nextStepValue === 'Passed') ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 20 },
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
                        { marginBottom: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Identity Verified'}
                  </Text>

                  <XanoApi.FetchGetDensoImageGET
                    handlers={{
                      onData: fetchData => {
                        try {
                          /* hidden 'Log to Console' action */
                          setShouldGetStatus(false);
                        } catch (err) {
                          console.error(err);
                        }
                      },
                    }}
                  >
                    {({ loading, error, data, refetchGetDensoImage }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
                          source={imageSource(
                            'https://xquq-ck4k-qxar.n7d.xano.io' +
                              fetchData?.image?.path
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image 2'].style,
                              { height: 300, width: 300 }
                            ),
                            dimensions.width
                          )}
                        />
                      );
                    }}
                  </XanoApi.FetchGetDensoImageGET>
                </View>
              )}
            </>
          </View>
        )}
      </>
      {/* Checking Status View */}
      <>
        {!gettingStatus ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flex: 1, justifyContent: 'center' },
              dimensions.width
            )}
          >
            <CircularProgress
              animationDuration={500}
              isAnimated={true}
              startPosition={'top'}
              thickness={10}
              color={palettes.App['APP MAIN']}
              indeterminate={true}
              lineCap={'round'}
              showTrack={true}
              style={StyleSheet.applyWidth(
                { height: 300, width: 300 },
                dimensions.width
              )}
              trackColor={theme.colors.text.light}
              trackLineCap={'round'}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    fontFamily: 'IBMPlexSans_600SemiBold_Italic',
                    marginTop: 20,
                  }
                ),
                dimensions.width
              )}
            >
              {'Verifying your docs...'}
            </Text>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
