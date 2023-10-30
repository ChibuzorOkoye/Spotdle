import logo from './logo.svg';
import './App.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from "react-bootstrap"
import SearchArtists from './Backend/search';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>This App is running currently</h1>
          <SearchArtists>

          </SearchArtists>
        </Container>
      </header>
    </div>
  );
}

export default App;
