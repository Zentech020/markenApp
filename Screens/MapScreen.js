import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import StoreLocatorKit from '@mapbox/store-locator-react-native';

import reallyCoolIcon from '../assets/images/pause.png';
import { places } from '../utils/Places';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg';



export const theme = new StoreLocatorKit.Theme({
  icon: reallyCoolIcon,
  activeIcon: reallyCoolIcon,
  styleURL: MapboxGL.StyleURL.Light,
  primaryColor: `#A35BCD`,
  primaryDarkColor: '#5D39BA',
  directionsLineColor: '#987DDF',
  cardIcon: reallyCoolIcon,
  cardTextColor: '#6A159B',
  accentColor: '#C7A8D9',
});



class MapScreen extends Component {

  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: '#16a085',
      height: 30,
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerTruncatedBackTitle: 'Nah',
  }

  constructor(props) {
    super(props);

    this.state = {
      initialLocation: [77.034084142948, 38.939671288923],
    }
  }

  async componentWillMount() {
    MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
  }


  render() {

    return (
      <View style={styles.container}>
        <StoreLocatorKit.MapView
          simulateUserLocation
          accessToken={'pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg'}
          theme={theme}
          centerCoordinate={this.state.initialLocation}
          featureCollection={places}
          zoomLevel={13}
          style={styles.matchParent} />
      </View>
    )
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  }
})