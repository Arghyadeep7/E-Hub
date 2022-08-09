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
        {props.type!=="home" && <Header type="web_series"/>}

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary"><h6>TRENDING</h6></Badge>
          <Button variant="outline-primary" href="/web_series/trending">LOAD MORE</Button>
        </div>
        <CardCarousel type="web_series" items={items1} />

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary"><h6>POPULAR</h6></Badge>
          <Button variant="outline-primary" href="/web_series/popular">LOAD MORE</Button>
        </div>
        <CardCarousel type="web_series" items={items2} />

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Badge bg="primary"><h6>TOP-RATED</h6></Badge>
          <Button variant="outline-primary" href="/web_series/top_rated">LOAD MORE</Button>
        </div>
        <CardCarousel type="web_series" items={items3} />
    </>
  )
}

export default TvSeries