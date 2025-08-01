import React from 'react';
import { withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const WhiteLogoBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Text'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
            color: palettes.Brand.Surface,
            fontFamily: 'IBMPlexSans_700Bold',
            fontSize: 18,
            textAlign: 'center',
          }),
          dimensions.width
        )}
      >
        {'WHITE LOGO'}
      </Text>
    </View>
  );
};

export default withTheme(WhiteLogoBlock);
