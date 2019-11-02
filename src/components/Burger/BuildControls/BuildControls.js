import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label:'Salad',type:'salad'},
	{ label:'Bacon',type:'bacon'},
	{ label:'Cheese',type:'cheese'},
	{ label:'Meat',type:'meat'},
];
const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price}</strong></p>
		{controls.map(el =>(
			<BuildControl key={el.label} label={el.label} removed={()=>props.removeIngredients(el.type) } added={() => props.addIngredients(el.type)} disabled={props.disabled[el.type]}/>
		))}
		<button onClick={props.ordered} disabled={!props.purchase} className={classes.OrderButton}>{props.isAuth ? 'ORDER NOW':'SIGNUP TO ORDER'}</button>
	</div>
);

export default buildControls;