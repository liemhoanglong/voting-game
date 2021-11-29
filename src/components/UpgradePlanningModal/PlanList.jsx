import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import CheckIcon from '@material-ui/icons/Check';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import { DialogContent, Grid } from '@material-ui/core';

import * as Styled from './UpgradePlanningModal.styled';

const propTypes = {
  handleClose: PropTypes.func,
  setStep: PropTypes.func,
};

const defaultProps = {
  handleClose: () => { },
  setStep: () => { },
};

const PlanList = (props) => {
  const history = useHistory();
  return (
    <DialogContent style={{ padding: '0 56px' }}>
      <Styled.ContentH4 style={{ fontSize: 24, margin: 0 }}>Upgrade Planning Poker Online</Styled.ContentH4>
      <Styled.ContentP>Pay per month or year and cancel anytime.</Styled.ContentP>
      <br />
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Styled.WrapperPlan>
            <Styled.ContentH4 style={{ fontSize: 24, margin: 0 }}>Basic</Styled.ContentH4>
            <Styled.ContentP>For making planning poker sessions fun and efficient. Limited functionality.</Styled.ContentP>
            <Styled.PriceWrapper>
              <Styled.PriceSpan>$0</Styled.PriceSpan>
            </Styled.PriceWrapper>
            <Styled.ButtonTransparentBorder
              onClick={() => { props.handleClose(); history.push('/create-team'); }}
              style={{ width: '100%' }}
            >
              Create a free game now
            </Styled.ButtonTransparentBorder>
            <div style={{ marginTop: 66 }} />
            <Styled.ListItem>
              <Styled.ContentPListItem><b>Free with limits</b></Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem><b>Unlimited players</b></Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem><b>9</b> Votings per game</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem><b>5</b> Issues voted per game</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>JIRA integration</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>Unlimited games</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>Permanent game urls</Styled.ContentPListItem>
            </Styled.ListItem>
          </Styled.WrapperPlan>
        </Grid>
        <Grid item md={6}>
          <Styled.WrapperPlan style={{ borderTop: '5px solid #3993FF' }}>
            <Styled.ContentH4 style={{ fontSize: 24, margin: 0 }}>Premium</Styled.ContentH4>
            <Styled.ContentP>Best for organizations with one or multiple teams. Full functionality.</Styled.ContentP>
            <Styled.PriceWrapper>
              <Styled.PriceWrapperLeft>
                <Styled.PriceSpan>$30</Styled.PriceSpan>
                <Styled.PriceUpSellSpan>
                  <p><b>per <span style={{ borderBottom: '1px dashed' }}>facilitator</span>/ month</b></p>
                  <p>or 300$ billed yearly</p>
                </Styled.PriceUpSellSpan>
              </Styled.PriceWrapperLeft>
              {/* <p>popup icon</p> */}
            </Styled.PriceWrapper>
            <ButtonMaterial onClick={() => props.setStep(2)} style={{ width: '100%' }}>Start a 15-day trial</ButtonMaterial>
            <center>
              <div style={{ fontSize: 18, margin: '10px 0' }}>
                <span style={{ color: '#A8AEB2' }}>or</span> <Styled.ButtonTransparent onClick={() => props.setStep(2)}>purchase now</Styled.ButtonTransparent>
              </div>
            </center>
            <Styled.ListItem>
              <Styled.ContentPListItem><b>Everything in Basic, plus</b></Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem><b>Unlimited</b> Votings per game</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem><b>Unlimited</b> Issues voted per game</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>Access your created games and history. Resume games at any time.</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>Add or remove facilitators at any time</Styled.ContentPListItem>
            </Styled.ListItem>
            <Styled.ListItem>
              <CheckIcon />
              <Styled.ContentPListItem>Cancel at any time</Styled.ContentPListItem>
            </Styled.ListItem>
          </Styled.WrapperPlan>
        </Grid>
      </Grid>
      <br />
    </DialogContent>
  );
};

PlanList.propTypes = propTypes;
PlanList.defaultProps = defaultProps;

export default PlanList;
