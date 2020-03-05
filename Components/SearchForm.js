import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native';
import {grabMovieInformation,grabMoviePages} from '../Components/MovieApiRequest.js'
import Row from '../Components/Row'
import MovieScreen from '../Navigation/MovieScreen'


const APIKEY = "62c2af54";

export default class SearchForm extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Home',
    }
  }

  constructor(props){
    super(props);
    this.state = {userinput:'',
    ApiRequestMovies:[],
    pages:1,
    pageNumber: 2,
  SubmitButton:false,
  }
}

componentDidUpdate(){
  if(this.state.SubmitButton === true){
    this.onButtonPress(this.state.userinput)
  }
}

onButtonPress = async userinput => {
  const ApiMoviePages = await grabMoviePages(userinput)
  const ApiMovieResults = await grabMovieInformation(userinput,ApiMoviePages)
  this.setState({ApiRequestMovies:[...ApiMovieResults]})
  //pages:Math.ceil(ApiMovieResults[1]/10)})
}

handleSumbitButton (){
  this.setState({SubmitButton:true})
}

handleScrollData = () =>{ //this the same as placing this.handleScrollData.bind(this) in the constructor.
  if(this.state.ApiRequestMovies.length === 0 || this.state.pageNumber === 4){
    return
  }
  //finish this part bellow.
  if(this.state.pageNumber < 4){//use a return on fetch then just set the data and remove the try catch statement.
      var url = `http://www.omdbapi.com/?s=${this.state.userinput}&apikey=${APIKEY}&page=${this.state.pageNumber}`

      return fetch(url)
      .then((apiresponse) => apiresponse.json()) //transforms data from fetch into json.
      .then((jsonresponse) =>{

        const newmovielist = this.state.ApiRequestMovies.concat(jsonresponse.Search) //this combines the list of the old movies with the new movies list.

        this.setState((prevstate) => ({
          ApiRequestMovies:newmovielist,
          pageNumber:prevstate.pageNumber + 1,
          RefreshFlatList: true
        }))
      })
      .catch(error => console.error(error))
  }

}

listEmptyComponent = () =>  (
  <Text style={{textAlign: 'center', marginTop: 30}}>No results</Text>
)

handleSelectedMovie = (movie) =>{
  this.props.navigation.navigate('movie', movie)
}

    render() {
      return (
        <View style={styles.container}>

          <TextInput style = {styles.textinput} placeholder = "Search Movie" onChangeText={(userinput) => this.setState({userinput},this.setState({SubmitButton:false}))}/>

          <Button style = {styles.buttonstyling} title={"Search"} onPress = {this.handleSumbitButton.bind(this)}/>

          <ScrollView>
          <FlatList
          //extraData = {this.state.RefreshFlatList}
          //onEndReached = {() => this.handleScrollData()}
          keyExtractor = {(item, index) => index.toString()} //this allows us to get a unique index.
           data = {this.state.ApiRequestMovies}
           renderItem = {({ item }) => //this is specific the ({ item }) means to destructure the array, this gives us access to each item in the array.
            <Row {...item} onSelectMovie = {this.handleSelectedMovie}/>

           }/>
          </ScrollView>

        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
    },
  });
  