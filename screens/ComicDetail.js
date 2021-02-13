import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Linking, ActivityIndicator, View } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button, CharacterDetailComics } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { withNavigation } from '@react-navigation/compat';
import { comicsdetailcharacter } from '../services/comics';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class ComicDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null,
      loadingcharacters: true,
      params: props.route.params
    }
  }

  componentDidMount() {
    this.getDetail()
  }

  async getDetail() {
    const { id } = this.state.params
    if (this.scroll)
      this.scroll.scrollTo({ y: 0 })
      
    this.setState({ loading: true })
    var characters = await comicsdetailcharacter(id)
    this.setState({ characters: characters.results, loadingcharacters: false })
  }

  render() {
    if (this.state.params != this.props.route.params) {
      this.setState({ params: this.props.route.params })
      this.getDetail()
    }
    const { params, loadingcharacters, characters } = this.state
    const {
      image,
      title,
    } = params

    return (
      <ScrollView
        ref={(node) => this.scroll = node}
      >
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block flex style={{ width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block middle style={{ top: height * 0.15 }}>
                <Image source={image} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.2 }}>
                <Block middle >
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26
                    }}
                    color='#ffffff'
                  >
                    {title}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,
                      fontFamily: 'montserrat-bold',
                      lineHeight: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      opacity: .8
                    }}
                  >
                    {params.pageCount} Sayfa
                  </Text>
                </Block>
              </Block>

            </Block>
            <Block
              flex
              middle
              row
              style={{ width: width, zIndex: 99 }}
            >
              <Button
                onPress={() => Linking.openURL(
                  params.urls.find(f => f.type == 'detail').url
                )}
                style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                Marvel Profili
              </Button>
              <GaButton
                round
                onlyIcon
                shadowless
                onPress={() => { this.scroll.scrollTo({ y: height }) }}
                icon="arrow-down"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </ImageBackground>


        {loadingcharacters ? <Block flex ><ActivityIndicator size="large" color={nowTheme.COLORS.ACTIVE} /></Block> : <Block flex style={{ marginTop: 20 }}>
          <Block middle>
            <Text
              style={{
                color: '#2c2c2c',
                fontWeight: 'bold',
                fontSize: 19,
                fontFamily: 'montserrat-bold',
                marginTop: 15,
                marginBottom: 30,
                zIndex: 2
              }}
            >
              Hakkında
                  </Text>
            <Text
              size={16}
              muted
              style={{
                textAlign: 'center',
                fontFamily: 'montserrat-regular',
                zIndex: 2,
                lineHeight: 25,
                color: '#9A9A9A',
                paddingHorizontal: 15
              }}
            >
              {params.description}
            </Text>
          </Block>
          <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
            <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
              Yazarlar
                  </Text>

          </Block>
          <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
            <Block>
              {
                params.creators.items.map((item, i) => (
                  <View key={i} style={{ padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
                    <Text>{item.name + " / " + item.role}</Text>
                  </View>
                ))
              }
            </Block>
          </Block>

          <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
            <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
              Karakterler
                  </Text>

          </Block>


          <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
            <Block>
              {
                loadingcharacters ? null : characters.map((item, i) => (
                  <CharacterDetailComics key={item.id}
                    item={{
                      id: item.id,
                      title: item.name,
                      image: { uri: item.thumbnail.path + "/landscape_incredible." + item.thumbnail.extension },
                      cta: 'Karakter Detayları',
                      ...item
                    }} full ctaRight detailPage='CharacterDetail'

                  />
                ))
              }
            </Block>
          </Block>
        </Block>}
      </ScrollView>

    )
  }
}





const styles = StyleSheet.create({

  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  }
});

export default withNavigation(ComicDetail);
