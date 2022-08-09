import {useState} from "react";

import noPosterFound from "../assets/No_Poster.jpg";
import LoadingCard from "../assets/LoadingCard.gif";

import styles from "./SingleComponent.module.css";

const SingleComponent = (props) => {

  const [loading, setLoading]=useState(true);

  return (
    <a href={`/${props.type}/${props.item.id}`} style={{textDecoration: 'none'}}>
        <div className={styles.card}>
            <img
                className="d-block w-100"
                src={props.item.poster_path?(loading?LoadingCard:`https://image.tmdb.org/t/p/original${props.item.poster_path}`):noPosterFound}
                alt={props.item.title?props.item.title:props.item.name}
                style={{opacity:"0.75"}}

                onLoad={()=>{setLoading(false)}}
            />
            <div className={styles.rating}>
                <b><i className="fa-solid fa-star"/>&nbsp;{props.item.vote_average}</b>
            </div>
            <h5 className={styles.title}><b>{props.item.title?props.item.title:props.item.name}</b></h5>
        </div>
    </a>
  )
}

export default SingleComponent