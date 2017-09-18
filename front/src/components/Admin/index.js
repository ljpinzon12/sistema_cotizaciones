import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './style.css';
export default class Admin extends Component {

        constructor(props) {
        super(props);
        this.state = {
            quotes: []
        };

    }
    
        componentDidMount() {
            fetch('/cotizaciones').then(res => res.json()).then(quotes => this.setState({
                quotes
            }));
        }

  render() {
    return (        
      <div className="product"> {this.state.quotes.map(post =>
    <div  key = { post.id }>
      <h1>{post.nombre}</h1>
      <h2>{post.email}</h2>
      <h3>{post.telefono}</h3>
      <h4>{post.fecha}</h4>
      <ul>
                
            {
                post.productos.map((subitem) => {
                  return (
                     <li>{subitem.nombre}</li>
                  )
                })
               }
        
        
      </ul>
    </div>
    )}
        
        
      </div>
    );
  }
}
