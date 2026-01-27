import AppDispatcher from "./AppDispatcher";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let listeners = [];

const saveToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartStore = {
  getCart() {
    return cart;
  },

  addChangeListener(fn) {
    listeners.push(fn);
  },

  removeChangeListener(fn) {
    listeners = listeners.filter(l => l !== fn);
  },

  emitChange() {
    saveToLocalStorage(); // 🔥 persist cart
    listeners.forEach(fn => fn());
  }
};

AppDispatcher.register(action => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = cart.find(i => i.productId === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }

      CartStore.emitChange();
      break;
    }

    case "INCREASE_QTY": {
      const item = cart.find(i => i.productId === action.payload);
      if (item) item.quantity += 1;
      CartStore.emitChange();
      break;
    }

    case "DECREASE_QTY": {
      const item = cart.find(i => i.productId === action.payload);
      if (item) {
        if (item.quantity === 1) {
          cart = cart.filter(i => i.productId !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
      CartStore.emitChange();
      break;
    }

    case "REMOVE_FROM_CART":
      cart = cart.filter(i => i.productId !== action.payload);
      CartStore.emitChange();
      break;

    default:
      break;
  }
});

export default CartStore;
