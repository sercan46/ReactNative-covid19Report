import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import axios from 'axios';
let width = Dimensions.get('window').width;

export default class FlatListExample extends Component {
  state = {
    text: '',
    contacts: [],
    allContacts: [],
    loading: true,
  };
  componentDidMount() {
    this.getContacts();
  }
  getContacts = async () => {
    const {
      data: {locations: contacts},
    } = await axios.get('http://covid19api.xapix.io/v2/locations');
    this.setState({
      contacts,
      allContacts: contacts,
      loading: false,
    });
  };

  renderContactsItem = ({item, index}) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: width,
          flex: 1,
          flexDirection: 'row',
          backgroundColor: item.latest.deaths > 50 ? 'darkred' : 'black',
        }}>
        <View style={[{width: width / 6}, styles.headerTitleContainer]}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              flex: 1,
              marginTop: 9,
              color: 'white',
              borderBottomWidth: 1,
              borderColor: '#B388FF',
            }}>
            {item.country_code}
          </Text>
        </View>
        <View style={[{width: (width / 6) * 2}, styles.headerTitleContainer]}>
          <Text style={styles.textStil}>{item.country}</Text>
        </View>
        <View style={[{width: width / 6}, styles.headerTitleContainer]}>
          <Text style={styles.vakatextStil}>{item.latest.confirmed}</Text>
        </View>
        <View style={[{width: width / 6}, styles.headerTitleContainer]}>
          <Text style={styles.deathtextStil}>{item.latest.deaths}</Text>
        </View>
        <View style={[{width: width / 6}, styles.headerTitleContainer]}>
          <Text style={styles.textStil}>
            {item.province ? item.province : '-'}
          </Text>
        </View>
      </View>
    );
  };

  searchFilter = text => {
    const newData = this.state.allContacts.filter(item => {
      const listItem = `${item.country_code.toLowerCase()} ${item.country.toLowerCase()} ${item.province.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      contacts: newData,
    });
  };

  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={text => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>
    );
  };
  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  render() {
    return (
      <FlatList
        ListFooterComponent={this.renderFooter()}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderContactsItem}
        keyExtractor={item => item.id}
        data={this.state.contacts}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },

  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  headerTitleContainer: {
    height: 70,
    textAlign: 'right',
    marginTop: 22,
  },
  textStil: {
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Open Sans',
    marginTop: 9,
    borderColor: '#B388FF',
    color: 'white',
    borderBottomWidth: 1,
  },
  vakatextStil: {
    fontSize: 15,
    textAlign: 'center',
    flex: 1,
    marginTop: 9,
    borderColor: '#B388FF',
    color: '#FFD600',
    borderBottomWidth: 1,
  },
  deathtextStil: {
    fontSize: 15,
    textAlign: 'center',
    flex: 1,
    marginTop: 9,
    borderColor: '#B388FF',
    color: '#FF0000',
    borderBottomWidth: 1,
  },
});
