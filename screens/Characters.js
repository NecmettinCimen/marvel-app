import React from "react";
import {
  StyleSheet, Dimensions,
  ScrollView, FlatList,
  View, ActivityIndicator
} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { CharacterItem } from "../components";
import { Header } from "../components";
import { characters } from "../services/characters";
const { width } = Dimensions.get("screen");

class Characters extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      page: 0,
      loading: false,
      search: ''
    }
  }

  componentDidMount() {
    this.getItems();
  }
  getItems = async () => {
    const { list, page, search } = this.state;
    this.setState({ loading: true })

    // We are getting a few response data that's why get the response also so fast. This causes to state of the loading immeditately become false
    // That's why we can't see our loading indicator. To solve this problem we can use setTimeout to hold the setState not to trigger in order to see indicator for 2 seconds :)
    var data = await characters(page, search)

      this.setState({
        list: page === 0 ? data.results : [...list, ...data.results],
        loading: false
      })
  }

  getMoreItems = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.getItems());
  };

  renderItems = ({ item }) => {

    var image = { uri: item.thumbnail.path + "/landscape_incredible." + item.thumbnail.extension }
    return (
      <CharacterItem item={{
        id:item.id,
        title: item.name,
        image,
        cta: 'Karakter Detayları',
        ...item
      }} full ctaRight detailPage='CharacterDetail' />
    );
  };
  footerIndicator = () => {
    return this.state.loading ? (
      <View
        style={{
          padding: 20,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null
  };

  searchOnChange = (text) => {
    if (text.length > 2)
      this.setState({
        page: 0,
        search: text
      }, () => this.getItems());
  }

  render() {
    return (
      <Block flex>
        <Header
          title="Karakterler"
          search
          searchOnChange={this.searchOnChange}
        />

        <Block flex center style={styles.home}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}
            data={this.state.list}
            renderItem={this.renderItems}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.getMoreItems}
            ListFooterComponent={this.footerIndicator}
            onEndReachedThreshold={0.5}
          />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default Characters;
