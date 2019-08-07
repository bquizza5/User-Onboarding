import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const OnboardingForm = ({ errors, touched, values, status }) => {
    const [ users, setUsers] = useState([])

    useEffect(() => {
    
    if (status) {
      setUsers([...users, status])
    }
    }, [status]);

  return (
    <div>
      <h1>Onboarding</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="text" name="password" placeholder="password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}


        <label className="checkbox-container">
          Terms and Conditions
          <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <span className="checkmark" />
        </label>
        {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}


        <button type="submit">Submit!</button>
      </Form>
      {users.map(user => {
          return <p>{user.name}<p>;
      })}
    </div>
  );
};


const FormikOnboardingForm = withFormik({
  mapPropsToValues({ email, password, name, terms }) {
    return {
      terms: terms || false,
      name: name || '',
      email: email || '',
      password: password || '',
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    terms: Yup.bool().oneOf([true], 'Field must be checked')
  }),

  handleSubmit(values, {setStatus}) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {setStatus(res.data);})
      .catch(err => console.log(err.response));
  }
})(OnboardingForm);

export default FormikOnboardingForm;
