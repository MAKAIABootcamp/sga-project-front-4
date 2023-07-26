// recursosReducer.js
const initialState = {
    selectedResourceId: null,
    recursos: [], // Aquí almacenaremos la lista de recursos
  };
  
  const recursosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_RESOURCE_ID':
        return {
          ...state,
          selectedResourceId: action.payload,
        };
      case 'ADD_RECURSO':
        return {
          ...state,
          recursos: [...state.recursos, action.payload],
        };
      case 'REMOVE_RECURSO':
        return {
          ...state,
          recursos: state.recursos.filter((recurso) => recurso.ide !== action.payload),
        };
      // Otros casos
      default:
        return state;
    }
  };
  
  export default recursosReducer;
  