import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

//import { createBlogPost } from './createProduct'

class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {products: []};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
    handleClick() {
        console.log('hola');
    }
 componentDidMount() {
   fetch('/products')
     .then(res => res.json())
     .then(products => this.setState({ products }));
 }

//   handleSubmit() {
//        createBlogPost();
//    }

 render() {
   return (
     <div id="products">
        <button onClick={this.handleClick} className="shoppingCart"></button>
       {this.state.products.map(product =>
       
        <div key={product.id} className="product">
            <img src={product.urlImagen} />
            <h2>{product.nombre}</h2>
            <h3>{product.descripcion}</h3>
            <h4>
                <b>alto:</b>{product.alto}
                <b>ancho:</b>{product.ancho}
                <b>profundo:</b>{product.largo}
            </h4>
        </div>
       
       )}


     </div>

   );
 }
}

export default App;
//         <div>
//                <button onClick={this.handleSubmit}>Handle</button>
//            </div>

