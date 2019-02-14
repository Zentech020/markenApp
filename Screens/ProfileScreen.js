import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Fragment, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import { setActiveLanguage } from '../actions';
import Share from 'react-native-share';
const ImagePicker = require("react-native-image-picker");


import { Fonts } from '../utils/Fonts';

import Avatar from '../assets/images/avatar.png';
import addImage from '../assets/images/addImage.png';
import ShareTwitter from '../assets/images/share_twitter.png';
import ShareInstagram from '../assets/images/share_instagram.png';
import ShareFacebook from '../assets/images/share_facebook.png';
import UkFlag from '../assets/images/uk_flag.png';
import GermanyFlag from '../assets/images/germany_flag.png';
import FranceFlag from '../assets/images/france_flag.png';
import ItalyFlag from '../assets/images/italy_flag.png';
import JapanFlag from '../assets/images/japan_flag.png';
import ChinaFlag from '../assets/images/china_flag.png';
import DutchFlag from '../assets/images/dutch_flag.png';


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

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


function mapDispatchToProps(dispatch) {
  return {
    setActiveLanguage: lang => dispatch(setActiveLanguage(lang))
  };
}



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
      avatarSource: null,
      avatarImageImplemented: false,
      laungageArray: [
        {
          lang: 'en-US',
          image: UkFlag,
        },
        {
          lang: 'nl',
          image: DutchFlag,
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
    this.props.setActiveLanguage(lang);
  }

  onChangeImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // const saveUserId = async () => {
        //   try {
        //     await AsyncStorage.setItem('profileImage', userId);
        //   } catch (error) {
        //     // Error retrieving data
        //     console.log(error.message);
        //   }
        // };
        this.setState({
          avatarSource: source,
          avatarImageImplemented: true,
        });
      }
    });
  }


  render() {
    const { language, share, laungageArray, activeLang, avatarSource, avatarImageImplemented } = this.state;
    if (avatarSource !== null) {
      console.log(avatarSource.uri);
    }

    return (
      <Grid>
        <Grid>
          <Row style={styles.header} size={35}>
            <View style={styles.profileWrapper}>
              <TouchableHighlight onPress={() => this.onChangeImage()}>
                {this.state.avatarSource === null ? (
                  <Text>Select a Photo</Text>
                ) : (
                    <Image source={this.state.avatarSource} style={styles.avatarImage} />
                  )}
              </TouchableHighlight>
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
                            style={this.props.activeLang === el.lang && styles.activeFlag}
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


function mapStateToProps(state) {
  return {
    activeLang: state.activeLang
  };
}


export default connect(mapStateToProps, mapDispatchToProps)
  (ProfileScreen);


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
  },
  avatarImage: {
    width: 100,
    height: 100,
  }
}