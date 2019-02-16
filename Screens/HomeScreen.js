import React, { Component, Fragment } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';
import { getAttractions, setActiveLanguage } from "../actions";
import { AttractionCard } from '../components';



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

  constructor(props) {
    super(props);

    this.state = {
      places: [],
    }
  }

  componentDidMount() {
    const { activeLang } = this.props;
    this.props.getAttractions(activeLang);
  }



  componentWillReceiveProps(nextProps) {
    const { activeLang } = this.props;

    if (JSON.stringify(this.props.activeLang) == JSON.stringify(nextProps.activeLang)) // Check if it's a new user, you can also use some unique property, like the ID
    {
      this.props.getAttractions(activeLang);
    }
  }

  onPress = (attraction) => {
    this.props.navigation.push('Attraction', { attraction });
  }

  render() {
    const { places } = this.state;
    const { attractions, activeLang } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}>
        {attractions ? (
          <Fragment>
            {attractions.map((place, i) => {
              return (
                <AttractionCard
                  title={place.field.title}
                  description={place.field.description}
                  image={place.field.gallery[0].fields.file.url}
                  onPress={() => this.onPress(place)}
                  key={i} />
              )
            })}
          </Fragment>
        ) : (<Text>Loading</Text>)}

      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    attractions: state.attractions,
    activeLang: state.activeLang
  };
}

export default connect(
  mapStateToProps,
  { getAttractions, setActiveLanguage }
)(HomeScreen);


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


