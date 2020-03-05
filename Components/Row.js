import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image,View} from 'react-native';

// const styles = StyleSheet.create({
//     row: {padding: 20},
//   })
  
  const Row = props => (
    <View>
        <TouchableOpacity onPress = {() => props.onSelectMovie(props)} style = {styles.touchableButton}>
        {/* <TouchableOpacity onPress = {() => props.onSelectMovie("hello")}> */}
        <Image style={{width: 90, height: 90}} source={{uri: props.Poster}}/>
        <View style = {styles.centerview}>
      <Text style = {styles.movieTitle}>{props.Title}</Text>
      <Text>{props.Year}</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
  

  const styles = StyleSheet.create({
    movieTitle:{
      fontSize:15,
      fontWeight:"bold",
      textAlign:"center",
      paddingRight:10,
    },
    touchableButton:{
      borderWidth: 1,
      borderRadius:2,
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
    },
    centerview:{
    }
  });
  


  export default Row