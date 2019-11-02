import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice:0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}; 
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0]==='price')
    //         price = param[1];
    //         else
    //         ingredients[param[0]] = +param[1];
    //     }
    //     console.log(ingredients);
    //     console.log(price);
    //     this.setState({ingredients : ingredients,totalPrice:price});
    // }

    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to='/' />;
        if(this.props.ing)
        {
            const purchaseRedirect = this.props.purchased?<Redirect to='/' />:null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary checkoutCancel={this.cancelHandler} checkoutContinue={this.continueHandler} ingredients={this.props.ing} />
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
                </div>
                );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing:state.reducer.ingredients,
        purchased :state.order.purchased 
    }
};


export default connect(mapStateToProps)(Checkout);