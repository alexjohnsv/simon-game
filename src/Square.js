import React from 'react';

function Square(props) {
  return (
    <div className={"Square Square-" + props.color + (props.highlight ? ' Square-' + props.color + '-Highlight' : '')} onClick={props.handleClick}>
    </div>
  );
}

export default Square;
