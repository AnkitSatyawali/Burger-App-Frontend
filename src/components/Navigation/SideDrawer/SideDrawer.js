import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';


const SideDrawer = (props) => {
    let attclass = [classes.SideDrawer,classes.Close];
    if(props.open) {
        attclass = [classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attclass.join(' ')} onClick={props.closed}>
                <Logo height="11%" marginBottom="32px" />
                
                <nav > 
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>        
    );
}
// 8586033006
export default SideDrawer;