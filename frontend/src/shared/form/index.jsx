import React, { useState } from "react";
import { createContext, useContext } from "react";
import { environment } from "../../environments/environment";
import { pub, SUCCESS } from "../snackbar";
import Fields from "./fields";

const FormContext = createContext();

export const useForm = (ruleDefinitions, onSubmit) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  return {
    value: (key) => {
      return values[key];
    },
    onChange: (key) => {
      return (newValue) => {
        setValues((prev) => ({ ...prev, [key]: newValue }));
      };
    },
    errors,
    reset: () => {
      setErrors({});
    },
    handleSubmit: async () => {
      // validate rules
      const er = Object.entries(ruleDefinitions).reduce((prev, [field, rules]) => {
        if (!Array.isArray(rules))
          rules = [rules];

        let foundError = undefined;

        for (const rule of rules) {
          const result = rule(values[field]);
          if (result) {
            foundError = result;
            break;
          }
        }

        if (foundError)
          prev[field] = foundError;
        return prev;
      }, {});

      setErrors(er);
      if (Object.keys(er).length == 0) {
        let notified = false;
        const notify = (msg) => {
          pub(msg, SUCCESS);
          notified = true;
        };

        await onSubmit(values, notify);

        if (environment.DEVELOPMENT && !notified) {
          console.warn("You did not use the notify function. Consider using for a better UX")
        }
      } else {
        pub('There are some errors with your form.')
      }
    },
  };
};

const Form = (props) => {
  const val = props.form ?? useForm();
  return (
    <FormContext.Provider value={val}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          val.handleSubmit();
        }}
      >
        {props.children}
      </form>
    </FormContext.Provider>
  );
};

const makeField = (Component) => {
  return ({ name, label, hint, ...rest}) => {
    const context = useContext(FormContext);
    return (
      <div>
        <Component
          {...rest}
          label={label}
          name={name}
          onChange={context.onChange(name)}
          value={context.value(name)}
        />
        <p>{hint}</p>
        {context.errors[name] && <p>ERROR: {context.errors[name]}</p>}
      </div>
    );
  };
};

Form.Fields = Object.entries(Fields).reduce((prev, [key, Component]) => {
  return {
    ...prev,
    [key]: makeField(Component),
  };
}, {});

export default Form;
export {Is, MegaBytes, KiloBytes} from './is';
