import React, { Component } from 'react'
import { CircularProgress, Box } from '@material-ui/core'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <CircularProgress size={200} />
      </Box>
    )
  }
}
