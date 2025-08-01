import React from 'react';
import { Icon, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { testInp: 'item' };

const BulletOptionsBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        { alignItems: 'center', flexDirection: 'row' },
        dimensions.width
      )}
    >
      <Icon
        size={24}
        color={theme.colors.background.brand}
        name={'Entypo/dot-single'}
      />
      {/* Text 2 */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Text 4'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text 4'].style,
          dimensions.width
        )}
      >
        {props.testInp ?? defaultProps.testInp}
      </Text>
    </View>
  );
};

export default withTheme(BulletOptionsBlock);
