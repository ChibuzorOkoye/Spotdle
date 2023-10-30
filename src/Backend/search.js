import React, { Component } from 'react';
import {Container, InputGroup, FormControl, Button, Row, Card} from "react-bootstrap"
//import { useState,useEffect } from 'react';
import GetAccessToken from './getToken';
import axios from 'axios';

function SearchArtists() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <GetAccessToken>
  
            </GetAccessToken>
          </Container>
        </header>
      </div>
    );
  }
  
  export default SearchArtists;
  