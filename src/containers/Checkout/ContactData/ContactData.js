import React,{ Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm:{
            name :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Type your name'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
            email : {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Type your email'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
            country : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Type your country name'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options: [
                       {value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                valid:true
            },
            street : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Type your street'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
            postalCode : {
                elementType:'input',
                elementConfig:{
                    type:'Number',
                    placeholder:'Type your Zip code'
                },
                value:'',
                validation: {
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            }
        },
        formIsValid:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ing,
            price : this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
        
    }

    checkValidity(value,rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.validation)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        } 
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm ) {
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig} 
                     value={formElement.config.value}
                     invalid={!formElement.config.valid}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button disabled={!this.state.formIsValid}  clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );
        if(this.props.loading)
        {
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing:state.reducer.ingredients,
        price:state.reducer.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    } 
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(ContactData,axios));