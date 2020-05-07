import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Field, IFields, required, isEmail } from '../common';

const LoginForm: React.SFC<RouteComponentProps> = ({ history }) => {
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
      action="new/user"
      fields={fields}
      changeRoute={() => history.replace('/chat')}
      render={() => (
        <React.Fragment>
          <Field {...fields.name} />
          <Field {...fields.email} />
        </React.Fragment>
      )}
    />
  );
}

export default LoginForm;