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
        {props.type!=="home" && <Header type="movies"/>}

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">NOW PLAYING</Badge>
          <Button variant="outline-primary" href="/movies/now_playing">LOAD MORE</Button>
        </h3>        
        <CardCarousel type="movies" items={items1} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">UPCOMING</Badge>
          <Button variant="outline-primary" href="/movies/upcoming">LOAD MORE</Button>
        </h3>
        <CardCarousel type="movies" items={items2} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TRENDING</Badge>
          <Button variant="outline-primary" href="/movies/trending">LOAD MORE</Button>
        </h3>
        <CardCarousel type="movies" items={items3} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">POPULAR</Badge>
          <Button variant="outline-primary" href="/movies/popular">LOAD MORE</Button>
        </h3>
        <CardCarousel type="movies" items={items4} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TOP-RATED</Badge>
          <Button variant="outline-primary" href="/movies/top_rated">LOAD MORE</Button>
        </h3>
        <CardCarousel type="movies" items={items5} />
    </>
  )
}

export default Movies