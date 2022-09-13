import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';

import Header from "./Header";
import List from '../common/List';

const SearchQuery = () => {

    const [selected,setSelected]=useState(true);

    const [movies, setMovies]= useState([]);
    const [countMovies, setCountMovies]= useState(1);
    const [loadingMovies, setLoadingMovies]=useState(false);
    const [total_pagesMovies, setTotalPagesMovies]= useState(1);
    const [total_resultsMovies, setTotalResultsMovies]= useState(0);

    const [tvSeries, setTvSeries]= useState([]);
    const [countTvSeries, setCountTvSeries]= useState(1);
    const [loadingTvSeries, setLoadingTvSeries]=useState(false);
    const [total_pagesTvSeries, setTotalPagesTvSeries]= useState(1);
    const [total_resultsTvSeries, setTotalResultsTvSeries]= useState(0);

    const { query } =useParams();

    const clickhandler=()=>{
        setSelected(!selected);
    }

    const nextPageMoviesHandler=()=>{
        window.scrollTo(0,0);
        setCountMovies(countMovies+1);
    }
    
    const previousPageMoviesHandler=()=>{
        window.scrollTo(0,0);
        setCountMovies(countMovies-1);
    };

    const fetchSearchMovies=async ()=>{

        setLoadingMovies(true);
        
        const searchData=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&page=${countMovies}&query=${query}`)
        .then(res => res.json());

        setMovies(searchData.results);

        setTotalPagesMovies(searchData.total_pages);

        setTotalResultsMovies(searchData.total_results);

        setLoadingMovies(false); 

    };

    const nextPageTvSeriesHandler=()=>{
        window.scrollTo(0,0);
        setCountTvSeries(countTvSeries+1);
    }
    
    const previousPageTvSeriesHandler=()=>{
        window.scrollTo(0,0);
        setCountTvSeries(countTvSeries-1);
    };


    const fetchSearchTvSeries=async ()=>{

        setLoadingTvSeries(true);
        
        const searchData=await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&page=${countTvSeries}&query=${query}`)
        .then(res => res.json());

        setTvSeries(searchData.results);

        setTotalPagesTvSeries(searchData.total_pages);

        setTotalResultsTvSeries(searchData.total_results);

        setLoadingTvSeries(false); 

    };

    useEffect(() => {

        setCountMovies(1);

        fetchSearchMovies();

        setCountTvSeries(1);

        fetchSearchTvSeries();

        // eslint-disable-next-line
    }, [query]);

    useEffect(()=>{
        fetchSearchMovies();
        // eslint-disable-next-line
    },[countMovies]);

    useEffect(()=>{
        fetchSearchTvSeries();
        // eslint-disable-next-line
    },[countTvSeries]);

    return (
        <>
            <Header />

            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#movies">
                
                    
                    <ListGroup>
                        <Row style={{marginBottom:"20px", textAlign:"center"}}>
                            <Col>
                                {selected && 
                                    <ListGroup.Item action disabled href="#movies">
                                        <h4>MOVIES</h4>
                                    </ListGroup.Item>
                                }
                                {!selected && 
                                    <ListGroup.Item action href="#movies" onClick={clickhandler}>
                                        <h4>MOVIES</h4>
                                    </ListGroup.Item>
                                }
                            </Col>
                            <Col>
                                {selected &&
                                    <ListGroup.Item action href="#web_series" onClick={clickhandler}>
                                        <h4>WEB SERIES</h4>
                                    </ListGroup.Item>
                                }
                                {!selected &&
                                    <ListGroup.Item action disabled href="#web_series" onClick={clickhandler}>
                                        <h4>WEB SERIES</h4>
                                    </ListGroup.Item>
                                }
                            </Col>
                        </Row>
                    </ListGroup>
                    
                    <Tab.Content>
                        <Tab.Pane eventKey="#movies">
                        
                            <h2><Badge bg="dark">{loadingMovies?"Searching":"Movie"} results for "{query}"</Badge></h2>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>PAGE {countMovies} / {total_pagesMovies}</Badge></h3>
                                <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>TOTAL RESULTS: {total_resultsMovies}</Badge></h3>
                            </div>
                            <List items={movies} type="movies"/>
                            <div style={{display:"flex",justifyContent: "center"}}>
                                {countMovies>1 && <Button onClick={previousPageMoviesHandler} variant="outline-warning" style={{margin:"20px"}} size="lg"><i className="fas fa-angle-double-left" />&nbsp;Previous</Button>}
                                {countMovies===1 && <Button variant="outline-warning" style={{margin:"20px"}} size="lg" disabled><i className="fas fa-times-circle"/>&nbsp;Previous</Button>}
                                {countMovies!==total_pagesMovies && <Button onClick={nextPageMoviesHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Next&nbsp;<i className="fas fa-angle-double-right" /></Button>}
                                {countMovies===total_pagesMovies && <Button variant="outline-primary" style={{margin:"20px"}}  size="lg" disabled>Next&nbsp;<i className="fas fa-times-circle"/></Button>}
                            </div>
                        
                        </Tab.Pane>
                        <Tab.Pane eventKey="#web_series">
                        
                            <h2><Badge bg="dark">{loadingTvSeries?"Searching":"Series"} results for "{query}"</Badge></h2>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>PAGE {countTvSeries} / {total_pagesTvSeries}</Badge></h3>
                                <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>TOTAL RESULTS: {total_resultsTvSeries}</Badge></h3>
                            </div>
                            <List items={tvSeries} type="web_series"/>
                            <div style={{display:"flex",justifyContent: "center"}}>
                                {countTvSeries>1 && <Button onClick={previousPageTvSeriesHandler} variant="outline-warning" style={{margin:"20px"}} size="lg"><i className="fas fa-angle-double-left" />&nbsp;Previous</Button>}
                                {countTvSeries===1 && <Button variant="outline-warning" style={{margin:"20px"}} size="lg" disabled><i className="fas fa-times-circle"/>&nbsp;Previous</Button>}
                                {countTvSeries!==total_pagesTvSeries && <Button onClick={nextPageTvSeriesHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Next&nbsp;<i className="fas fa-angle-double-right" /></Button>}
                                {countTvSeries===total_pagesTvSeries && <Button variant="outline-primary" style={{margin:"20px"}}  size="lg" disabled>Next&nbsp;<i className="fas fa-times-circle"/></Button>}
                            </div>

                        </Tab.Pane>
                    </Tab.Content>
                
            </Tab.Container>
        </>
    );
}

export default SearchQuery