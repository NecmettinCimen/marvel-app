import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import {  Block, NavBar, theme } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import nowTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  renderSearch = () => {
    const { navigation, searchOnChange, searchPlaceholder } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder={searchPlaceholder}
        placeholderTextColor={'#8898AA'}
        onChangeText={searchOnChange}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" />
        }
      />
    );
  };

  renderHeader = () => {
    const { search, options } = this.props;
    if (search || options) {
      return <Block center>{search ? this.renderSearch() : null}</Block>;
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;


    return (
      <Block style={[{ backgroundColor: 'white' }, this.props.setShadow && styles.shadow]}>
        <NavBar title={title} transparent={transparent} titleStyle={[styles.title]} {...props} />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 10,
  },
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    color: nowTheme.COLORS.ACTIVE,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  navbar: {
    paddingVertical: 0,
    // paddingBottom: theme.SIZES.BASE * 1.5,
    // paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  options: {
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default withNavigation(Header);
