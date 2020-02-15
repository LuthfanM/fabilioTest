import React, { Component } from 'react';
import './styles.css';

class Product extends Component {

    generateItemArray(item){        
        var text = "";
        for(var x=0; x<item.length;x++)
        {
            text = text.concat(item[x])      
            if(x!==item.length-1)
            {
                text = text.concat("/");
            }
        }
        return text;
    }

    render() {
        const {number} = this.props;        

        let itemColumn = <div className="boxItem">
            <div className="marginItem">
                <div className="prodheader">
                    <div className="boldText leftAlign">{this.props.product.name}</div>
                    <span className="priceText rightAlign">IDR {this.props.product.price.toLocaleString()}</span>
                    {/* <div style={clear: both}></div>                        */}
                    <div className="clearer"></div>
                </div>
                <br />
                <p>{this.props.product.description}</p>
                <div>Style: {this.generateItemArray(this.props.product.furniture_style)}</div>
                <div className="rightAlign">Delivery Days: {this.props.product.delivery_time} Day(s)</div>
            </div>
        </div>;

        return (                
            <div className="columnz">
                {itemColumn}
            </div>
        );
    }
}

export default Product;