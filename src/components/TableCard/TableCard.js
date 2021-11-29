import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import * as CardState from 'constants/cardState.constant';
import * as Role from 'constants/role.constant';

import { teamService } from 'services';
import { GameState } from 'recoils/gameState/atom';
import { User } from 'recoils/user/atom';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';
import Swal from 'sweetalert2';
import Crown from 'assets/images/crown.png';

import * as Styled from './TableCard.styled';

const propTypes = {
  column: PropTypes.bool,
  row: PropTypes.bool,
  user: PropTypes.object,
  teamId: PropTypes.string,
  inResultModal: PropTypes.bool,
};

const defaultProps = {
  column: false,
  row: false,
  inResultModal: false,
  user: null,
  teamId: '',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function TableCard(props) {
  const { isHost, isCountingDown, countDownShowCards } = useRecoilValue(GameState);
  const { user, teamId, inResultModal } = props;
  const thisUser = useRecoilValue(User);
  const handlePingUser = async (userId) => {
    if (isHost && thisUser.email !== user.email) {
      try {
        await teamService.pingUser(teamId, userId);
        Alert.success('Notified User!');
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
  };
  const handleTransferHostMember = async (userId) => {
    if (isHost) {
      try {
        Swal.fire({
          title: '<strong>Confirm</strong>',
          html: '<b>Do you want this member to host ?</b>',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: 'green',
          reverseButtons: true,
          focusConfirm: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await teamService.changeHost({ teamId, userId });
            } catch (err) {
              const error = getErrorMessage(err);
              Alert.error(error);
            }
          }
        });
      } catch (err) {
        const error = getErrorMessage(err);
        Alert.error(error);
      }
    }
  };
  const renderPingCard = () => (
    !inResultModal && isHost && thisUser.email !== user.email && isCountingDown &&
    <Styled.PingTooltip title="Ping teammate!" placement="top">
      <Styled.TableCardContainer onClick={() => handlePingUser(user.userId)} host empty />
    </Styled.PingTooltip>
  );
  const renderSetHostCard = () => {
    if (isHost && !user.isHost) {
      return (
        !inResultModal && !isCountingDown && !countDownShowCards &&
        <Styled.PingTooltip title="Set member to host!" placement="top">
          <Styled.TableCardContainer onClick={() => handleTransferHostMember(user.userId)} empty host spectator={user.role === Role.SPECTATOR}>
            {user.role === Role.SPECTATOR && <Styled.VisibilityIcon />}
          </Styled.TableCardContainer>
        </Styled.PingTooltip>
      );
    }
    return (
      <Styled.TableCardContainer spectator={user.role === Role.SPECTATOR} empty>
        {user.role === Role.SPECTATOR && <Styled.VisibilityIcon />}
      </Styled.TableCardContainer>
    );
  };
  return (
    <Styled.TableCardWrapper row={props.row} column={props.column} crown={user.isHost}>
      {user.isHost && <Styled.CrownImage src={Crown} />}
      {(user.cardState === CardState.NOT_PICK ?
        (renderPingCard() || renderSetHostCard() || <Styled.TableCardContainer empty />) :
        <Styled.TableCardContainer>
          <Styled.TableCardDownwardContainer downward={user.cardState === CardState.PICKED && !user.point && user.point !== 0}>
            <Styled.CardValueSideWrapper>
              <Styled.CardValueSide>
                {user.point}
              </Styled.CardValueSide>
            </Styled.CardValueSideWrapper>
            <Styled.CardPictureSideWrapper>
              <Styled.CardPictureSide />
            </Styled.CardPictureSideWrapper>
          </Styled.TableCardDownwardContainer>
        </Styled.TableCardContainer>)}
      {user.more && inResultModal ?
        <Styled.MoreMemberTooltip title={user.more.join('\r\n')} placement="bottom">
          <Styled.TextPlayerName>
            {!inResultModal ? user.name : user.render}
          </Styled.TextPlayerName>
        </Styled.MoreMemberTooltip> :
        <Styled.TextPlayerName>
          {!inResultModal ? user.name : user.render}
        </Styled.TextPlayerName>}
    </Styled.TableCardWrapper>
  );
}

TableCard.propTypes = propTypes;
TableCard.defaultProps = defaultProps;

export default TableCard;
