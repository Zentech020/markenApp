import React, { Component, Fragment } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableHighlight } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Fonts } from '../utils/Fonts';

Mapbox.setAccessToken('pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg');


class AttractionScreen extends Component {



  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.attraction.title,
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
    }
  }



  render() {
    const { galleryOpen, paused } = this.state;
    const { title } = this.props.navigation.state.params.attraction;
    console.log(paused);

    const PlayButton = () => (
      <TouchableHighlight onPress={() => this.setState({ paused: !paused })}>
        <Image
          source={require('../assets/images/play.png')}
          style={styles.playButton}
          onPress={() => this.setState({ paused: !paused })}
        />
      </TouchableHighlight>
    )


    const PauseButton = () => (
      <TouchableHighlight onPress={() => this.setState({ paused: !paused })}>
        <Image
          source={require('../assets/images/pause.png')}
          style={styles.playButton}
        />
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
              images={[
                { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
              ]}
            />
          </View>
        ) : (null)}
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.770]}
          style={styles.mapContainer}>
        </Mapbox.MapView>
        <View style={styles.container}>

          <Text style={styles.title}>{title}</Text>
          <View style={styles.galleryWrapper}>
            <Image
              style={styles.bigImage}
              source={{ uri: this.props.navigation.state.params.attraction.image }}
              onPress={() => this.setState({ galleryOpen: true })}
            />
            <View style={styles.smallImagesWrapper}>
              <Image
                style={styles.smallImage}
                source={{ uri: this.props.navigation.state.params.attraction.image }}
              />
              <Image
                style={styles.smallImage}
                source={{ uri: this.props.navigation.state.params.attraction.image }}
              />
              <Image
                style={styles.smallImage}
                source={{ uri: this.props.navigation.state.params.attraction.image }}
              />
              <Button title="open Gallery" onPress={() => this.setState({ galleryOpen: true })}></Button>
            </View>
          </View>
          <View style={styles.AudioWrapper}>
            <Text style={styles.audioTitle}>Listen</Text>
            <View style={styles.PlayWrapper}>
              {paused ? (
                <PlayButton />
              ) : (
                  <PauseButton />
                )
              }
              <View style={styles.progressBar}
              ></View>
            </View>
          </View>
          <Video source={{ uri: "http://www.largesound.com/ashborytour/sound/brobob.mp3" }}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            paused={paused}
            controls={true}                                 // Store reference
            onBuffer={this.onBuffer}
            onLoad={() => {
              this.setState({
                paused: false
              });
            }}           // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} />
          <View>
            <Text style={styles.description} >Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Nam commodo suscipit quam. Curabitur turpis. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default AttractionScreen;

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
  progressBar: {
    flex: 1,
    height: 30,
    backgroundColor: 'black',
  },
  description: {
    fontFamily: Fonts.MontSerratRegular,
    fontSize: 16,
    lineHeight: 20,
  },
  backgroundVideo: {
    height: 200,
  },
  gallery: {
    background: 'black',
    marginTop: -100,
  },
  closeIcon: {
    marginTop: 10,
    marginLeft: 10,
    zIndex: 100,
  }
}