import Movies from '../movies/Movies';
import TvSeries from '../tvSeries/TvSeries';

import Header from './Header';

import Badge from "react-bootstrap/Badge";

const Home = () => {

  return (
    <>
        <Header home="TRUE"/>
        <Badge bg="secondary" style={{margin:"10px auto", width:"100%", textAlign: "center"}}><h3>MOVIES</h3></Badge>
        <Movies type="home"/>

        <Badge bg="secondary" style={{margin:"15px auto", width:"100%", textAlign: "center"}}><h3>WEB SERIES</h3></Badge>
        <TvSeries type="home" />
    </>
  )
}

export default Home