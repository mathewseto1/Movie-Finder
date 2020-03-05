import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const APIKEY = "62c2af54";

// export const grabMovieInformation = async movieinputs =>{ //we return the fetch callback instead of the value of then.
//   var url = `http://www.omdbapi.com/?s=${movieinputs}&apikey=${APIKEY}`
//   try{
//   const ApiResponse = await fetch(url)
//   const {Search} = await ApiResponse.json();//this is destructuring a Search array of the response.json then storing it in a search variable.
//   return (Search)//change this to use a then inorder to grab the ApiResponse.json() inorder to grab the page amount
//   }

//   catch(error){
//       console.log(error);
//   }
// }

// export const grabMovieInformation = async movieinputs =>{ //we return the fetch callback instead of the value of then. //this is the newest one that I dumped before.
//   var url = `http://www.omdbapi.com/?s=${movieinputs}&apikey=${APIKEY}`
//   //var url = `http://www.omdbapi.com/?s=${this.state.userinput}&apikey=${APIKEY}&page=${this.state.pageNumber}`
//   try{
//   const ApiResponse = await fetch(url)
//   const something = await ApiResponse.json();
//   const {Search} = something
//   const totalNumber = something.totalResults
//   return([Search,totalNumber])
//   // return (Search)//change this to use a then inorder to grab the ApiResponse.json() inorder to grab the page amount
//   }

//   catch(error){
//       console.log(error);
//   }
// }


export const grabMoviePages = async movieinputs =>{ //we return the fetch callback instead of the value of then.
  try{
    
    var url = `http://www.omdbapi.com/?s=${movieinputs}&apikey=${APIKEY}`
      const GrabApi = await fetch(url)
      const TheApiJson = await GrabApi.json();
      const totalNumber = TheApiJson.totalResults
      var NumberOfPages = Math.ceil(totalNumber/10)
      return(NumberOfPages)
    }
  

  catch(error){
      console.log(error);
  }
}

export const grabMovieInformation = async (MovieInputs,NumberOfPages) =>{ //we return the fetch callback instead of the value of then. //this is the newest one that I dumped before.
  var JsonToReturn = [];
  try{
  for(pagenum = 1; pagenum <= NumberOfPages; pagenum++){
  var url = `http://www.omdbapi.com/?s=${MovieInputs}&apikey=${APIKEY}&page=${pagenum}`
  const ApiResponse = await fetch(url)
  const something = await ApiResponse.json();
  JsonToReturn = [...JsonToReturn, ...something.Search]

  
  }
  return JsonToReturn
}

  catch(error){
      console.log(error);
  }
}
