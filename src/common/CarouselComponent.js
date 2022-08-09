import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

import LoadingLandscape from "../assets/LoadingLandscape.gif";
import noImageFound from "../assets/No_Image.png";
import noPictureFound from "../assets/No_Picture.jpg";
import LoadingCard from "../assets/LoadingCard.gif";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import SingleComponent from "./SingleComponent";

export const ImageCarousel = (props) => {

  const [loading, setLoading]=useState(true);

  if(props.items.length===0){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={noImageFound} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  if(props.items.length === 1){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={props.items[0].file_path?(loading?LoadingLandscape:`https://image.tmdb.org/t/p/original${props.items[0].file_path}`):noImageFound} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  
  return (
    <Carousel> 
      {
        props.items.map((item)=>(
            <Carousel.Item key={item.file_path} style={{position: 'relative', border:"2px solid white"}}>
              <img
                  className="d-block w-100"
                  src={item.file_path?(loading?LoadingLandscape:`https://image.tmdb.org/t/p/original${item.file_path}`):noImageFound}
                  alt={item.file_path}

                  onLoad={()=>{setLoading(false)}}
              />
            </Carousel.Item>
        ))
      }
    </Carousel>
  )
};


export const CardCarousel = (props) => {

  const items = props.items.map((item) => (
    <div style={{display: "flex", flexDirection: "column", objectFit: "contain", padding: "10px"}}>
      <SingleComponent item={item} type={props.type}/>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
        mouseTracking
        disableDotsControls
        autoPlay={true}
        autoPlayInterval={2000}
        responsive={responsive}
        keyboardNavigation={true}
        touchTracking={true}
        items={items}
        renderPrevButton={() => {
            return <i class="fas fa-chevron-circle-left fa-3x" style={{cursor: 'pointer'}}></i>
        }}
        renderNextButton={() => {
            return <i class="fas fa-chevron-circle-right fa-3x" style={{cursor: 'pointer'}}></i>
        }}
    />
  );
};


const handleDragStart = (event) => event.preventDefault();

export const CastCarousel = (props) => {

  const [loading, setLoading]=useState(true);

  const items = props.cast.map((actor) => (
    <div style={{display: "flex", flexDirection: "column", objectFit: "contain", padding: "10px"}}>
      <img 
        src={actor.profile_path?(loading?LoadingCard:`https://image.tmdb.org/t/p/original${actor.profile_path}`):noPictureFound}
        alt={actor.name}
        onDragStart={handleDragStart}
        style={{borderRadius:"10px", maxHeight:'175px', maxWidth:"150px"}}

        onLoad={()=>{setLoading(false)}}
      />
      {actor.name && <b style={{paddingTop:"5px"}}>{actor.name}</b>}
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 8,
    },
  };

  return (
    <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        autoPlay={true}
        autoPlayInterval={1000}
        responsive={responsive}
        items={items}
    />
  );
};