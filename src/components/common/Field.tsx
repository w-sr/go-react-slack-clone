import * as React from "react";
import { IValues, IErrors, FormContext, IFormContext } from "./Form";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args: any) => string;
  args?: any;
}

export interface IFieldProps {
  id: string;
  label?: string;
  editor?: Editor;
  options?: string[];
  value?: any;
  validation?: IValidation;
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value
}) => {

  const getError = (errors: IErrors): string => (errors ? errors[id] : "");

  const getEditorStyle = (errors: IErrors): any =>
    getError(errors) ? { borderColor: "red" } : {};

  return (
    <FormContext.Consumer>
      {(context: IFormContext) => (
        <div className="form-group">
          {label && <label htmlFor={id}>{label}</label>}

          {editor!.toLowerCase() === "textbox" && (
            <input
              id={id}
              type="text"
              value={value}
              style={getEditorStyle(context.errors)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                context.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "multilinetextbox" && (
            <textarea
              id={id}
              value={value}
              style={getEditorStyle(context.errors)}
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                context.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={() => context.validate(id)}
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "dropdown" && (
            <select
              id={id}
              name={id}
              value={value}
              style={getEditorStyle(context.errors)}
              onBlur={() => context.validate(id)}
              className="form-control"
            >
              {options &&
                options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}

          {getError(context.errors) && (
            <div style={{ color: "red", fontSize: "80%" }}>
              <p>{getError(context.errors)}</p>
            </div>
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};

Field.defaultProps = {
  editor: "textbox"
};