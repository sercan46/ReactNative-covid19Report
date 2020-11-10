import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import FlatListExample from './src/components/Flatlist';

let width = Dimensions.get('window').width;

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.textVie}
          source={require('./src/assets/covid.jpg')}
        />
        <View style={styles.viewStil}>
          <View style={[{width: width / 6}, styles.headerTitleContainer]}>
            <Text style={styles.textStil}>Kodu</Text>
          </View>
          <View style={[{width: (width / 6) * 2}, styles.headerTitleContainer]}>
            <Text style={styles.textStil}>Adı</Text>
          </View>
          <View style={[{width: width / 6}, styles.headerTitleContainer]}>
            <Text style={styles.textStil}>Vaka</Text>
          </View>
          <View style={[{width: width / 6}, styles.headerTitleContainer]}>
            <Text style={styles.textStil}>Ölüm</Text>
          </View>
          <View style={[{width: width / 6}, styles.headerTitleContainer]}>
            <Text style={styles.textStil}>Bölge</Text>
          </View>
        </View>
        <FlatListExample />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    height: 40,
    backgroundColor: '#5D4037',
    textAlign: 'right',
    justifyContent: 'center',
  },
  viewStil: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 40,
  },
  textVie: {
    width: width,
    flexDirection: 'row',
  },
  textStil: {
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    marginTop: 9,
    fontWeight: 'bold',
    color: 'white',
  },
});
