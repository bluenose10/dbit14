import React from 'react';
import { Button, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApi from '../apis/XanoApi.js';
import BulletOptionsBlock from '../components/BulletOptionsBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen0AskAboutDocumentations = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App['APP MAIN'],
            flex: 1,
            justifyContent: 'space-around',
            paddingTop: '6%',
          },
          dimensions.width
        )}
      >
        <Spacer bottom={8} left={8} right={8} top={25} />
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
          source={imageSource(Images['untitled250x100px1'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ImageStyles(theme)['Image 2'].style,
              { width: 250 }
            ),
            dimensions.width
          )}
        />
        <Spacer bottom={8} left={8} right={8} top={8} />
        {/* Welcome Text */}
        <View
          style={StyleSheet.applyWidth({ padding: '4%' }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                alignSelf: 'auto',
                color: palettes.Brand.Surface,
                fontSize: 20,
                marginBottom: 16,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {
              "Let's start your verification journey\nPlease photgraph any one of the following ID documents:\n"
            }
          </Text>
          {/* bullet options 2 */}
          <BulletOptionsBlock testInp={'Licence'} />
          {/* bullet options 3 */}
          <BulletOptionsBlock testInp={'Passport'} />
        </View>
        {/* Bottom */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: '50%',
              justifyContent: 'space-around',
              padding: '4%',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Buttons */}
          <View
            style={StyleSheet.applyWidth(
              { gap: 20, width: '80%' },
              dimensions.width
            )}
          >
            {/* Upload Now */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    setIsLoading(true);
                    const apiResult = (
                      await XanoApi.webApiSessionGET(Constants)
                    )?.json;

                    const webURLResult = apiResult?.data.webURL;
                    setGlobalVariableValue({
                      key: 'WEB_URL',
                      value: webURLResult,
                    });

                    const sessionResult = apiResult?.data.SessionID;
                    setGlobalVariableValue({
                      key: 'SESSION_ID',
                      value: sessionResult,
                    });
                    setIsLoading(false);
                    /* hidden 'Log to Console' action */
                    navigation.navigate('WebSessionScreen');
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
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen0AskAboutDocumentations);
