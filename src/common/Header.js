import {useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux';
import {searchActions} from '../store/Search';

import styles from "../common/Header.module.css";

const Header = (props) => {

  const navigate=useNavigate();

  const inputRef=useRef();

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);

  const submitHandler = (event)=>{
    event.preventDefault();
    if(inputRef.current.value!==""){
      dispatch(searchActions.setSearch(inputRef.current.value));
      
      navigate("/search/"+inputRef.current.value);
    }
  };

  const [searchQ, setSearchQ]=useState(search);
  

  const types=["movies", "web_series"];

  const movieFilters=["now_playing", "upcoming", "trending", "popular", "top_rated"];

  const tvFilters=["trending", "popular", "top_rated"];

  return (
    <>
      <Navbar collapseOnSelect expand="sm" variant="dark" sticky="top" style={{backgroundColor: "black", textTransform: "uppercase"}}>
        <Navbar.Brand><Link to="/" className={styles.navBrand}>E-HUB</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{color:"white"}}>
          <Nav className="me-auto">
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              {
                props.home==="TRUE" &&
                <>
                  <Nav.Item >
                    <Nav.Link>
                      <Link to="/movies" style={{textDecoration:"none", color:"white"}}><b>MOVIES</b></Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link>
                      <Link to="/web_series" style={{textDecoration:"none", color:"white"}}><b>TV/WEB SERIES</b></Link>
                    </Nav.Link>
                  </Nav.Item>
                </>
              }
              {
                !props.home &&
                <b>
                  <NavDropdown title={props.type} id="collasible-nav-dropdown">
                  {
                      types.map((type)=>(
                          <>
                              {type!==props.type && 
                                  <NavDropdown.Item className={styles.navLink}>
                                    <Link to={`/${type}`} style={{textDecoration:"none", color:"red"}}>
                                      {type}
                                    </Link>
                                  </NavDropdown.Item>
                              }
                              {type===props.type && 
                                  <NavDropdown.Item className={styles.navLink} href="" active>
                                      {type}
                                  </NavDropdown.Item>
                              }
                          </>
                      ))
                  }
                  </NavDropdown>
                </b>
              }
              {props.type &&
                <b>
                  <NavDropdown title={props.filter || "FILTER BY"} id="collasible-nav-dropdown">
                    {props.type==="web_series" && tvFilters.map((filter)=>(
                        <>
                          {filter!==props.filter && 
                              <NavDropdown.Item className={styles.navLink}>
                                <Link to={`/web_series/${filter}`} style={{textDecoration:"none", color:"red"}}>
                                  {filter}
                                </Link>
                              </NavDropdown.Item>
                          }
                          {filter===props.filter && 
                              <NavDropdown.Item className={styles.navLink} href="" active>
                                  {filter}
                              </NavDropdown.Item>
                          }
                        </>
                        ))
                    }

                    {props.type==="movies" && movieFilters.map((filter)=>(
                        <>
                          {filter!==props.filter && 
                              <NavDropdown.Item className={styles.navLink}>
                                <Link to={`/movies/${filter}`} style={{textDecoration:"none", color:"red"}}>
                                  {filter}
                                </Link>
                              </NavDropdown.Item>
                          }
                          {filter===props.filter && 
                              <NavDropdown.Item className={styles.navLink} href="" active>
                                  {filter}
                              </NavDropdown.Item>
                          }
                        </>
                        ))
                    }
                  </NavDropdown>                
                </b>
              }
            </div>
          </Nav>
          
        </Navbar.Collapse>
        <Nav>
            <Form className="d-flex" onSubmit={submitHandler} style={{margin:"10px 0px"}}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQ}
                className="me-2"
                ref={inputRef}
                style={{fontWeight:"bold", fontSize:"17px"}}

                onChange={(e) => setSearchQ(e.target.value)}
              />
              <Button variant="light" type="submit" onClick={submitHandler}>SEARCH</Button>
            </Form>
          </Nav>
      </Navbar>
    </>
  )
}

export default Header;