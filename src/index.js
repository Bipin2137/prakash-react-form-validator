import React from 'react';
import { forEach, isEqual }  from 'lodash';

export default class Validator extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error:""
        }
    }

    componentDidUpdate(prevProps){
        if (!isEqual(this.props.reference,prevProps.reference)){
            let { validationRules, validationMessages, reference } = this.props;
            if( validationRules ){
                let flag=true;
                forEach( validationRules, ( rule, func ) => {
                    if (flag){
                        debugger;
                        let message = validationMessages[func];
                        if( this[func]( rule, reference ) ){
                            this.setState({error:message});
                            flag=false;
                        }else{
                            this.setState({error:""});
                        }
                    }
                })
            }
        }
        
    }
    required( rule, value ){
        if (rule === true){
            return value.toString().trim().length === 0;
        }
        return false
    }
    minLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length < rule;
        }
        return false;
    }
    maxLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length > rule;
        }
        return false;
    }
    email( rule, value){
        if (rule === true){
            debugger;
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        }
        return false;
    }
    url( rule, value ){
        if ( rule === true ){
            return !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
        }
        return false;
    }
    number( rule, value ){
        if (rule === true){
            return !/^[-+]?\d+$/gm.test(value);
        }
        return false;
    }
    date( rule, value ){
        if (rule === true){
            return !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](18|19|20|21)\d\d$/gm.test(value);
        }
        return false;
    }
    color(rule,value){
        if (rule === true){
            return !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
        }
        return false;
    }
    
    
    render(){
        let { error } = this.state;
        return( 
            <span className="error">{error}</span>
        );
    }

} 