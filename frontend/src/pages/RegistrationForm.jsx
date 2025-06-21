
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Fullname is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone must be 10 to 15 digits')
        .required('Phone is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://prodmanager-egeb.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: values.fullname,
            email: values.email,
            phone: values.phone,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        alert('✅ Registration successful!');
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
        <h3 className="form-title">Sign Up</h3>
        <form onSubmit={formik.handleSubmit} className="registration-form">
          {[
            { name: 'fullname', type: 'text', placeholder: 'Fullname' },
            { name: 'email', type: 'email', placeholder: 'Email' },
            { name: 'phone', type: 'text', placeholder: 'Phone' },
            { name: 'password', type: 'password', placeholder: 'Password' },
            { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
