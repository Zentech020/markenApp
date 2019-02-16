import React, { Fragment, Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Slider } from 'react-native-elements';

import { Fonts } from '../utils/Fonts';

const PlayButton = ({ paused, onPlay }) => (
  <TouchableOpacity onPressIn={onPlay}>
    <Icon name="play-arrow" size={50} />
  </TouchableOpacity>
)


const PauseButton = ({ paused, onPause }) => (
  <TouchableOpacity onPressIn={onPause}>
    <Icon name="pause" size={50} />
  </TouchableOpacity>
)


const AttractionAudioController = ({ duration, currentTime, onValueChange, paused }) => (
  <Fragment>
    <View style={styles.AudioWrapper}>
      <Text style={styles.audioTitle}>Listen</Text>
      <View style={styles.PlayWrapper}>
        <Grid>
          <Col size={20}>
            {paused ? (
              <PlayButton />
            ) : (
                <PauseButton />
              )
            }
          </Col>
          <Col size={80}>
            {currentTime ? (<Slider
              thumbTintColor='#158ACC'
              value={currentTime}
              onValueChange={onValueChange}
              maximumValue={duration}
            />) : <Text>0</Text>}
          </Col>
        </Grid>
      </View>
    </View>
  </Fragment>
);

export default AttractionAudioController;

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
