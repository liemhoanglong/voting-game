import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Slide, Grid, FormGroup, FormControlLabel,
  Checkbox, Divider,
} from '@material-ui/core';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Loading from 'components/Loading';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import StartGame from 'assets/svgs/start-game.svg';
import { MONTH_PRODUCT_ID, YEAR_PRODUCT_ID } from 'constants/upgradePlan.constant';
import { LocalStorageKey } from 'constants/localStorage';

import environment from 'constants/environment';
import CheckoutForm from './CheckoutForm';
import PlanList from './PlanList';
import PersonalDetailForm from './PersonalDetailForm';
import * as Styled from './UpgradePlanningModal.styled';

const stripePromise = loadStripe(environment.STRIPE_PUBLIC_API);

const propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const defaultProps = {
  open: false,
  handleClose: () => { },
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function UpgradePlanningDialog(props) {
  const history = useHistory();

  // 1: plan list, 2: personal detail, 3: payment, 4: invoice
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [planChoices, setPlanChoices] = useState(MONTH_PRODUCT_ID);
  const [clientSecret, setClientSecret] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    email: localStorage.getItem(LocalStorageKey.EMAIL) ? localStorage.getItem(LocalStorageKey.EMAIL) : '',
    phone: '',
    name: localStorage.getItem(LocalStorageKey.NAME) ? localStorage.getItem(LocalStorageKey.NAME) : '',
  });

  const handleClose = () => {
    setStep(1);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="Pop-up-pricing-plan"
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        style: { borderRadius: '1.6rem' },
      }}
    >
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
        {
          step > 1 && step < 4 && (
            <IconButton
              aria-label="close"
              onClick={() => setStep((prevStep) => (prevStep - 1))}
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )
        }
        <br />
        {
          props.handleClose ? (
            <IconButton
              aria-label="close"
              onClick={props.handleClose}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null
        }
      </DialogTitle>
      {
        loading &&
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgb(0,0,0,.5)',
            zIndex: 1,
            height: '100%',
            width: '100%',
          }}
        >
          <Loading />
        </div>
      }
      {step === 1 && <PlanList setStep={setStep} />}
      {
        step > 1 && step < 4 &&
        <DialogContent style={{ padding: '0 56px' }}>
          <h2 style={{ marginTop: 0 }}>Create premium account</h2>
          <Grid container spacing={5}>
            <Grid item md={6}>
              {
                step === 2 &&
                <PersonalDetailForm
                  setStep={setStep}
                  setLoading={setLoading}
                  planChoices={planChoices}
                  setClientSecret={setClientSecret}
                  billingDetails={billingDetails}
                  setBillingDetails={setBillingDetails}
                />
              }
              {
                step === 3 &&
                <>
                  <Styled.ContentPListItem><b>Card details</b></Styled.ContentPListItem>
                  <br />
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      setStep={setStep}
                      setLoading={setLoading}
                      clientSecret={clientSecret}
                      billingDetails={billingDetails}
                    />
                  </Elements>
                </>
              }
            </Grid>
            <Grid item md={6}>
              <Styled.BillWrapper style={{ padding: 40 }}>
                <Styled.ContentPListItem><b>Premium plan</b></Styled.ContentPListItem>
                <p><b>Billing cycle</b></p>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={planChoices === MONTH_PRODUCT_ID}
                        onChange={() => { setPlanChoices(MONTH_PRODUCT_ID); }}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        name="checkedH"
                        style={{ color: '#0095FF' }}
                      />
                    }
                    label={
                      planChoices === MONTH_PRODUCT_ID ? <span><b>Monthly ($30/month)</b></span>
                        : <span>Monthly ($30/month)</span>
                    }
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={planChoices === YEAR_PRODUCT_ID}
                        onChange={() => { setPlanChoices(YEAR_PRODUCT_ID); }}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        name="checkedH"
                        style={{ color: '#0095FF' }}
                      />
                    }
                    label={
                      <>
                        {
                          planChoices === YEAR_PRODUCT_ID ? <span><b>Yearly ($300/year)</b></span>
                            : <span>Yearly ($300/year)</span>
                        }
                        <span
                          style={{
                            color: '#0095FF', fontSize: 14, fontWeight: '500', backgroundColor: '#D7E9FF', padding: 5, borderRadius: 2, marginLeft: 15,
                          }}
                        >SAVE 16%
                        </span>
                      </>
                    }
                  />
                </FormGroup>
                <br />
                <Divider />
                <br />
                <Styled.PriceTotalWrapper>
                  <span><b>Total today:</b></span>
                  <span><b>$0</b></span>
                </Styled.PriceTotalWrapper>
                <Styled.PriceTotalWrapper>
                  <span>After trial:</span>
                  <span>$30/month</span>
                </Styled.PriceTotalWrapper>
                <div style={{ textAlign: 'right' }}>
                  Starting {
                    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toString().split(' ').slice(1, 4)
                      .join(' ')
                  }
                </div>
              </Styled.BillWrapper>
            </Grid>
          </Grid>
          <br />
        </DialogContent>
      }
      {
        step === 4 &&
        <DialogContent>
          <center>
            <h2>Thanks for your purchase</h2>
            <img src={StartGame} alt="start game" />
            <br />
            <br />
            <ButtonMaterial
              onClick={() => { setStep(1); props.handleClose(); history.push('/create-team'); }}
            >
              Start game now!
            </ButtonMaterial>
          </center>
          <br />
        </DialogContent>
      }
      <DialogActions />
    </Dialog>
  );
}

UpgradePlanningDialog.propTypes = propTypes;
UpgradePlanningDialog.defaultProps = defaultProps;

export default UpgradePlanningDialog;
