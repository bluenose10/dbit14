import palettes from '../themes/palettes';
import React from 'react';
import * as GlobalVariableContext from '../config/GlobalVariableContext';
import { View } from 'react-native';
import { WebView } from '@draftbit/ui';

export const CustomWebView = props => {
  const { navigation } = props;
  const variables = GlobalVariableContext.useValues();
  const newSource = { ...props.source, uri: variables.WEB_URL };
  const onNavigationStateChange = webViewState => {
    if (webViewState.url.includes('#complete')) {
      try {
        if (navigation.canGoBack()) {
          navigation.popToTop();
        }
        navigation.replace('HomeScreen');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={newSource}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabledAndroid={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};
