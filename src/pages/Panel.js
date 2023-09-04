import React from "react";

import PanelItemDropdown from "./PanelItemDropdown";

const Panel = ({ products, onRemove, onPurchase }) => {
  return (
    <div className="panel mt-4">
      <h3>Panel</h3>
      {products.map((product) => (
        <div key={product._id} className="panel-item">
          <span className="panel-item-name">{product.name} (Quantity: {product.quantity})</span>
          <PanelItemDropdown productId={product._id} onRemove={onRemove} onPurchase={onPurchase} />
        </div>
      ))}
    </div>
  );
};

export default Panel;
