import * as React from 'react';

import { Form, Field, IFields, required, isEmail } from '../common';

const LoginForm: React.SFC = () => {
  const fields: IFields = {
    name: {
      id: "name",
      label: "Name",
      validation: { rule: required }
    },
    email: {
      id: "email",
      label: "Email",
      validation: { rule: isEmail }
    }
  }

  return (
    <Form
      action="#"
      fields={fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Enter the information below and we'll get back to you as soon as we can.
          </div>
          <Field {...fields.name} />
          <Field {...fields.email} />
        </React.Fragment>
      )}
    />);
}

export default LoginForm;