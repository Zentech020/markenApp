import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiemVubm9icnVpbnNtYSIsImEiOiJjanFxcms5ajYwNXFxNDhsajlob3Qxd2cxIn0.5WXfFyF1RWuwdC9cpSx0Kg');


const AttractionMap = ({ lat, lon }) => (
  <Fragment>
    <Mapbox.MapView
      styleURL={'mapbox://styles/zennobruinsma/cjqqrnaau8eey2snpdmjgxhx9'}
      zoomLevel={15}
      centerCoordinate={[lon, lat]}
      style={styles.mapContainer}
      zoomLevel={13}
      showUserLocation={true}>
    </Mapbox.MapView>
  </Fragment>
);


export default AttractionMap;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: 'black',
    height: 300,
  },
})