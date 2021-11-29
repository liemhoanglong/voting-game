import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

import ButtonMaterial from 'components/Shared/ButtonMaterial';

const propTypes = {
  setStep: PropTypes.func,
  setLoading: PropTypes.func,
  clientSecret: PropTypes.string,
  billingDetails: PropTypes.object,
};

const defaultProps = {
  setStep: () => { },
  setLoading: () => { },
  clientSecret: '',
  billingDetails: null,
};

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#8093A7',
      color: '#273d57',
      fontWeight: 500,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 16,
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: 'black',
      },
      '::placeholder': {
        color: '#8093A7',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: 'ffc7ee',
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = (props) => {
  const {
    setStep, setLoading, clientSecret, billingDetails,
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    setLoading(true);
    // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      },
    });
    setLoading(false);
    if (error) {
      console.log('[error]', error);
      setError(error);
    } else {
      // console.log('[paymentIntent]', paymentIntent);
      setLoading(false);
      setStep(4);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label htmlFor="card-element">
        <div
          style={{
            border: `2px solid ${error ? '#ff3d71' : '#c0d0df'}`, borderRadius: 4, padding: '14px 16px', marginBottom: 20,
          }}
        >
          <CardElement
            id="card-element"
            options={CARD_OPTIONS}
            onChange={(e) => {
              setError(e.error);
            }}
          />
        </div>
      </label>
      {error && <p style={{ color: '#ff3d71' }}>{error.message}</p>}
      <center>
        <ButtonMaterial
          type="submit"
          style={{ width: 200 }}
        >
          Purchase
        </ButtonMaterial>
      </center>
    </form>
  );
};

CheckoutForm.propTypes = propTypes;
CheckoutForm.defaultProps = defaultProps;

export default CheckoutForm;
