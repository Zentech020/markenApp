import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { Fonts } from '../utils/Fonts';


const AttractionCard = ({ title, description, image, place, onPress }) => (
  <TouchableOpacity onPress={onPress} >
    <View style={styles.card}>
      <Image
        style={{
          flex: 3,
          height: 150,
        }}
        source={{ uri: `https:${image}` }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.par}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


export default AttractionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 20,
    alignItems: 'stretch',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  content: {
    paddingTop: 20,
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.MontSerratRegular,
  },
  par: {
    fontSize: 12,
    opacity: 0.7,
    paddingRight: 20,
    fontFamily: Fonts.MontSerratLight,
  }
})