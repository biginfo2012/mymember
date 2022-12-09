const initState = {
  stripeList: null,
  stripePaymentMethodList: [],
  managestripe: [],
  stripeReports: null,
};

export const stripeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STRIPE_LIST":
      return { ...state, stripeList: action.payload };
    case "GET_STRIPE_PAYMENT_METHODS_LIST":
      return { ...state, stripePaymentMethodList: action.payload };
    case "GET_MANAGE_STRIPE":
      return { ...state, managestripe: action.payload };
    case "GET_STRIPE_REPORT_BY_CANDIDATE":
      return { ...state, stripeReports: action.payload };
    default:
      return state;
  }
};
