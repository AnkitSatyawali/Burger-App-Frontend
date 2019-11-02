import React,{Component} from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component 
{
    
    
    render()
    {
        const ingredientSummary = Object.keys(this.props.ingredients).map((ikey) => {
            return (<li key={ikey}>
                <span style={{textTransform:'capitalize'}}>{ikey}</span>:{this.props.ingredients[ikey]}
            </li>)
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price} </strong></p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;