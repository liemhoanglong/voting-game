import React from 'react';
import PropTypes from 'prop-types';

import InputMaterial from 'components/Shared/InputMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import { userService } from 'services';

import { LocalStorageKey } from 'constants/localStorage';
import * as Styled from './UpgradePlanningModal.styled';

const propTypes = {
  setStep: PropTypes.func,
  setLoading: PropTypes.func,
  planChoices: PropTypes.string,
  setClientSecret: PropTypes.func,
  setBillingDetails: PropTypes.func,
  billingDetails: PropTypes.object,
};

const defaultProps = {
  setStep: () => { },
  setLoading: () => { },
  planChoices: '',
  setClientSecret: () => { },
  setBillingDetails: () => { },
  billingDetails: null,
};

const PersonalDetailForm = (props) => {
  const {
    setStep, setLoading, planChoices, setClientSecret, setBillingDetails, billingDetails,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { clientSecret, stripeCustomerId } = await userService.createSubscription({ priceId: planChoices });
      localStorage.setItem(LocalStorageKey.STRIPE_CUSTOMER_ID, stripeCustomerId);
      setClientSecret(clientSecret);
    } catch (error) {
      console.log(error);
    }
    // Block native form submission.
    setLoading(false);
    setStep(3);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <Styled.ContentP><b>Personal details </b></Styled.ContentP>
      <br />
      <InputMaterial
        label="Name"
        variant="outlined"
        fullWidth
        autoFocus
        type="text"
        placeholder="Jane Doe"
        name="name"
        value={billingDetails.name}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, name: e.target.value });
        }}
        required
      />
      <InputMaterial
        label="Email"
        variant="outlined"
        fullWidth
        autoFocus
        type="email"
        placeholder="janedoe@gmail.com"
        name="email"
        value={billingDetails.email}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, email: e.target.value });
        }}
        required
      />
      <InputMaterial
        label="Phone"
        variant="outlined"
        fullWidth
        autoFocus
        type="tel"
        placeholder="(941) 555-0123"
        name="tel"
        value={billingDetails.phone}
        onChange={(e) => {
          if (Number.isNaN(Number(e.target.value)) || e.target.value.length > 10) return;
          return setBillingDetails({ ...billingDetails, phone: e.target.value });
        }}
        required
      />
      <center>
        <ButtonMaterial
          type="submit"
          style={{ width: 300 }}
        >
          Next: Payment detail
        </ButtonMaterial>
      </center>
    </form>
  );
};

PersonalDetailForm.propTypes = propTypes;
PersonalDetailForm.defaultProps = defaultProps;

export default PersonalDetailForm;
