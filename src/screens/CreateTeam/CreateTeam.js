import React, {
  useMemo, useRef, useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { Scrollbars as Scrollbar } from 'react-custom-scrollbars';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { TeamRole } from 'constants/team';
import { ERROR_NAME_IS_REQUIRED, ERROR_INVALID_EMAIL } from 'constants/message';
import env from 'constants/environment';

import { User } from 'recoils/user/atom';

import * as Alert from 'utils/alert.util';
import { getErrorMessage } from 'utils/messageError.utils';

import ModalPage from 'components/ModalPage';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import InputMaterial from 'components/Shared/InputMaterial';
import SearchUserPopper from 'components/SearchUserPopper';
import MemberList from './components/MemberList';
import * as Styled from './CreateTeam.styled';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(ERROR_NAME_IS_REQUIRED),
  adminEmail: Yup.string()
    .email(ERROR_INVALID_EMAIL),
  memberEmail: Yup.string()
    .email(ERROR_INVALID_EMAIL),
});

function CreateTeam() {
  const history = useHistory();
  const user = useRecoilValue(User);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [triggerAdd, setTriggerAdd] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const {
    handleSubmit, formState, control, setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      file: null,
      name: '',
      adminEmail: '',
      memberEmail: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const inputRef = useRef(null);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const allUsers = useMemo(() => [...members], [members]);

  const emailList = useMemo(() => allUsers.map(({ email }) => email), [allUsers]);

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
    newMembers.push({ email: data.email, name: data.name, role });
    setMembers(newMembers);
  };

  const addMember = (data) => {
    const [existed] = getMember(data.email);

    if (!existed) {
      updateMember({ data, role: TeamRole.MEMBER });
    }
  };
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const handleCreateTeam = async (data) => {
    const { name } = data;
    try {
      setLoading(true);
      const formData = new FormData();
      const input = {
        name,
        members: allUsers.map(({ email, role }) => ({ email, role })),
        adminEmail: user.email,
        file: null,
      };
      const query = `
        mutation createTeam($input: CreateTeamInput!) {createTeam(input : $input)}
      `;
      const operations = JSON.stringify({ query, variables: { input } });
      formData.append('operations', operations);
      const map = {
        0: ['variables.input.file'],
      };
      formData.append('map', JSON.stringify(map));
      if (selectFile) {
        const file = selectFile;
        formData.append('0', file);
      }
      const teamLink = await axios({
        url: env.GRAPHQL_API,
        method: 'post',
        data: formData,
        headers: config,
      });
      setLoading(false);
      if (teamLink.status === 200) {
        history.push(`/${teamLink.data.data.createTeam}`);
      }
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
  const handleOnChange = (e) => {
    if (e.target.files) {
      setSelectFile(e.target.files[0]);
    }
  };
  const styles = {
    marginTop: '10px',
    width: '100%',
    height: '100%',
    marginBottom: '16px',
  };

  return (
    <ModalPage
      modalName="Create Team"
    >
      <form onSubmit={handleSubmit((handleCreateTeam))} onKeyDown={(e) => checkKeyDown(e)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputMaterial
              label="Name"
              type="text"
              errorMessage={formState.errors.name?.message}
              variant="outlined"
              fullWidth
              autoFocus
              {...field}
            />
          )}
        />
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
        <div style={{ display: 'flex' }}>
          <input type="file" id="image" name="image" onChange={(e) => handleOnChange(e)} />
        </div>
        <Scrollbar
          style={styles}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="calc(100vh - 10px)"
          hideTracksWhenNotNeeded
        >
          <Styled.MemberListWrapper>
            <MemberList owner={{ ...user, role: 0 }} allUsers={allUsers} updateMemberRole={updateMemberRole} removeMember={removeMember} />
          </Styled.MemberListWrapper>
        </Scrollbar>
        <ButtonMaterial
          type="submit"
          fullWidth
          disabled={!formState.isValid || loading}
        >
          Create team
        </ButtonMaterial>
      </form>
    </ModalPage>
  );
}

export default CreateTeam;
