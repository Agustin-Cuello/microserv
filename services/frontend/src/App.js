import './App.css';
import Nav from "./components/Nav";
import Row from "./components/Row";
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Recomendaciones" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default App;