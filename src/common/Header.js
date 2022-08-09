import {useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from "../common/Header.module.css";

const Header = (props) => {

  const navigate=useNavigate();

  const inputRef=useRef();

  const [search, setSearch]=useState(false);

  const submitHandler = (event)=>{
    event.preventDefault();
    if(inputRef.current.value!==""){
      navigate("/search/"+inputRef.current.value);
    }
  };

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
                <b>
                    <NavDropdown title={props.type || "FILTER BY"} id="collasible-nav-dropdown">
                    {
                        types.map((type)=>(
                            <>
                                {type!==props.type && 
                                    <NavDropdown.Item className={styles.navLink} href={`/${type}`}>
                                        {type}
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

                <b>
                  {props.type &&
                    <NavDropdown title={props.filter || "FILTER BY"} id="collasible-nav-dropdown">
                      {props.type==="web_series" && tvFilters.map((filter)=>(
                          <>
                          {filter!==props.filter && 
                              <NavDropdown.Item className={styles.navLink} href={`/web_series/${filter}`}>
                                  {filter}
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
                              <NavDropdown.Item className={styles.navLink} href={`/movies/${filter}`}>
                                  {filter}
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
                  }
                </b>
            </div>
          </Nav>
          <Nav>
              {!search && <Button variant="light" type="submit" onClick={()=>{setSearch(true)}}><b>SEARCH</b></Button>}
              {
                search &&
                <Form className="d-flex" onSubmit={submitHandler} style={{marginBottom:"10px"}}>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    className="me-2"
                    ref={inputRef}
                    style={{fontWeight:"bold", fontSize:"17px"}}
                  />
                  <Button variant="light" type="submit" onClick={submitHandler}><i className="fa-solid fa-magnifying-glass"/></Button>
                </Form>
              }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;