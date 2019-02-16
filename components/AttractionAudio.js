import React, { Fragment, Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableHighlight } from 'react-native';
import Video from 'react-native-video';
import { Fonts } from '../utils/Fonts';


const AttractionAudio = ({ audio, paused, onProgress, duration, onBuffer, onLoad, onError }) => (
  <Fragment>
    <Video source={{ uri: `https:${audio}` }}
      audioOnly={true}
      ref={(ref) => {
        this.player = ref
      }}
      paused={paused}
      onProgress={onProgress}
      controls={true}                                 // Store reference
      onBuffer={onBuffer}
      onLoad={onError}           // Callback when remote video is buffering
      onError={onError}               // Callback when video cannot be loaded
    />
  </Fragment>
);

export default AttractionAudio;

const styles = StyleSheet.create({
  AudioWrapper: {
    marginVertical: 50,
  },

  audioTitle: {
    fontSize: 18,
    fontFamily: Fonts.MontSerratBold,
  },

  PlayWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  playButton: {
    width: 54,
    height: 54,
  },
});
