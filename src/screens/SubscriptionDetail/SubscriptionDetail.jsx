import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from 'components/Loading';
import Header from 'components/Header';

import { userService } from 'services';

import * as Styled from './SubscriptionDetail.style';

function SubscriptionDetail() {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState(null);
  const history = useHistory();

  const subscription = history.location.pathname.split('/')[2];

  useEffect(() => {
    if (!subscription) return;
    const getBillByStripe = async () => {
      try {
        setLoading(true);
        const res = await userService.getSubscriptionInvoices({ subscription });
        setInvoices(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getBillByStripe();
  }, []);

  return (
    <>
      <Header reverse />
      <Styled.InvoiceListContainer>
        <h1>Subscription Detail</h1>
        {
          loading ?
            <>
              <Loading />
              <center style={{ marginTop: 150, marginBottom: 100 }}><h3>Getting subscriptions from Stripe...</h3></center>
            </>
            :
            <>
              {
                invoices && invoices.map((invoice) => (
                  <Styled.InvoiceContainer key={invoice.number}>
                    {invoice.number}
                    <p>{Math.floor(invoice.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    <p>
                      {(new Date(invoice.created * 1000)).toString().split(' ').slice(0, 5)
                        .join(' ')}
                    </p>
                    <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noreferrer">Invoice by STRIPE</a>
                  </Styled.InvoiceContainer>
                ))
              }
            </>
        }
      </Styled.InvoiceListContainer>
    </>
  );
}

export default SubscriptionDetail;
