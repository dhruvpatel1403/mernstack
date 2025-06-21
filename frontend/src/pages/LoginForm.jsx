import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://prodmanager-egeb.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Save token to localStorage
        localStorage.setItem('token', data.token);

        alert('✅ Login successful!');
        resetForm();
      } catch (error) {
        alert('❌ Error: ' + error.message);
      }
    },
  });

  return (
    <div className="registration-page">
      <div className="registration-card">
        <div className="registration-header">
          <div className="logo">🅿</div>
          <h2>Product Hunt</h2>
        </div>
        <h3 className="form-title">Login</h3>
        <form onSubmit={formik.handleSubmit} className="registration-form">
          {[
            { name: 'email', type: 'email', placeholder: 'Email' },
            { name: 'password', type: 'password', placeholder: 'Password' },
          ].map(({ name, type, placeholder }) => (
            <div key={name} className="form-group">
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={formik.touched[name] && formik.errors[name] ? 'error-input' : ''}
              />
              {formik.touched[name] && formik.errors[name] && (
                <p className="error-text">{formik.errors[name]}</p>
              )}
            </div>
          ))}

          <button type="submit" className="submit-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
