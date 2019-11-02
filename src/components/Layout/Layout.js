import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		side:false
	};
	SideDrawerClose()
	{
		this.setState({side:false});
	}
	closed()
	{
		this.setState((prevS) => {
			return {side:!prevS.side}
		});
	}
	render() {
		return (
			<Aux>
				<Toolbar isAuth={this.props.isAuthenticated} opened={this.closed.bind(this)}/>
				<SideDrawer isAuth={this.props.isAuthenticated} open={this.state.side} closed={this.SideDrawerClose.bind(this)}/>
				<main className={classes.content}>
					{this.props.children}
				</main> 
			</Aux>
		)
	}
}; 

const mapStateToProps = state => {
	return {
		isAuthenticated : state.auth.token!=null
	}
}

export default connect(mapStateToProps)(Layout);