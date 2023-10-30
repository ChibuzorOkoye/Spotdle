import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

function GetAccessToken () {
 let search_url =''; 
 let token_url = 'https://accounts.spotify.com/api/token';
 //const [input, setInput] = useState("");
 const [access_token, setAccessToken] = useState("");
 const [artistID, setArtistID] = useState("");
 const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Your client id
 const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your secret
 //console.log(client_secret)
 const data = {'grant_type':'client_credentials'}
 //const auth_token = (`${client_id}: ${client_secret}`)
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
        //console.log(res.data.access_token)
        return res.data.access_token
        
        //const data = response.data
    } catch (error) {
        console.log(error.response);
    }
 } 


 const getsearch = async () =>{
    try {
        const res = await axios.get(search_url,{
            headers: {
                'Authorization' : `Bearer ${access_token}`
            },

        });
        //console.log(res.data.access_token)
        return res.data
        
        //const data = response.data
    } catch (error) {
        console.log(error.response);
    }
 } 



 useEffect (() =>{
    //API Calls
    setAccessToken(getAuth());
    setArtistID();
 },[]);
 //console.log(access_token)

    return (
      <div>
        
      </div>
    );
  }

export default GetAccessToken;