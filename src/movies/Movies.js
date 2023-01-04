import { Link } from "react-router-dom";

import axios from "axios";
import {useEffect, useState} from 'react';

import Header from '../common/Header';
import {CardCarousel} from '../common/CarouselComponent';

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const Movies = (props) => {
  const [items1,setItems1]=useState([]);
  const [items2,setItems2]=useState([]);
  const [items3,setItems3]=useState([]);
  const [items4,setItems4]=useState([]);
  const [items5,setItems5]=useState([]);

  const fetch=async ()=>{
    
    const data1=await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems1(data1.results);

    const data2=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems2(data2.results);

    const data3=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems3(data3.results);

    const data4=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems4(data4.results);

    const data5=await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems5(data5.results);
  }

  useEffect(()=>{
    fetch();
  },[]);

  return (
    <>
        <Header />
        <Badge bg="secondary" style={{margin:"10px auto", width:"100%", textAlign: "center"}}><h3>MOVIES</h3></Badge>
        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">NOW PLAYING</Badge>
          <Link to="/movies/now_playing" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>        
        <CardCarousel type="movies" items={items1} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">UPCOMING</Badge>
          <Link to="/movies/upcoming" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="movies" items={items2} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TRENDING</Badge>
          <Link to="/movies/trending" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="movies" items={items3} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">POPULAR</Badge>
          <Link to="/movies/popular" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="movies" items={items4} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TOP-RATED</Badge>
          <Link to="/movies/top_rated" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="movies" items={items5} />
    </>
  )
}

export default Movies