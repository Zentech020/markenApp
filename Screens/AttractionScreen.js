import React, { Component, Fragment } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableHighlight } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Slider } from 'react-native-elements';

import { connect } from 'react-redux';
import { getAttraction } from "../actions";



import { Fonts } from '../utils/Fonts';

Mapbox.setAccessToken('pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg');


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



  renderAnnotations() {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[5.0761, 52.4498]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    )
  }



  render() {
    const { galleryOpen, paused, duration, currentTime, value } = this.state;
    const { attraction, isLoading } = this.props;

    console.log('LOADING --- ', isLoading);

    if (attraction) {
      console.log(this.props.attraction.fields);
    }
    const { title, description, gallery, audio } = this.props.navigation.state.params.attraction.field;


    const PlayButton = () => (
      <TouchableHighlight onPress={() => this.setState({ paused: !paused })}>
        <Icon name="play_arrow" size={50} />
      </TouchableHighlight>
    )


    const PauseButton = () => (
      <TouchableHighlight onPress={() => this.setState({ paused: !paused })}>
        <Icon name="pause" size={50} />
      </TouchableHighlight>
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
              <Mapbox.MapView
                styleURL={'mapbox://styles/zennobruinsma/cjqqrnaau8eey2snpdmjgxhx9'}
                zoomLevel={15}
                centerCoordinate={[this.props.navigation.state.params.attraction.field.location.lon, this.props.navigation.state.params.attraction.field.location.lat]}
                style={styles.mapContainer}
                zoomLevel={13}
                showUserLocation={true}>
                {this.renderAnnotations()}
              </Mapbox.MapView>
              <View style={styles.container}>

                {attraction ? (
                  <Text style={styles.title}>{this.props.attraction.fields.title}</Text>
                ) : (null)}

                <View style={styles.galleryWrapper}>
                  {gallery.slice(0, 1).map((image, i) => {
                    return (
                      <Image
                        key={i}
                        style={styles.bigImage}
                        source={{ uri: `https:${image.fields.file.url}` }}
                        onPress={() => this.setState({ galleryOpen: true })}
                      />
                    )
                  })}

                  <View style={styles.smallImagesWrapper}>
                    {gallery.slice(1).map((image, i) => {
                      return (
                        <Image
                          key={i}
                          style={styles.smallImage}
                          source={{ uri: `https:${image.fields.file.url}` }}
                        />
                      )
                    })}

                    <Button title="open Gallery" onPress={() => this.setState({ galleryOpen: true })}></Button>
                  </View>
                </View>
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
                        />) : <Text>0</Text>}
                      </Col>
                    </Grid>
                  </View>
                </View>
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

  mapContainer: {
    flex: 1,
    backgroundColor: 'black',
    height: 300,
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