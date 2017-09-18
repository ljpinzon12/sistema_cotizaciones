import React, {
    Component
}
from 'react';
import logo from './logo.svg';
import './style.css';
//import { createBlogPost } from './createProduct'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
            , quote: { email: '', telefono: '', 'fecha': new Date(), nombre: '', productos: []},
            condition: false
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }
    handleClick() {
        this.setState( { condition : !this.state.condition } ); 
        console.log(this.state.condition);
        console.log('hola3');
    }
    addProduct(prod) {
        this.setState(prevState => ({
            quote: this.state.quote['productos'].concat([prod])
//            this.setState(update(this.state.quote.productos, {productos: this.state.quote.productos.concat([prod])});
        }));
        console.log(this.state.quote);
    }
    componentDidMount() {
            fetch('/products').then(res => res.json()).then(products => this.setState({
                products
            }));
        }
        //   handleSubmit() {
        //        createBlogPost();
        //    }
    render() {
        return ( < div id = "products" > 
                <div className={this.state.condition ? "quoteBG active" :"quoteBG"}><div className={this.state.condition ? "quote active" :"quote"}>{this.state.quote.email} {this.state.quote.telefono} {this.state.quote.fecha} {this.state.quote.nombre}</div></div>
                < button onClick ={this.handleClick}
            className={this.state.condition ? "shoppingCart active" :"shoppingCart"} > < /button> {
                this.state.products.map(product => < div key = {
                        product.id
                    }
                    className = "product" > < img src = {
                        product.urlImagen
                    }
                    /> < h2 > {
                        product.nombre
                    } < /h2> < h3 > {
                        product.descripcion
                    } < /h3> < h4 > < b > alto: < /b>{product.alto} < b > ancho: < /b>{product.ancho} < b > profundo: < /b>{product.largo} < /h4> < button className = "addProduct"
                    onClick = {() => {this.addProduct(product)}} > Agregar a Cotizaci&oacute;n < /button> < /div>)
            } < /div>);
    }
}
export default App;
//         <div>
//                <button onClick={this.handleSubmit}>Handle</button>
//            </div>