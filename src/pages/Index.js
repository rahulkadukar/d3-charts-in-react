import React, { Component } from 'react'
import P from '../components/P'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container" style={{marginTop: '10px'}}>
        <P>Random</P>
      </div>
    );
  }
}

export default Index
