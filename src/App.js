import React, { Component } from 'react';
import './App.css';
import './App.js'
import { connect } from 'react-redux';
import { furnitureDataAction, furnitureDataActionList } from './helpers/redux/actions'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import ProductScreen from './screens/productScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Card, Table } from 'react-bootstrap';
import { optionsDelivery } from './constants/constantVariable';
import { customStyles } from './constants/stylingComponents';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      filter: "", 
      data: [], 
      isFinished: false, 
      furnitureOptionSelected: [], 
      deliveryOptionSelected: [] 
    };
  }

  async componentDidMount() {
    const response = await fetch('https://www.mocky.io/v2/5c9105cb330000112b649af8');
    const json = await response.json();
    await this.props.furnitureDataAction(json);
    this.setState({ data: json, isFinished: true });
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleChangeFurniture = furnitureOptionSelected => {

    this.setState(
      { furnitureOptionSelected },
      () => console.log('furniture opt selected : ', this.state.furnitureOptionSelected)
    );
  };

  handleChangeDeliveryTime = deliveryOptionSelected => {
    this.setState(
      { deliveryOptionSelected },
      () => console.log('delivery opt selected : ', this.state.deliveryOptionSelected)
    );
  };

  displayDeliveryTime(arr, timeDelivery){
    let arra = [];    
    for (var i = 0; i < arr.length; i++) {      
      if (arr[i].delivery_time <= timeDelivery) {        
        arra.push(arr[i]);                
      }      
    }

    return arra;
  }

  displayFurnitureStyle(arr, style)
  {
    console.log("arra"+JSON.stringify(arr)+"..."+style);
    let arra = [];    
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].furniture_style.includes(style)) {
        arra.push(arr[i]);
      }
    }

    return arra;
  }

  removeDuplicateArray(array, nameDuplicate)
  {
    let arr = [];
    let tempObj = {};

    for(let x in array)
    {
      tempObj[array[x][nameDuplicate]] = array[x];
    }

    for(let x in tempObj)
    {
      arr.push(tempObj[x]);
    }

    return arr;
  }

  render() {
    const { furnitureOptionSelected, deliveryOptionSelected } = this.state;
    // const { result } = this.props.reducers;

    let optionsFurniture = [];    
    let dataFurniture = "";

    // const optionsDelivery = [
    //   { label: '1 Week', value: 7 },
    //   { label: '2 Weeks', value: 14 },
    //   { label: '1 Month', value: 30 },
    //   { label: 'More', value: 31 },
    // ];

    if (this.state.isFinished) {

      for (let x = 0; x < this.state.data.furniture_styles.length; x++)
      {                
        optionsFurniture[x]={};
        optionsFurniture[x].label = this.state.data.furniture_styles[x];
        optionsFurniture[x].value = x+1;
      }      

      var dataProduct = this.state.data.products;      
      dataFurniture = dataProduct.filter((data) => {
        if (this.state.search == null)
        {
          return data
        }
        else if (data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
          return data
        }
    }); 

    let arrayTemp = [];
    if (deliveryOptionSelected.length > 0)
    {            
      for(var x=0; x<deliveryOptionSelected.length; x++)
      {        
        arrayTemp = JSON.parse(JSON.stringify(this.displayDeliveryTime(dataFurniture, deliveryOptionSelected[x].value)));               
      }
      dataFurniture = this.removeDuplicateArray(arrayTemp, "name");            
    }


    if (furnitureOptionSelected.length > 0)
    {
      let storeData = [];
      for (var x = 0; x < furnitureOptionSelected.length; x++) {
        arrayTemp = JSON.parse(JSON.stringify(this.displayFurnitureStyle(dataFurniture, furnitureOptionSelected[x].label)));
        console.log("array tempa" + JSON.stringify(arrayTemp));
        storeData = storeData.concat(arrayTemp);
      }      
      console.log("array ==> " + JSON.stringify(storeData));

      dataFurniture = this.removeDuplicateArray(storeData, "name");          
    }

      // console.log("ni;ai json " + JSON.stringify(this.state.data.furniture_styles));
  }

    return (
      <form>
        {
          this.state.isFinished ?
            (
              <Card>
                <Container className="border-outside App-link">
                    <Row>
                    <Col>
                      <div className="bgInputText">
                    <input type="text" className="textInput" onChange={this.handleChange} placeholder="Search Furniture" />
                      </div>
                    </Col>                      
                    </Row>
                    <Row>
                      <Col>
                      <ReactMultiSelectCheckboxes style={customStyles} options={optionsFurniture} width='100%'
                        onChange={this.handleChangeFurniture} placeholderButtonLabel={"Furniture Style"}
                        />
                      </Col>
                      <Col>
                      <ReactMultiSelectCheckboxes style={customStyles} options={optionsDelivery} width='100%'
                        onChange={this.handleChangeDeliveryTime} placeholderButtonLabel={"Options Style"}
                        />
                      </Col>
                    </Row>   
                    </Container>
                    <Container className="border-outside">                 
                  <Row>
                    <div className="displayInline">
                    <ProductScreen data={dataFurniture} />
                    </div>
                  </Row>
                </Container>
                </Card>
            ) :
            <div>Loading...</div>
        }
      </form>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  furnitureDataAction: (data) => dispatch(furnitureDataAction(data))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
