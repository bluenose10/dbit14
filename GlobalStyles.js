import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Button 2': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Button 3': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Button 4': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: {
      style: {
        color: palettes.App['APP MAIN'],
        fontFamily: 'IBMPlexSans_400Regular',
      },
      props: {},
    },
    'Text 2': {
      style: {
        color: palettes.Brand.Surface,
        fontFamily: 'IBMPlexSans_400Regular',
        textAlign: 'left',
      },
      props: {},
    },
    'Text 3': {
      style: {
        color: palettes.Brand.Surface,
        fontFamily: 'IBMPlexSans_400Regular',
        textAlign: 'left',
      },
      props: {},
    },
    'Text 4': {
      style: {
        color: palettes.Brand.Surface,
        fontFamily: 'IBMPlexSans_400Regular',
        textAlign: 'left',
      },
      props: {},
    },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Input 2': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Input 3': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
    'Image 2': { style: { height: 100, width: 100 }, props: {} },
  });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { style: { flex: 1 }, props: {} } });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': {
      style: { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
      props: {},
    },
  });

export const PinInputStyles = theme =>
  StyleSheet.create({
    'Pin Input': {
      style: {
        alignItems: 'center',
        borderColor: theme.colors.text.medium,
        borderRadius: 5,
        borderWidth: 1,
        color: theme.colors.text.strong,
        flex: 1,
        fontSize: 25,
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        maxHeight: 70,
        maxWidth: 70,
        padding: 5,
      },
      props: {},
    },
  });

export const TimerStyles = theme =>
  StyleSheet.create({
    Timer: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 24,
        textAlign: 'left',
      },
      props: {},
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'Web View': { style: { flex: 1 }, props: {} } });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });
