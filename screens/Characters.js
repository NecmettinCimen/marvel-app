import React from "react";
import {
  StyleSheet, Dimensions,
  ScrollView, FlatList,
  View, ActivityIndicator
} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import { Header } from "../components";
import { characters } from "../services/characters";
const { width } = Dimensions.get("screen");

class Characters extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      page: 1,
      loading: false
    }
  }

  componentDidMount() {
    this.getItems();
  }
  getItems = async (name) => {
    const { list, page } = this.state;
    this.setState({ loading: true })

    // We are getting a few response data that's why get the response also so fast. This causes to state of the loading immeditately become false
    // That's why we can't see our loading indicator. To solve this problem we can use setTimeout to hold the setState not to trigger in order to see indicator for 2 seconds :)
    var data = await characters(page,name)

    setTimeout(() => {
      this.setState({
        list: page === 1 ? data.results : [...list, ...data.results],
        loading: false
      })
    }, 2000)
  }

  getMoreItems = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.getItems());
  };

  renderItems = ({ item }) => {

    var image = { uri: item.thumbnail.path + "/standard_amazing." + item.thumbnail.extension }
    return (
      <Card item={{
        title: item.name,
        image,
        cta: 'View article',
        horizontal: true
      }} horizontal />
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
        page: 1
      }, () => this.getItems(text));
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
