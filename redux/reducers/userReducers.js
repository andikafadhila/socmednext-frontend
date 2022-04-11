const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  username: "",
  error_mes: "",
  roleId: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_mes: "", ...action.payload };
    case "ERROR":
      return { error_mes: action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
