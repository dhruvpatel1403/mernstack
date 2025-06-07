import React from 'react';
import { Container, Card } from 'react-bootstrap';

function Contact() {
  return (
    <div
      style={{
        background: '#f5f5f5', 
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '56px', 
        boxSizing: 'border-box',
      }}
    >
      <Card
        className="shadow border-0"
        style={{
          width: '26rem',
          padding: '2rem',
          borderRadius: '1rem',
          textAlign: 'center',
          background: 'white',
        }}
      >
        <h4 className="fw-bold mb-3 text-primary">Get in Touch</h4>
        <p className="text-muted mb-2">
          <strong>Address:</strong><br />
          123 React Street, UI City, CA 90210
        </p>
        <p className="text-muted mb-2">
          <strong>Email:</strong><br />
          hello@prodmanage.com
        </p>
        <p className="text-muted">
          <strong>Phone:</strong><br />
          +1 (555) 123-4567
        </p>
      </Card>
    </div>
  );
}

export default Contact;
