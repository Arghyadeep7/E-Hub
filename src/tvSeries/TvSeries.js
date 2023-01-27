import {Link} from "react-router-dom";

import axios from "axios";
import {useEffect, useState} from 'react';

import Header from '../common/Header';
import {CardCarousel} from '../common/CarouselComponent';

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const TvSeries = (props) => {

  const [items1,setItems1]=useState([]);
  const [items2,setItems2]=useState([]);
  const [items3,setItems3]=useState([]);

  const fetch=async ()=>{

    const data1=await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems1(data1.results);

    const data2=await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems2(data2.results);

    const data3=await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.data);

    setItems3(data3.results);

  }

  useEffect(()=>{
    fetch();
  },[]);

  return (
    <>
        {!props.path && <Header />}
        <Badge bg="secondary" style={{margin:"10px auto", width:"100%", textAlign: "center"}}><h3>TV/WEB SERIES</h3></Badge>
        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TRENDING</Badge>
          <Link to="/web_series/trending" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="web_series" items={items1} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">POPULAR</Badge>
          <Link to="/web_series/popular" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="web_series" items={items2} />

        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary">TOP-RATED</Badge>
          <Link to="/web_series/top_rated" style={{textDecoration:"none"}}>
            <Button variant="outline-primary">
              LOAD MORE
            </Button>
          </Link>
        </h3>
        <CardCarousel type="web_series" items={items3} />
    </>
  )
}

export default TvSeries