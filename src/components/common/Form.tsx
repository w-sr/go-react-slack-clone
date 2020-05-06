import * as React from 'react';
import { IFieldProps } from './Field';

export interface IFields {
  [key: string]: IFieldProps
}

interface IFormProps {
  action: string;

  fields: IFields;

  render: () => React.ReactNode;
}

export interface IValues {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  validate: (fieldName: string) => void;
}

export const FormContext = React.createContext({} as IFormContext);

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === ""
    ? "This must be populated"
    : "";

/**
 * Validates whether a field is a valid email
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
    values[fieldName].search(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    ? "This must be in a valid email format"
    : "";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
export const maxLength = (
  values: IValues,
  fieldName: string,
  length: number
): string =>
  values[fieldName] && values[fieldName].length > length
    ? `This can not exceed ${length} characters`
    : "";

export const Form: React.FC<IFormProps> = (props) => {
  const [errors, setErrors] = React.useState({});
  const [values, setVals] = React.useState({});
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const setValues = (vals: IValues) => {
    setVals({ ...values, ...vals })
  }

  const haveErrors = (errors: IErrors) => {
    let haveError: boolean = false;

    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    })

    return haveError;
  }

  const validate = (fieldName: string): string => {
    let newError: string = "";

    if (
      props.fields[fieldName] &&
      props.fields[fieldName].validation
    ) {
      newError = props.fields[fieldName].validation!.rule(
        values,
        fieldName,
        props.fields[fieldName].validation!.args
      );
    }

    // errors[fieldName] = newError;
    setErrors({ ...errors, [fieldName]: newError })

    return newError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      const submitSuccess: boolean = await submitForm();

      setSubmitSuccess(submitSuccess);
    }
  }

  const validateForm = (): boolean => {
    const errors: IErrors = {};
    Object.keys(props.fields).map((fieldName: string) => {
      errors[fieldName] = validate(fieldName);
    });

    setErrors(errors);
    return !haveErrors(errors);
  }

  const submitForm = async (): Promise<boolean> => {
    try {
      const response = await fetch(props.action, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(values)
      });
      if (response.status === 400) {
        /* Map the validation errors to IErrors */
        let responseBody: any;
        responseBody = await response.json();
        const errors: IErrors = {};
        Object.keys(responseBody).map((key: string) => {
          // For ASP.NET core, the field names are in title case - so convert to camel case
          const fieldName = key.charAt(0).toLowerCase() + key.substring(1);
          errors[fieldName] = responseBody[key];
        });
        setErrors(errors);
      }
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  const context: IFormContext = {
    values,
    errors,
    submitSuccess,
    setValues: setValues,
    validate: validate
  }

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleSubmit} noValidate={true}>
        <div className="container">

          {props.render()}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={haveErrors(errors)}
            >
              Submit
          </button>
          </div>

          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was Successfully submittedd!
            </div>
          )}

          {submitSuccess === false &&
            haveErrors(errors) && (
              <div className="alert alert-danger" role="alert">
                Sorry, the form is invalid, Please review, adjust and try again
              </div>
            )}
        </div>
      </form>
    </FormContext.Provider>
  );
}
