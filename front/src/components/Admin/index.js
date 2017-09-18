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
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Admin', className)} {...props}>
         {
                this.state.quotes.map(product => < div key = {
                        product.id
                    }
                    className = "product" > < h2 > {
                        product.email
                    } < /h2> < h3 > {
                        product.fecha
                    } < /h3> < h4 > {product.telefono} </h4>< /div>)
            }
      </div>
    );
  }
}
