import React, {useState} from 'react';
import { createContext, useContext } from "react"
import Fields from './fields';

const FormContext = createContext();

export const useForm = (rules, onSubmit) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    return {
        value: (key) => {
            return values[key];
        },
        onChange: (key) => {
            return (newValue) => {
                setValues(prev => ({...prev, [key]: newValue}))
            }
        },
        errors,
        reset: () => {
            setErrors({});
        },
        handleSubmit: () => {
            // validate rules
            const er = Object.entries(rules).reduce((prev, [field, rule]) => {
                if (rule == 'required' && !values[field])
                    return {...prev, [field]: 'required'};
                return prev;
            }, {});
            setErrors(er);
            if (Object.keys(er).length == 0) {
                onSubmit(values);
            }
        }
    }
}

const Form = (props) => {
    const val = props.form ?? useForm();
    return <FormContext.Provider value={val}>
        {props.children}
    </FormContext.Provider>
}

const makeField = (Component) => {
    return ({name, label, hint}) => {
        const context = useContext(FormContext);
        return <div>
            <label htmlFor={name}>{label}</label>
            <Component name={name} onChange={context.onChange(name)} value={context.value(name)}/>
            <p>{hint}</p>
            {context.errors[name] && <p>ERROR: {context.errors[name]}</p>}
        </div>
    }
}

Form.Fields = Object.entries(Fields).reduce((prev, [key, Component]) => {
    return {
        ...prev,
        [key]: makeField(Component)
    };
}, {});

export default Form;