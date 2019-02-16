import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';

const AttractionGallery = ({ gallery, onPress, image }) => (
  <Fragment>

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
        <Button title="open Gallery" onPress={onPress}></Button>
      </View>
    </View>
  </Fragment>
);


export default AttractionGallery;

const styles = StyleSheet.create({
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
})
