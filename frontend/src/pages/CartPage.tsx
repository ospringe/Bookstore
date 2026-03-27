import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div>
        <h2>Your Cart</h2>

        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.bookID}>
                <h4>{item.title}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <h3>Total: ${total.toFixed(2)}</h3>
        <button>Checkout</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={() => navigate('/books')}>Continue Shopping</button>
      </div>
    </>
  );
}

export default CartPage;
