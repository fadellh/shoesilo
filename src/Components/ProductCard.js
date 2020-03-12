import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

const ProductCard = (props) => {
  return (
    <div style={{textAlign: 'center', justifyContent: 'center',width: '220px' }} className='m-3'>
      <Card className='box-glow'>
          <div className='d-flex justify-content-center'>
            <CardImg top src={props.image} alt="Card image cap" style={{height : '180px', width:'200px'}}/>
          </div>
        <CardBody>
          <CardTitle style={{fontWeight: 'bolder', fontSize: '14px', height: '42px'}}>{props.name}</CardTitle>
          <CardSubtitle style={{fontWeight: 'bolder', fontSize: '14px'}}>{props.brand}</CardSubtitle>
          <CardText style={{fontSize: '16px'}}>Rp. {props.price.toLocaleString()}</CardText>
          {/* <Button>View</Button> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;