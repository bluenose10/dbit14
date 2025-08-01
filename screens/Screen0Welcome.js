import React from 'react';
import { Button, Icon, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen0Welcome = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

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
                color: palettes.Brand.Surface,
                fontFamily: 'IBMPlexSans_600SemiBold',
                fontSize: 36,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Welcome to the sequr world'}
          </Text>
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
            {/* Login Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.navigate('Screen01Login');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
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
              title={'Login'}
            />
            {/* Sign in Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.navigate('Screen021CreateAccount');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
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
              title={'Sign up'}
            />
          </View>
          {/* QR */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.Brand.Surface}
              name={'FontAwesome/qrcode'}
              size={100}
            />
          </View>
          {/* bottom text */}
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
                    fontFamily: 'IBMPlexSans_500Medium',
                  }
                ),
                dimensions.width
              )}
            >
              {'Powered by Blindspotglobal'}
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen0Welcome);
