import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
	let tingredients = Object.keys(props.ingredients).map(ikey => {
		return [...Array(props.ingredients[ikey])].map((_,i) => {
			return <BurgerIngredient key={ikey+i} type={ikey} />
		});
	}).reduce((arr,el) => {
		return arr.concat(el);
	},[]);
	if(tingredients.length ===0)
	{
		tingredients = <p>Please start adding ingredients</p>
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			 {tingredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
};

export default withRouter(burger);