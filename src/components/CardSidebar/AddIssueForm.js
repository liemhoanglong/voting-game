import React from 'react';
import PropTypes from 'prop-types';

import InputMaterial from 'components/Shared/InputMaterial';
import ButtonMaterial from 'components/Shared/ButtonMaterial';
import * as Styled from './CardSidebar.styled';

const propTypes = {
  issueTitle: PropTypes.string,
  inputNewIssue: PropTypes.bool,
  setIssueTitle: PropTypes.func,
  addNewIssue: PropTypes.func,
  handleChangeInput: PropTypes.func,
  setInputNewIssue: PropTypes.func,

};

const defaultProps = {
  issueTitle: '',
  inputNewIssue: false,
  setIssueTitle: () => { },
  addNewIssue: () => { },
  handleChangeInput: () => { },
  setInputNewIssue: () => { },
};

function AddIssueForm(props) {
  const {
    issueTitle, inputNewIssue, setIssueTitle, addNewIssue, handleChangeInput, setInputNewIssue,
  } = props;

  const saveIssueButtonClasses = Styled.ConfirmIssueStyle({ value: 'save' });
  const cancelIssue = Styled.ConfirmIssueStyle();
  const defaultIssue = Styled.AddNewIssueStyle();

  return (
    <form onSubmit={addNewIssue}>
      <br />
      <InputMaterial
        label="New Issue Title"
        type="text"
        variant="outlined"
        fullWidth
        autoFocus
        autoComplete="off"
        value={issueTitle}
        onChange={handleChangeInput}
      />
      <Styled.SidebarHeader>
        <ButtonMaterial
          classes={{
            root: cancelIssue.root,
            label: defaultIssue.label,
          }}
          onClick={() => { setInputNewIssue(!inputNewIssue); setIssueTitle(''); }}
        >Cancel
        </ButtonMaterial>
        <ButtonMaterial
          classes={{
            root: saveIssueButtonClasses.root,
            label: saveIssueButtonClasses.label,
          }}
          type="submit"
        >Save
        </ButtonMaterial>
      </Styled.SidebarHeader>
    </form>
  );
}

AddIssueForm.propTypes = propTypes;
AddIssueForm.defaultProps = defaultProps;

export default AddIssueForm;
