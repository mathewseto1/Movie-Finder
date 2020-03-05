import React from 'react';
import {StyleSheet, Text, Image,View, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
  
export default class SearchForm extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.state.params.Title
    }
  }
  constructor(props){
    super(props);
    this.state = {
      ApiData:{},
      temp:[]
    }
  }

  componentDidMount(){
    this.GrabAPIData();
  }

  GrabAPIData(){
    const url = `https://www.omdbapi.com/?apikey=62c2af54&i=${this.props.navigation.state.params.imdbID}&plot=short`
    
    return fetch(url)
    .then((apiresponse) => apiresponse.json()) //transforms data from fetch into json.
    .then((jsonresponse) =>{

      this.setState({ApiData:jsonresponse})
    })
    .catch(error => console.error(error))
  }


  render() {
    const name = this.props.navigation.getParam('Title');
    // if(Object.keys(this.state.ApiData).length > 0){
    //   console.log(this.state.ApiData.Ratings[2].Value)
    // }
    // if (this.state.ApiData.length > 0){
    //   console.log(this.state.ApiData.Ratings[0])
    // }
    
    // this.setState({temp:[{...this.state.ApiData.Ratings}]})

    return (
        <ScrollView >
        <View style = {styles.view}>

          
          <Image style={{width:300, height: 400}} source={{uri: this.state.ApiData.Poster}} />

          <View style ={styles.flexrow}>
          <Text style = {styles.movietitle}>{name}</Text>
          <Text style = {styles.movieyear}>({this.state.ApiData.Year})</Text>
          </View>
          
          <View style ={styles.evenflexrow}>
          <Text style = {styles.textspace}>Age Restriction: {this.state.ApiData.Rated}</Text>
          
          <Text style = {styles.textspace}>Runtime: {this.state.ApiData.Runtime}</Text>
          </View>
          
          <Text style = {styles.plot}>{this.state.ApiData.Plot}</Text>
          
          <FlatList
          keyExtractor = {(item, index) => index.toString()} //this allows us to get a unique index.
           data = {this.state.ApiData.Ratings}
            renderItem = {({ item }) => <View><Text style = {styles.Ratings}>{item.Source} {item.Value}</Text></View>}
          /> 
        </View>
        </ScrollView>

      
    )
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
        marginTop: 20,
    },
    view: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    movietitle:{
      fontWeight: 'bold',
      fontSize:20,
      paddingRight:4
    },
    flexrow:{
      flex:1,
      flexDirection:'row',
      paddingTop:20,
      paddingBottom:8
    },
    movieyear:{
      paddingTop:5
    },
    evenflexrow:{
      flex:1,
      flexDirection:'row',
      paddingBottom:8,
    },
    textspace:{
      paddingRight:13,
      fontSize:14
    },
    plot:{
      textAlign:"center",
      fontSize:16,
      paddingTop:25,
      paddingBottom:20
    },
    Ratings:{
      fontSize: 15,
      paddingTop: 20,
      textAlign:"center"
    }

  });
  