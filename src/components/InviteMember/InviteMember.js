import React, {
  useMemo, useRef, useState, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';
import { Scrollbars as Scrollbar } from 'react-custom-scrollbars';

import { ERROR_INVALID_EMAIL } from 'constants/message';
import { TeamRole } from 'constants/team';

import { Team } from 'recoils/team/atom';
import { teamService } from 'services';

import ModalLayout from 'layouts/ModalLayout';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import SearchUserPopper from 'components/SearchUserPopper';
import MemberList from './components/MemberList';
import * as Styled from './InviteMember.styled';

const validationSchema = Yup.object().shape({
  memberEmail: Yup.string()
    .email(ERROR_INVALID_EMAIL),
});

const propTypes = {
  teamId: PropTypes.string,
  closeModal: PropTypes.func,
};

const defaultProps = {
  teamId: '',
  closeModal: () => { },
};

const InviteMember = forwardRef((props, ref) => {
  const { teamId, closeModal } = props;

  const {
    handleSubmit, formState, control, setValue,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      memberEmail: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const inputRef = useRef(null);
  const team = useRecoilValue(Team);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [triggerAdd, setTriggerAdd] = useState(false);

  const allTeamUsers = team.users.map((eachUser) => ({ email: eachUser.email, name: eachUser.name, role: eachUser.role }));

  const allUsers = useMemo(() => [...members], [members]);

  const emailList = useMemo(() => allUsers.concat(allTeamUsers).map(({ email }) => email), [allUsers]);

  const getMember = (email) => {
    const foundIndex = members.findIndex((m) => m.email === email);
    return [members[foundIndex], foundIndex];
  };

  const removeMember = (index) => {
    const removedMembers = [...members];
    removedMembers.splice(index, 1);
    setMembers(removedMembers);
  };

  const updateMemberRole = (index, role) => {
    const updateMembers = [...members];
    updateMembers[index].role = role;
    setMembers(updateMembers);
  };

  const updateMember = ({ data, role }) => {
    const newMembers = [...members];
    newMembers.push({
      userId: data.userId,
      email: data.email,
      name: data.name,
      role,
    });
    setMembers(newMembers);
  };

  const addMember = (data) => {
    const [existed] = getMember(data.email);

    if (!existed) {
      updateMember({ data, role: TeamRole.MEMBER });
    }
  };

  const handleInviteMember = async () => {
    try {
      closeModal();
      setLoading(true);
      await teamService.inviteToTeam({
        teamId,
        members: allUsers.map(({ email, role }) => ({ email, role })),
      });
      setLoading(false);
    } catch (error) {
      const message = getErrorMessage(error);
      Alert.error(message);
    }
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const handleKeyDownEmail = (e) => {
    if (e.keyCode === 38) {
      e.preventDefault();
      setSelectedEmail(false);
    } else if (e.keyCode === 40) {
      e.preventDefault();
      setSelectedEmail(true);
    } else if (e.code === 'Enter' && selectedEmail) {
      e.preventDefault();
      setTriggerAdd(!triggerAdd);
    }
  };

  const styles = {
    width: '100%',
    height: '100%',
    marginBottom: '16px',
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      modalName="Invite member"
      ref={ref}
    >
      <form onSubmit={handleSubmit((handleInviteMember))} onKeyDown={(e) => checkKeyDown(e)}>
        <Controller
          name="memberEmail"
          control={control}
          render={({ field }) => (
            <>
              <InputMaterial
                label="Add member"
                type="text"
                onKeyDown={handleKeyDownEmail}
                errorMessage={formState.errors.memberEmail?.message}
                variant="outlined"
                fullWidth
                inputRef={inputRef}
                autoFocus
                autoComplete="off"
                {...field}
              />
              <SearchUserPopper
                emailList={emailList}
                email={field.value}
                visible={Boolean(field.value)}
                anchorEl={inputRef?.current}
                onItemClick={addMember}
                selected={selectedEmail}
                setSelected={setSelectedEmail}
                triggerAdd={triggerAdd}
                clearInput={() => setValue('memberEmail', '')}
              />
            </>
          )}
        />
        <Scrollbar
          style={styles}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="calc(100vh - 10px)"
          hideTracksWhenNotNeeded
        >
          <Styled.MemberListWrapper>
            <MemberList allUsers={allUsers} updateMemberRole={updateMemberRole} removeMember={removeMember} />
          </Styled.MemberListWrapper>
        </Scrollbar>

        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || loading || allUsers.length === 0}
        >
          Send invitation
        </ButtonMaterial>
      </form>
    </ModalLayout>
  );
});

InviteMember.propTypes = propTypes;
InviteMember.defaultProps = defaultProps;

export default InviteMember;
