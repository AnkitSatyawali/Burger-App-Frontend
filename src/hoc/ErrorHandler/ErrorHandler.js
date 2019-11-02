import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi';
const errorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error : null
        }
        componentWillMount () {
            this.reqIntercept = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resIntercept = axios.interceptors.response.use(res => res,error => {
                this.setState({error : error});
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntercept);
            axios.interceptors.response.eject(this.resIntercept)
        }
        close() {
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                <Modal show={this.state.error} CloseBackdrop={this.close.bind(this)}>
                    {this.state.error ? this.state.error.message:null }
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    } 
}

export default errorHandler;