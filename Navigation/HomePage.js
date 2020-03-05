import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchForm from '../Components/SearchForm.js';

export default class HomePage extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <SearchForm/>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  