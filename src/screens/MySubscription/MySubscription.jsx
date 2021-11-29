import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Chip, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Loading from 'components/Loading';
import Header from 'components/Header';
import * as Alert from 'utils/alert.util';

import { LocalStorageKey } from 'constants/localStorage';
import { MONTH_PRODUCT_ID } from 'constants/upgradePlan.constant';
import { userService } from 'services';

import * as Styled from './MySubscription.style';

function MySubscription() {
  const [loading, setLoading] = useState(false);
  const [billByStripe, setBillByStripe] = useState('');
  const [mySubscriptionList, setMySubscriptionList] = useState(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const stripeCustomerId = localStorage.getItem(LocalStorageKey.STRIPE_CUSTOMER_ID);
    if (stripeCustomerId === null) return;
    const getMySubscription = async () => {
      try {
        setLoading(true);
        const res = await userService.getUserSubscriptions({ customer: stripeCustomerId });
        setMySubscriptionList(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getMySubscription();
  }, [reset]);

  useEffect(() => {
    const stripeCustomerId = localStorage.getItem(LocalStorageKey.STRIPE_CUSTOMER_ID);
    if (stripeCustomerId === null) return;
    const getBillByStripe = async () => {
      try {
        setLoading(true);
        const res = await userService.getUserBillingByStripe({ customer: stripeCustomerId });
        setBillByStripe(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getBillByStripe();
  }, []);

  const handleReactivateSubscription = async (id) => {
    try {
      setLoading(true);
      const res = await userService.reactivateSubscription({ subscriptionId: id });
      setLoading(false);
      Alert.success(res);
      setReset(!reset);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCancelSubscription = async (id) => {
    try {
      setLoading(true);
      const res = await userService.cancelSubscription({ subscriptionId: id });
      setLoading(false);
      Alert.success(res);
      setReset(!reset);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Header reverse />
      <Styled.SubscriptionListContainer>
        <h1>My Subscription</h1>
        {
          loading ?
            <>
              <Loading />
              <center style={{ marginTop: 150, marginBottom: 100 }}><h3>Getting subscriptions from Stripe...</h3></center>
            </>
            :
            <>
              <a href={billByStripe} target="_blank" rel="noreferrer">View bill portal by STRIPE</a>
              {
                mySubscriptionList && mySubscriptionList.map((subscription) => {
                  const date = new Date(subscription.currentPeriodEnd * 1000).toString().split(' ');
                  const createDate = new Date(subscription.created * 1000).toString().split(' ');
                  let label = '';
                  let action = '';
                  if (subscription.status === 'incomplete') {
                    label = 'Incomplete';
                  } else if (subscription.cancelAtPeriodEnd) {
                    label = `Your plan will be canceled on ${date.slice(1, 3).join(' ')}, ${date.slice(3, 4)}`;
                    action = 'Reactivate';
                  } else {
                    label = 'Active';
                    action = 'Cancel';
                  }
                  return (
                    <Styled.SubscriptionContainer key={subscription.id}>
                      <div style={{ textAlign: 'left' }}>
                        <div>
                          <span>{subscription.priceId === MONTH_PRODUCT_ID ? '$30.00 / month ' : '$300.00 / year '}</span>
                          <Chip
                            label={label}
                            size="small"
                            color={`${label !== 'Active' ? 'default' : 'secondary'}`}
                          />
                        </div>
                        <div>
                          <span>{`Created ${createDate.slice(1, 3).join(' ')}, ${createDate.slice(3, 5).join(' ')}`}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                          action === 'Cancel' ?
                            <Styled.ButtonTransparentRed
                              onClick={() => handleCancelSubscription(subscription.id)}
                            >
                              {action}
                            </Styled.ButtonTransparentRed>
                            :
                            <Styled.ButtonTransparentBlue
                              onClick={() => handleReactivateSubscription(subscription.id)}
                            >
                              {action}
                            </Styled.ButtonTransparentBlue>
                        }
                        <Link to={`/subscription-detail/${subscription.id}`}>
                          <IconButton style={{ marginLeft: 20 }}>
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </div>
                    </Styled.SubscriptionContainer>
                  );
                })
              }
            </>
        }
      </Styled.SubscriptionListContainer>
    </>
  );
}

export default MySubscription;
