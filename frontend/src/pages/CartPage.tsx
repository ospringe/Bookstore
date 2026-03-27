import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <h3>Total: </h3>
        <button>Checkout</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={() => navigate('/books')}>Continue Shopping</button>
      </div>
    </>
  );
}

export default CartPage;
