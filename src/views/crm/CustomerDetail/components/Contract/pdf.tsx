import React from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <img src='/colonelz-logo.png' alt="" />
      </div>
    );
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default MyComponent;