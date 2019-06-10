import React from "react";
const Counter = ({updateQuantity,ticks}) => (
      <div className="stepper-input">
        <button className="counter" onClick={()=>updateQuantity(-1)}  disabled={ticks<=0}>
          –
        </button>
        <span className="counter"> {ticks}</span>
        <button className="counter" onClick={()=>updateQuantity(1)}>
          +
        </button>
      </div>
    )


export default Counter