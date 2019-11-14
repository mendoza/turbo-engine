import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class RedirectLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    )
  }
}
