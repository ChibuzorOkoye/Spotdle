import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

function GetAccessToken () {
 
 const token_url = 'https://accounts.spotify.com/api/token';
 //const [access_token, setAccessToken] = useState("");
//  const [genres, setGenres] = useState("")
//  const [artistList, setArtistList] = useState("");
 const [refreshToken, setRefreshToken] = useState("")
 const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Your client id
 const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your secret
 const data = {'grant_type':'client_credentials'}
 let access_token = '';
 let genreList ='';
 let artistList = [];
 useEffect (() =>{
    //API Calls
    getAuth();
    genreList = getGenres(access_token)
    
    const interval = setInterval(refreshAccessToken, 60 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
 },[refreshToken, access_token]); 

 const getAuth = async () =>{
    try {
        const res = await axios.post(token_url,data,{
            headers: {
                'Accept': 'application/json' ,
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            auth:{
                username: client_id,
                password: client_secret
            }
        });
        
         access_token = res.data.access_token
        setRefreshToken(res.data.refresh_token)
        getGenres(access_token)
        localStorage.setItem('refreshToken', res.data.refresh_token);
        
    } catch (error) {
        console.log(error.response);
    }
 } 

 const refreshAccessToken = async (refresh_token) => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const res = await axios.post(token_url, {
        grant_type: 'refresh_token',
        refresh_token,
      });
      setRefreshToken(res.data.refresh_token);
      localStorage.setItem('refreshToken', res.data.refresh_token);
    } catch (error) {
      console.log(error);
    }
  };


 const getGenres = async (access_token) => {
    if (!access_token) {
        console.log("The access token isn't present")
        return;
      }
    let limit = 10;
    let genre_url = `https://api.spotify.com/v1/browse/categories?limit=${limit}`; 
    //console.log(genre_url)
    try{
        
        const res = await axios.get(genre_url,
            {headers : { Authorization : `Bearer ${access_token}`}}
        );
        //console.log(res.data.categories.items[4])
        if(res.data.categories.items.length > 0)
            {   
                //console.log(res.data.categories.items)
                genreList = res.data.categories.items.map(genre => genre.name)
                //console.log(genreList)
                
                const artistPromise = genreList.map((genreNames) => getArtists(genreNames))
                artistList = await Promise.all(artistPromise);
                let sortedArtistLists = sortArtists(artistList)
                artistList = sortedArtistLists;
                

                
            } 
          
        }
        
    catch (error) {
        console.log(error.response)
    }
        console.log(artistList)
  };


  function sortArtists (list)
  {
    let sortArtists = list.filter((artists) => artists.length > 0)
                
       let newArtistsLists = sortArtists.filter((artists) => artists[5].genres != "workout product")
            //console.log(artistList) 
            //console.log(newArtistsLists)
            

            // for (let i = 0; i< newArtistsLists.length;i++)
            // {
            //     for (let j = 0; j < newArtistsLists[i].length;j++)
                        
            //             {
            //                 let unique_names = newArtistsLists[i][j].map((item) => item.age)
            //                 .filter(
            //                     (value, index, current_value) => current_value.indexOf(value) === index
            //                 );
                                
            //                 console.log(unique_names)
            //             }
            // }

            return newArtistsLists;
  }
  
  const getArtists = async (genres) => {
    //console.log(genres)
    if (!access_token || !genres) {
        console.log("The access token or the information on genres isn't present" )
        return;
      }
    // let limit = 10; 
    let artist_url = `https://api.spotify.com/v1/search?q=genre:${genres}&type=artist`
    
    try{
    const res = await axios.get(artist_url,
      {headers : { Authorization : `Bearer ${access_token}`},
  });
    //console.log(res.data.artists.items)
    return res.data.artists.items;
    }

    catch (error) {
        console.log(error.response)
    }


  };

  
const getAlbums = async () => {

}
 

const getTracks = async () => {

}

    return (
      <div>
        <p align = 'center'>{artistList} something should be here but it isnt</p>
      </div>
    );
  }

export default GetAccessToken;