import styled from 'styled-components';

export const ContentH4 = styled.h4`
  font-size: 24;
  margin: 0;
`;

export const ContentP = styled.p`
  font-size: 18px;
  margin: 10px 0 0;
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PriceWrapperLeft = styled.div`
  display: flex;
`;

export const PriceUpSellSpan = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 10px;
  justify-content: space-between;
  p {
    margin: 0;
    font-size: 18px;
  }
`;

export const PriceSpan = styled.div`
  font-size: 56px;
  font-weight: 600;
`;

export const ListItem = styled.div`
  margin-top: 10px;
  display: flex;
  svg {
    margin-right: 10px;
    color: #3993FF;
  }
`;

export const ContentPListItem = styled.p`
  font-size: 18px;
  margin: 0;
`;

export const BillWrapper = styled.div`
  padding: 40px;
  background-color: #f1f1f1;
  border-radius: 15px;
`;

export const WrapperPlan = styled.div`
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  padding: 24px;
`;

export const ButtonTransparentBorder = styled.button`
  background-color: transparent;
  color: #3993ff;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: #ebf4ff;
  }
`;

export const ButtonTransparent = styled.button`
  background-color: transparent;
  color: #3993ff;
  border: none;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  :hover {
    color: #74b3ff;
  }
`;

export const PriceTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
