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

const Header = () => {

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

  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark" sticky="top" style={{backgroundColor: "black", textTransform: "uppercase"}}>
        <Navbar.Brand><Link to="/" className={styles.navBrand}>E-HUB</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{color:"white"}}>
          <Nav className="me-auto">
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                  <b>
                    <NavDropdown title="MOVIES" id="collasible-nav-dropdown">
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies" style={{textDecoration:"none", color:"red"}}>
                          ALL
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies/now_playing" style={{textDecoration:"none", color:"red"}}>
                          NOW PLAYING
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies/upcoming" style={{textDecoration:"none", color:"red"}}>
                          UPCOMING
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies/trending" style={{textDecoration:"none", color:"red"}}>
                          TRENDING
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies/popular" style={{textDecoration:"none", color:"red"}}>
                          POPULAR
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/movies/top_rated" style={{textDecoration:"none", color:"red"}}>
                          TOP RATED
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </b>
                  <b>
                    <NavDropdown title="TV/WEB SERIES" id="collasible-nav-dropdown">
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/web_series" style={{textDecoration:"none", color:"red"}}>
                          ALL
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/web_series/trending" style={{textDecoration:"none", color:"red"}}>
                          TRENDING
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/web_series/popular" style={{textDecoration:"none", color:"red"}}>
                          POPULAR
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className={styles.navLink}>
                        <Link to="/web_series/top_rated" style={{textDecoration:"none", color:"red"}}>
                          TOP RATED
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </b>
                
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