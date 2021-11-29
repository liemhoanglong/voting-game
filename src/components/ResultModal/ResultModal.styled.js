import styled, { css } from 'styled-components';
import { Colors } from 'constants/styles';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  display: flex;
`;

export const CardSummary = styled.div`
  width: 600px;
  /* background-color: ${Colors.CLOUDY_BLUE};
  margin-right: 10px;
  padding: 10px 0 10px 0; */
`;

export const CardRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const BarContainer = styled.div`
  flex: 1;
`;

export const BarBackground = styled.div`
  height: 8px;
  width: 100%;
  background-color: ${Colors.WHITE_GREY};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin:20px 0px;
`;

export const BarFill = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  width: ${({ percentage }) => percentage || '0'};
  background-color: ${({ mostVoted }) => mostVoted && Colors.BLACK || Colors.GRAY_CHATEAU};
`;

export const Card = styled.div`
  border: 2px solid ${Colors.GRAY_CHATEAU};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 700;
  color: ${Colors.GRAY_CHATEAU};
  width: 36px;
  height: 60px;
  margin: 8px 0;
  margin-right: 8px;
  font-size: 18px;

  ${({ mostVoted }) => mostVoted &&
    css`
    border-color: ${Colors.BLACK};
    color: ${Colors.BLACK};
  `}
`;

export const VoteText = styled.div`
  // text-align: center;
  padding-left:25px;
  color: ${({ mostVoted }) => mostVoted && Colors.BLACK || Colors.GRAY_CHATEAU};
  font-weight: 500;
`;

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
`;

export const Title = styled.div`
  color: ${Colors.GRAY_CHATEAU};
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 12px;
`;

export const AverageValue = styled.div`
  color: ${Colors.BLACK};
  font-size: 28px;
  font-weight: 700;
  line-height: 28px;
`;

export const ButtonContainerResult = styled.div`
  margin:10px 0px 0px 15px;
  display: flex;
  flex-direction:column;
`;

export const RestartButtonStyles = makeStyles({
  root: {
    border: `2px solid ${Colors.CLOUDY_BLUE}`,
    backgroundColor: (props) => (props.restart ? Colors.CLOUDY_BLUE : Colors.WHITE),
    color: Colors.BLACK,
    marginTop: '12px',
    marginRight: '10px',
    '&:hover': {
      opacity: '0.7',
      backgroundColor: (props) => (props.restart ? Colors.CLOUDY_BLUE : Colors.WHITE),
    },
  },
  label: {
    fontWeight: 600,
  },
});
