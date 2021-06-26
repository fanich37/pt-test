import React from "react";

interface CartControlsProps {
  disabled: boolean;
  calculate: () => void;
}

export const CartControls: React.FC<CartControlsProps> = ({
  disabled,
  calculate
}) => {
  return (
    <div className="cart__controls">
      <button className="cart__button" onClick={calculate} disabled={disabled}>
        Calculate
      </button>
    </div>
  );
};
