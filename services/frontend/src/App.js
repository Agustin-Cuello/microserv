import './App.css';
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import UnaPelicula from "./components/UnaPelicula";
import requests from "./requests";
import Comentario from './components/Comentario';


function App() {
  return (
    <div className="App">
      <Nav />
      <Banner /> 
      <Row title="Películas para ver" fetchUrl={requests.fetchTrending} />
      <Row title="Recomendaciones" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default App;
