import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/product'
import './styles.css';
import { Button, Table } from 'react-bootstrap';

class ProductScreen extends Component {

    constructor() {
        super();
    }

    render() {
        const { result } = this.props.reducers;        
        const { data } = this.props;

        return (
            // <div className="grider">
            //     <div className="prod-style">   
            <div className="rowz">              
                    {
                        data!==undefined?
                                    data.map((product, index) =>
                                        <Product number={index} key={index} product={product} />
                                    ):<div>Error</div>
                    }      
              </div>
            //    </div>        
        );
    }

}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps)(ProductScreen);