import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import { createBlogPost } from './createProduct'

class App extends Component {
    
state = {products: []}

 componentDidMount() {
   fetch('/productos')
     .then(res => res.json())
     .then(products => this.setState({ products }));
 }

//   handleSubmit() {
//        createBlogPost();
//    }

 render() {
   return (
     <div className="App">
       <h1>Users</h1>
       {this.state.products.map(product =>
         <div key={product.id}>{product.nombre}</div>
       
       )}
//         <div>
//                <button onClick={this.handleSubmit}>Handle</button>
//            </div>

     </div>

   );
 }
}

export default App;
