import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator
} from "react-native";
import { Block, theme } from "galio-framework";

import { ListItem } from "../components";
import { Header } from "../components";
import { nowTheme } from "../constants";
const { width } = Dimensions.get("screen");

class ListScreen extends React.Component {
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
    const { getData } = this.props
    this.setState({ loading: true })

    var data = await getData(page, search)

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
    const { calcRenderItemData, detailPage } = this.props
    return (
      <ListItem item={calcRenderItemData(item)} full ctaRight detailPage={detailPage} />
    );
  };
  footerIndicator = () => {
    return this.state.loading ? (
      <View
        style={{
          padding: 20,
        }}>
        <ActivityIndicator animating size="large" color={nowTheme.COLORS.ACTIVE} />
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
    const { title, searchPlaceholder } = this.props

    return (
      <Block flex>
        <Header
          title={title}
          search
          searchPlaceholder={searchPlaceholder}
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

export default ListScreen;
