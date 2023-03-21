


export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...action.payload
      };

      case 'GET_CART_ITEMS':
      const {cart}=action.payload[0].attributes
      return{
       ...cart,
       cartId:action.payload[0].id
      }

    default:
      return state;
  }
};
