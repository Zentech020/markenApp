import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Fragment, Dimensions, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Share from 'react-native-share';

import { Fonts } from '../utils/Fonts';

import Avatar from '../assets/images/avatar.png';
import ShareTwitter from '../assets/images/share_twitter.png';
import ShareInstagram from '../assets/images/share_instagram.png';
import ShareFacebook from '../assets/images/share_facebook.png';
import UkFlag from '../assets/images/uk_flag.png';
import GermanyFlag from '../assets/images/germany_flag.png';
import FranceFlag from '../assets/images/france_flag.png';
import ItalyFlag from '../assets/images/italy_flag.png';
import JapanFlag from '../assets/images/japan_flag.png';
import ChinaFlag from '../assets/images/china_flag.png';

var width = Dimensions.get('window').width;

const shareTwitter = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  social: Share.Social.TWITTER
};

const shareInstagram = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  social: Share.Social.INSTAGRAM
};

const shareFacebook = {
  title: 'Share via',
  message: 'some message',
  url: 'some share url',
  social: Share.Social.FACEBOOK
};




class ProfileScreen extends Component {

  static navigationOptions = {
    title: 'Profile',
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
      language: false,
      share: true,
      activeLang: '',
      laungageArray: [
        {
          lang: 'uk',
          image: UkFlag,
        },
        {
          lang: 'ger',
          image: GermanyFlag,
        },
        {
          lang: 'fr',
          image: FranceFlag,
        },
        {
          lang: 'it',
          image: ItalyFlag,
        },
        {
          lang: 'jp',
          image: JapanFlag,
        },
        {
          lang: 'ch',
          image: ChinaFlag,
        }
      ]
    }
  }

  shareTwitter = () => {
    Share.shareSingle(shareTwitter);
  }
  shareInstagram = () => {
    Share.shareSingle(shareInstagram);
  }
  shareFacebook = () => {
    Share.shareSingle(shareFacebook);
  }

  selectLanguage = (lang) => {
    this.setState({
      activeLang: lang,
    })
  }

  render() {
    const { language, share, laungageArray, activeLang } = this.state;
    console.log('active language', activeLang)
    const languageFlags = ({ flag }) => {
      const { activeLang } = this.state;
      if (activeLang == flag) {
        <Image
          source={el.image}
        />
      }
      else {
        <Image
          source={el.image}
        />
      }
    }
    return (
      <Grid>
        <Grid>
          <Row style={styles.header} size={35}>
            <View style={styles.profileWrapper}>
              <Image source={Avatar} />
              <Text style={styles.name}>Emmily Daniels</Text>
              <Text style={styles.language}>ENGLISH</Text>
            </View>
          </Row>
          <Row style={styles.tabChanger} size={10}>
            <View style={styles.tabs}>
              <View style={styles.tab}>
                <TouchableHighlight onPress={() => this.setState({ share: true, language: false })}>
                  <Text>Share</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.tab}>
                <TouchableHighlight onPress={() => this.setState({ language: true, share: false })}>
                  <Text>Language</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Row>
          <Row style={styles.languageSwitcher} size={55}>
            <View>
              {share ? (
                <Grid>
                  <Row size={30} style={styles.shareHeader}>
                    <Text style={styles.shareTitle}>Share</Text>
                    <Text style={styles.shareDescription}>Share this tour with your friends on the social media channels !</Text>
                  </Row>
                  <Row size={70} style={styles.buttonContainer}>
                    <TouchableHighlight
                      onPress={this.shareApp}
                      style={styles.socialImage}>
                      <Image source={ShareTwitter} />
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={this.shareInstagram}
                      style={styles.socialImage}>
                      <Image source={ShareInstagram} />
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={this.shareFacebook}
                      style={styles.socialImage}>
                      <Image source={ShareFacebook} />
                    </TouchableHighlight>
                  </Row>
                </Grid>
              ) : (null)}

              {language ? (
                <Grid>
                  <Row size={30} style={styles.shareHeader}>
                    <Text style={styles.shareTitle}>Select your language</Text>
                    <Text style={styles.shareDescription}>Sed aliquam ultrices mauris. Vivamus laoreet. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.</Text>
                  </Row>
                  <Row size={70} style={styles.languageContainer}>
                    {laungageArray.map((el, i) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.selectLanguage(el.lang)}
                          style={styles.languageFlag}
                          key={i}>
                          < Image
                            source={el.image}
                            style={this.state.activeLang === el.lang && styles.activeFlag}
                          />
                        </TouchableOpacity>
                      )
                    })}
                  </Row>
                </Grid>
              ) : (null)}
            </View>
          </Row>
        </Grid>
      </Grid>
    )
  }
}

export default ProfileScreen;

const styles = {
  header: {
    backgroundColor: 'white',
  },
  tabChanger: {
    backgroundColor: 'white',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomColor: '#47315a',
    borderBottomWidth: 1,
  },
  profileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.MontSerratRegular,
    marginTop: 20,
  },
  language: {
    fontSize: 12,
    fontFamily: Fonts.MontSerratLight,
    marginTop: 10,
  },
  languageSwitcher: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  shareTitle: {
    fontSize: 20,
    fontFamily: Fonts.MontSerratBold,
    justifyContent: 'center',
    textAlign: 'center',
  },
  shareDescription: {
    fontSize: 16,
    fontFamily: Fonts.MontSerratRegular,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  shareHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialImage: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  languageFlag: {
    width: width * 0.25,
    alignItems: 'center',
    paddingTop: 40,
  },
  activeFlag: {
    borderColor: '#158ACC',
    borderWidth: 4,
    borderRadius: 20,
  }
}