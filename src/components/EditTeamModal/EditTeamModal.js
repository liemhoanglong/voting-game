import PropTypes from 'prop-types';
import React, { useForm, Controller } from 'react-hook-form';
import * as _ from 'lodash';
import { useRecoilState } from 'recoil';
import { useState, lazy } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@material-ui/core';

import { Team } from 'recoils/team/atom';
import InputMaterial from 'components/Shared/InputMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';

import axios from 'axios';

import env from 'constants/environment';
import * as Styled from './EditTeamModal.styled';

const ModalLayout = lazy(() => import('layouts/ModalLayout'));

const validationSchema = Yup.object().shape({
  name: Yup.string(),
});
const propTypes = {
  name: PropTypes.string,
  teamId: PropTypes.string,
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

const defaultProps = {
  name: '',
  teamId: '',
  openModal: false,
  closeModal: () => { },
};
function EditTeamModal(props) {
  const {
    name, teamId, openModal, closeModal,
  } = props;
  const [team, setTeam] = useRecoilState(Team);
  const [selectFile, setSelectFile] = useState(null);
  const classes = Styled.ButtonSaveModalIssueStyles();
  const {
    handleSubmit, control,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name,
    },
    InputProps: { readOnly: false },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async ({ name }) => {
    const formData = new FormData();
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const input = { name, teamId, file: null };
    const query = `
      mutation editTeam($input:EditTeamInput!){
        editTeam(input:$input){
          _id
          name
          createdBy
          votingSystem
          urlImage{
            url
            id
          }
        }
      }
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
    const data = await axios({
      url: env.GRAPHQL_API,
      method: 'post',
      data: formData,
      headers: config,
    });
    const dataReturn = data.data.data.editTeam;
    const tempData = _.cloneDeep(team);
    tempData.name = dataReturn.name;
    tempData.urlImage = dataReturn.urlImage;
    setTeam(tempData);
    closeModal();
  };
  return (
    <Modal open={openModal} onClose={closeModal}>
      <ModalLayout cardModal onClose={closeModal} closeModal={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Name</h2>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputMaterial
                label="Change name the team"
                variant="outlined"
                fullWidth
                autoFocus
                {...field}
              />
            )}
          />
          <input type="file" onChange={(e) => setSelectFile(e.target.files[0])} />
          <Styled.ButtonContainer>
            <ButtonMaterial classes={{ root: classes.root, label: classes.label }} fullWidth type="submit">Save</ButtonMaterial>
          </Styled.ButtonContainer>
        </form>
      </ModalLayout>
    </Modal>
  );
}

EditTeamModal.propTypes = propTypes;
EditTeamModal.defaultProps = defaultProps;

export default EditTeamModal;
