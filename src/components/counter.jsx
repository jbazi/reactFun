import React, { Component } from "react";

class Counter extends Component {
  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //   } //decided to use arrow functions

  componentDidUpdate(PrevProps, PrevState) {
    if (PrevProps.counter.value !== this.props.counter.value) {
      //make ajax callto get new data from the server
    }
  }

  componentWillUnmount() {}

  styles = {
    fontSize: 15,
    fontWeight: "bold"
  };

  //   renderTags() {
  //     if (this.state.tags.length === 0) return <p> No tags</p>;
  //     return (
  //       <ul>
  //         {this.state.tags.map(tag => (
  //           <li key={tag}>{tag}</li>
  //         ))}
  //       </ul>
  //     );
  //   }

  render() {
    const { counter, onIncrement, onDecrement, onDelete } = this.props;
    return (
      <div className="row">
        <div className="col-1">
          <span style={this.styles} className={this.getBadgeClasses()}>
            {this.formatCount()}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-info btn-sm"
          >
            +
          </button>

          <button
            onClick={() => onDecrement(counter)}
            className={this.disableDecrementBtn()}
          >
            -
          </button>

          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-sm "
          >
            Delete
          </button>
        </div>

        {/* {this.state.tags.length === 0 && "Please create a new tag!"}
        {this.renderTags()} */}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  disableDecrementBtn() {
    let classes = "btn btn-sm m-2 btn-";
    classes +=
      this.props.counter.value === 0 ? "secondary disabled" : "secondary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
