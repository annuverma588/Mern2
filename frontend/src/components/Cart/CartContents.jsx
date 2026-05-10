import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = ({ items = [], onChangeQuantity, onRemove }) => {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div>
      {items.map((product, index) => (
        <div
          key={`${product.product}-${product.size}-${product.color}-${index}`}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 rounded object-cover"
            />

            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>

              <div className="mt-2 flex items-center">
                <button
                  type="button"
                  onClick={() => onChangeQuantity?.(index, product.quantity - 1)}
                  className="border px-2 py-1 text-lg"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  type="button"
                  onClick={() => onChangeQuantity?.(index, product.quantity + 1)}
                  className="border px-2 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="font-medium">
              Rs. {(product.price * product.quantity).toLocaleString()}
            </p>

            <button type="button" onClick={() => onRemove?.(index)}>
              <RiDeleteBin3Line className="mt-2 h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
