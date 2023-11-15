import React, {Compnents, Component} from 'react';

export default function asyncComponent(importComponent){
    class asyncComponent extends Component {
        constructor(){
            super();
            this.state = {
                component:null
            }
        }


        async componentDidMount(){
            const {default:component} = await importComponent();
            this.setState({
                component:component
            })
        }

    render(){
        const C = this.state.component;
        return C ? <C {...this.props} />:null
    }
    }
    return asyncComponent;
}