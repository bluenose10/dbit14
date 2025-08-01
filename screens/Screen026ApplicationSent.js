import React from 'react';
import { Button, Icon, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen026ApplicationSent = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [imageURL, setImageURL] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['APP MAIN'] },
        dimensions.width
      )}
    >
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, padding: 20 },
          dimensions.width
        )}
      >
        {/* Logo With Message */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flex: 1,
              gap: 20,
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <Icon
            color={palettes.Brand.Surface}
            name={'FontAwesome/send'}
            size={120}
          />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 4'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 4'].style,
                { fontFamily: 'IBMPlexSans_600SemiBold', fontSize: 22 }
              ),
              dimensions.width
            )}
          >
            {'Application sent!'}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 4'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 4'].style,
                { textAlign: 'center' }
              ),
              dimensions.width
            )}
          >
            {'It will take us approximately one day to have\nyour ID verified.'}
          </Text>
        </View>
        {/* CTA */}
        <View
          style={StyleSheet.applyWidth(
            { height: '30%', justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* Continue */}
          <>
            {imageURL ? null : (
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
                title={'Continue'}
              />
            )}
          </>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen026ApplicationSent);
