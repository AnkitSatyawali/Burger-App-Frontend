import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients:null,
    totalPrice:30,
    error:false,
    building : false
};
 
const INGREDIENTS_PRICES = {
	salad : 10,
	cheese: 20,
	meat: 30,
	bacon:20
};

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]+1};
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updatedState = {
                ingredients : updatedIngredients,
                    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                    building:true
            }
            return updateObject(state,updatedState);
}

const removeIngredient = (state,action) => {
    const updatedIng = {[action.ingredientName]:state.ingredients[action.ingredientName]-1};
                const updatedIngs = updateObject(state.ingredients,updatedIng);
                const updatedSt = {
                    ingredients : updatedIngs,
                        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                        building:true
                    }
                return updateObject(state,updatedSt);
}

const setIngredient = (state,action) => {
    return updateObject(state,{
        ingredients:action.ingredients,
        error : false,
        totalPrice : 30,
        building:false
    });
}

const fetchIngredientsFailed = (state,action) => {
    return updateObject(state,{
        error:true
    });
}

const reducer = (state = initialState,action) => {
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);  

        case actionTypes.SET_INGREDIENT:
            return setIngredient(state,action);     

        case actionTypes.FETCH_INGREDIENT_FAILED:
            return fetchIngredientsFailed(state,action);
        default:
            return state;
    }
};

export default reducer;