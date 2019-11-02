import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary//OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/actions/index';


class BurgerBuilder extends Component {
	state = {
		purchasing:false,
		loading:false
	}
	updatePurchase(ingredients){
		// const ingredients = {...this.state.ingredients};
		const sum = Object.keys(ingredients).map((ikey)=>{
			return ingredients[ikey];
		}).reduce((sum,el) => {
			return sum+el;
		},0);
		return sum > 0;
	}
	// addIngredient = (type) => {
	// 	const updatedCount = (this.state.ingredients[type])+1;
	// 	const updatedIngredients ={
	// 		...this.props.ing
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENTS_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	console.log(updatedIngredients,newPrice);
	// 	this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
	// 	this.updatePurchase(updatedIngredients);
	// }
	// removeIngredient = (type) => {
	// 	if(this.props.ing[type] <= 0)
	// 	return;
	// 	const updatedCount = (this.props.ing[type])-1;
	// 	const updatedIngredients ={
	// 		...this.props.ing
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceReduction = INGREDIENTS_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceReduction;
	// 	console.log(updatedIngredients,newPrice);
	// 	this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
	// 	this.updatePurchase(updatedIngredients);
	// }
	componentDidMount() {
		this.props.onInitIngredients();
	}
	purchaseHandler = () => {
		if(this.props.isAuthenticated)
		this.setState({purchasing:true});
		else {
			this.props.onSetRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}
	backdropclosed = () => {
		console.log('What');
		this.setState({purchasing:false});
	}
	purchaseContinue = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
		// const queryParams = [];
		// for (let i in this.props.ing) {
		// 	queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.props.ing[i]));
		// }
		// queryParams.push(encodeURIComponent('price')+"="+encodeURIComponent(this.state.totalPrice));
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		// 	pathname:'/checkout',
		// 	search : '?'+queryString});
	}
	render() {
		const disabledInfo = {...this.props.ing}
		for(let key in disabledInfo)
		{
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can not be loaded</p>:<Spinner />
		if(this.props.ing){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ing}/>
					<BuildControls ordered={this.purchaseHandler} 
					purchase={this.updatePurchase(this.props.ing)}
					price={this.props.price}
					addIngredients={this.props.onIngredientAdded} 
					removeIngredients={this.props.onIngredientRemoved} 
					disabled={disabledInfo}
					isAuth = {this.props.isAuthenticated}/>
				</Aux>
			);
			orderSummary = <OrderSummary 
			purchaseCanceled={this.backdropclosed}
			purchaseContinued={this.purchaseContinue}
			ingredients={this.props.ing}
			price={this.props.price}/>;
		}
		
		if(this.state.loading)
		{
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} CloseBackdrop={this.backdropclosed}>
						{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}
const mapStateToProps = state => {
	console.log(state.totalPrice);
	return {
		ing : state.reducer.ingredients,
		price: state.reducer.totalPrice,
		error : state.reducer.error,
		isAuthenticated : state.auth.token !== null
	};
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded : (ingName) => dispatch(actionTypes.addIngredient(ingName)),
		onIngredientRemoved : (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
		onInitIngredients : () => dispatch(actionTypes.initIngredients()),
		onInitPurchase : () => dispatch(actionTypes.purchaseInit()),
		onSetRedirectPath : (path) => dispatch(actionTypes.setAuthRedircetPath(path))
	}
} 
export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder,axios));