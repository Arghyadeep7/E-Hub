import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SingleComponent from "./SingleComponent";

const List = (props) => {

    if(props.items.length===0){
        return (
            <h2 style={{margin:"15px auto", textTransform:"uppercase"}}>
                No {props.type} found!
            </h2>
        )
    }

    return (
    <Row>
    {
        props.items.map((item) =>(
            <Col xs={4} md={2} key={item.id} style={{marginRight:'0'}}>
                
                    <SingleComponent item={item} type={props.type}/>
                
            </Col>
        ))
    }
    </Row>
    );
}

export default List;