import React, {
    Component
}
from 'react';
import logo from './logo.svg';
import './style.css';
import { createQuote } from './createQuote'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
            , quote: { email: '', telefono: '', 'fecha': new Date(), nombreCliente: ''},
            productos: [],
            condition: false
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick() {
        this.setState( { condition : !this.state.condition } ); 
    }
    addProduct(prod) {
        var joined = this.state.productos.concat(prod);
        //Lady Pinzon: con ECMAScript 6 se deberia usar const o let, no var
        this.setState(prevState => ({
            productos: joined
        }));
        this.forceUpdate();
    }
    nameChange(event) {
    const target = event.target;
    const value = target.value;
    this.state.quote.nombreCliente = target.value;
        this.setState(prevState => ({
             quote: this.state.quote
        }));
    }
    emailChange(event) {
    const target = event.target;
    const value = target.value;
    this.state.quote.email = target.value;
        this.setState(prevState => ({
             quote: this.state.quote
        }));
    }
    phoneChange(event) {
    const target = event.target;
    const value = target.value;
    this.state.quote.telefono = target.value;
        this.setState(prevState => ({
             quote: this.state.quote
        }));
        console.log('hola');
    }
    componentDidMount() {
            fetch('/products').then(res => res.json()).then(products => this.setState({
                products
            }));
        }
    handleSubmit(data) {
                createQuote(data);
            }
    concatanateProducts() { 
                const quote = this.state.quote;
                quote.productos = this.state.productos;
                this.handleSubmit(quote);
        }
    render() {
        return ( 
            
            < div id = "products" > 
                <div className={this.state.condition ? "quoteBG active" :"quoteBG"}>
                    <div className={this.state.condition ? "quote active" :"quote"}>
                        <form onSubmit={this.concatanateProducts}>
                            <label>
                            Nombre:<input required type="text" value={this.state.quote.nombre} onChange={this.nameChange} />
                            </label>
                            <label>
                            Email:<input required type="email" value={this.state.quote.email} onChange={this.emailChange} />
                            </label>
                            <label>
                            Telefono:<input required type="number" value={this.state.quote.telefono} onChange={this.phoneChange} />
                            </label>
//                            <button type="submit">Enviar cotizaci&oacute;n</button>
                        </form> 
            <button onClick={this.concatanateProducts.bind(this)}>Enviar cotizaci&oacute;n</button>

                       { this.state.productos.map((objProd) => < div key = {objProd.urlImagen}
                        className = "review" > < img src = {objProd.urlImagen}/> < h2 > {objProd.nombre} < /h2>  < /div>)}
                    </div>
                </div>
                < button onClick ={this.handleClick.bind(this)}
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
                   //Lady Pinzon: no deberian haber estos espacios: < /, deberia ser </
                    onClick = {() => {this.addProduct(product)}} > Agregar a Cotizaci&oacute;n < /button> < /div>)
            } < /div>);
    }
}
export default App;
//         <div>
//                <button onClick={this.handleSubmit}>Handle</button>
//            </div>
