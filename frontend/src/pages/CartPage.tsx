import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold mb-0">Your Cart</h1>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/books')}
                >
                  Continue Shopping
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Book</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item: CartItem) => (
                          <tr key={item.bookID}>
                            <td className="fw-semibold">{item.title}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFromCart(item.bookID)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6 col-lg-4 ms-auto">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <h4 className="mb-3">Order Summary</h4>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Total</span>
                            <span className="fw-bold">${total.toFixed(2)}</span>
                          </div>

                          <div className="d-grid gap-2 mt-4">
                            <button className="btn btn-dark">Checkout</button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => navigate(-1)}
                            >
                              Go Back
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => navigate('/books')}
                            >
                              Continue Shopping
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={clearCart}
                            >
                              Clear Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;