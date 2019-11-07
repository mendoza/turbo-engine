import React, { Component } from 'react';
import EmptyLayout from '../layouts/EmptyLayout';
import { Link } from 'react-router-dom';

export default class Users extends Component {
  render() {
    return (
      <EmptyLayout>
        fdsa <br />
        asdjfklajsd;f
        <Link to="/about"> go to about</Link>
      </EmptyLayout>
    )
  }
}
