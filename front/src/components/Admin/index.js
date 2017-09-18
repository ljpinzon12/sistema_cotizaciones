import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './style.css';
export default class Admin extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Admin', className)} {...props}>
        <h1>
         Admin de toto estppfnsdjskmfskdlfklmk
        </h1>
      </div>
    );
  }
}
