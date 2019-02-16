import React, { Component, Fragment } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Slider } from 'react-native-elements';

import { connect } from 'react-redux';
import { getAttraction } from "../actions";
import { AttractionMap, AttractionGallery, AttractionAudio, AttractionAudioController } from '../components';


import { Fonts } from '../utils/Fonts';



class AttractionScreen extends Component {



  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.attraction.field.title,
    headerStyle: {
      backgroundColor: '#158ACC',
      height: 40,
    },
    headerTitleStyle: {
      color: 'white'
    },
  })

  constructor(props) {
    super(props);

    this.state = {
      galleryOpen: false,
      paused: false,
      duration: 0,
      currentTime: 0,
      value: 5
    }
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params.attraction;
    this.props.getAttraction(id);
  }

  onPlay = (paused) => {
    console.log('playing music');
    this.setState({ paused: !paused })
  }

  onPause = (paused) => {
    console.log('pausing music');
    this.setState({ paused: !paused })
  }





  render() {
    const { galleryOpen, paused, duration, currentTime, value } = this.state;
    const { attraction, isLoading } = this.props;



    const { title, description, gallery, audio } = this.props.navigation.state.params.attraction.field;

    const PlayButton = () => (
      <TouchableOpacity onPressIn={() => this.onPlay(paused)}>
        <Icon name="play-arrow" size={50} />
      </TouchableOpacity>
    )


    const PauseButton = () => (
      <TouchableOpacity onPressIn={() => this.onPause(paused)}>
        <Icon name="pause" size={50} />
      </TouchableOpacity>
    )


    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}>
        {galleryOpen ? (
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Icon style={styles.closeIcon} onPress={() => this.setState({ galleryOpen: false })} name="close" size={30} color="white" />
            <Gallery
              style={styles.gallery}
              images={
                gallery.map((image) => {
                  return (
                    { source: { uri: `https:${image.fields.file.url}` } }
                  )
                })
              }
            />
          </View>
        ) : (
            <Fragment>
              <AttractionMap
                lat={this.props.navigation.state.params.attraction.field.location.lat}
                lon={this.props.navigation.state.params.attraction.field.location.lon}
              />
              <View style={styles.container}>

                {attraction ? (
                  <Text style={styles.title}>{this.props.attraction.fields.title}</Text>
                ) : (null)}
                <Fragment>
                  <AttractionGallery
                    gallery={gallery}
                    onPress={() => this.setState({ galleryOpen: true })}
                  />
                </Fragment>
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
                          onValueChange={value => this.player.seek(value)}
                          maximumValue={duration}
                        />) : (<Slider
                          thumbTintColor='#158ACC'
                          value={currentTime}
                          onValueChange={value => this.player.seek(value)}
                          maximumValue={duration}
                        />)}
                      </Col>
                    </Grid>
                  </View>
                </View>
                {/* <AttractionAudioController
                  paused={paused}
                  onValueChange={value => this.player.seek(value)}
                  duration={duration}
                  currentTime={currentTime}
                  onPlay={() => this.setState({ paused: !paused })}
                  onPause={() => console.log('click pause')}
                /> */}
                <Video source={{ uri: `https:${audio.fields.file.url}` }}
                  audioOnly={true}
                  ref={(ref) => {
                    this.player = ref
                  }}
                  paused={paused}
                  onProgress={() => this.onProgress}
                  onProgress={(sound) => {
                    this.setState({
                      currentTime: sound.currentTime
                    })
                  }}
                  controls={true}                                 // Store reference
                  onBuffer={this.onBuffer}
                  onLoad={(audio) => {
                    this.setState({
                      paused: true,
                      duration: audio.duration,
                    });
                  }}           // Callback when remote video is buffering
                  onError={this.videoError}               // Callback when video cannot be loaded
                  style={styles.backgroundVideo} />
                {/* <AttractionAudio
                  audio={audio}
                  paused={paused}
                  onLoad={(audio) => {
                    this.setState({
                      paused: true,
                      duration: audio.duration,
                    });
                  }}
                  onError={this.videoError}
                  onBuffer={this.onBuffer}
                /> */}
                <View>
                  <Text style={styles.description} >{description}</Text>
                </View>
              </View>
            </Fragment>
          )
        }
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    attraction: state.attraction,
    isLoading: state.isLoading,
  };
}

export default connect(
  mapStateToProps,
  { getAttraction }
)(AttractionScreen);


const styles = {

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
  },

  title: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: Fonts.MontSerratLight,
    marginVertical: 20,
  },
  galleryWrapper: {
    flex: 1,
  },
  bigImage: {
    height: 200,
    marginLeft: 10,
    marginRight: 10,
  },
  smallImagesWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  smallImage: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
  },
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

  description: {
    fontFamily: Fonts.MontSerratRegular,
    fontSize: 16,
    lineHeight: 20,
  },
  gallery: {
    background: 'black',
    marginTop: -100,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeIcon: {
    marginTop: 10,
    marginLeft: 10,
    zIndex: 100,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#35343D',
    transform: [{ scale: 0.6 }],
  }
}