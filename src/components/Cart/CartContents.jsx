import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '../../redux/slice/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId, guestId, userId }));
  };

  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={product.image || "https://placehold.co/100"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center mt-2 space-x-2">
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity
                    )
                  }
                >
                  -
                </button>
                <span className="font-medium">{product.quantity}</span>
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-800 font-bold mb-2">₹{product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(product.productId)
              }
              className="text-red-500 hover:text-red-700 transform hover:scale-110 transition duration-200"
              title="Remove Item"
            >
              <RiDeleteBin3Line size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
