import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'


import { Fonts } from '../utils/Fonts';

class HomeScreen extends Component {


  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#158ACC',
      height: 40,
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerTruncatedBackTitle: 'Nah',
  }

  onPress = (attraction) => {
    console.log(attraction);
    this.props.navigation.push('Attraction', { attraction });
  }

  render() {
    const attractions = [{
      title: 'Rederij Volendam Marken Express',
      par: 'Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      image: 'https://www.anwb.nl/landvananwb/images/Uitjes/thumb_620x349_195345.jpg'
    },
    {
      title: 'Gouwzee',
      par: 'Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/c9/06/14/strand-van-volendam-aan.jpg'
    },
    {
      title: 'place Three',
      par: 'Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'place Four',
      par: 'Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      image: 'https://via.placeholder.com/150'
    }
    ]


    return (
      <ScrollView
        contentContainerStyle={styles.container}>
        {attractions.map((item, i) => {
          return (
            <TouchableOpacity onPress={() => this.onPress(item)} key={i}>
              <View style={styles.card}>
                <Image
                  style={{
                    flex: 3,
                    height: 150,
                  }}
                  source={{ uri: item.image }}
                />
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.par}>{item.par}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
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


