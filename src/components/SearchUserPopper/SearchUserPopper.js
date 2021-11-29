import React, {
  useState, useEffect, useCallback,
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { debounce } from 'lodash';

import { MAX_EMAIL_LENGTH } from 'constants/validator';
import { DEBOUNCE_INPUT_TIME } from 'constants/time';

import { userService } from 'services';
import { useRecoilValue } from 'recoil';
import { User } from 'recoils/user/atom';

import PopperMaterial from 'components/Shared/PopperMaterial';
import MemberItem from 'components/Shared/MemberItem';
import * as Styled from './SearchUserPopper.styled';

const propTypes = {
  anchorEl: PropTypes.any,
  emailList: PropTypes.arrayOf(PropTypes.string),
  email: PropTypes.string,
  allowNonLuminUser: PropTypes.bool,
  disabled: PropTypes.bool,
  onItemClick: PropTypes.func,
  selected: PropTypes.bool,
  triggerAdd: PropTypes.bool,
  setSelected: PropTypes.func,
  clearInput: PropTypes.func,
};

const defaultProps = {
  anchorEl: null,
  emailList: [],
  email: '',
  allowNonLuminUser: false,
  disabled: false,
  onItemClick: () => {},
  selected: false,
  triggerAdd: false,
  setSelected: () => {},
  clearInput: () => {},
};

const emailSchema = Yup.string().email();

function SearchUserPopper(props) {
  const {
    anchorEl,
    emailList,
    email,
    allowNonLuminUser,
    disabled,
    onItemClick,
    selected,
    triggerAdd,
    setSelected,
    clearInput,
  } = props;

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setSearchedUser] = useState(null);

  const owner = useRecoilValue(User);

  const isValidEmail = email && emailSchema.isValidSync(email) && (email.length <= MAX_EMAIL_LENGTH);

  const setUserHOF = (searchEmail, value) => {
    if (value) {
      setSearchedUser({
        ...value,
        nonLuminUser: false,
      });
      return;
    }

    if (allowNonLuminUser) {
      setSearchedUser({
        email: searchEmail,
        nonLuminUser: true,
      });
      return;
    }
    setSearchedUser(null);
  };

  const debounceSearchUser = useCallback(debounce(async (text) => {
    try {
      setLoading(true);
      const result = await userService.searchUserByEmail({ email: text });

      unstable_batchedUpdates(() => {
        setVisible(true);
        setLoading(false);
        setUserHOF(text, result);
      });
    } catch (e) {
      unstable_batchedUpdates(() => {
        setVisible(false);
        setLoading(false);
      });
    }
  }, DEBOUNCE_INPUT_TIME), []);

  useEffect(() => {
    if (!disabled && isValidEmail) {
      debounceSearchUser(email);
    } else {
      setVisible(false);
      setSearchedUser(null);
    }
  }, [email, debounceSearchUser, disabled]);

  const onItemClickHOF = (userData) => {
    setVisible(false);
    clearInput();
    onItemClick(userData);
  };

  useEffect(() => {
    if (user) {
      onItemClickHOF(user);
    }
  }, [triggerAdd]);

  const isAddedMember = (email) => emailList.includes(email);

  const renderContent = () => {
    if (!user && !allowNonLuminUser) {
      return <Styled.NoUserFoundText>No user found</Styled.NoUserFoundText>;
    }

    if (!user && allowNonLuminUser) {
      const added = isAddedMember(email) || email === owner.email;
      return <MemberItem
        disabled={added}
        description={email}
        onClick={() => onItemClickHOF({ email })}
        suffix={added && <Styled.AddedText>Added</Styled.AddedText>}
      />;
    }

    const isAdded = isAddedMember(user.email) || email === owner.email;
    return (
      <MemberItem
        disabled={isAdded}
        name={user.name}
        description={user.email}
        selected={selected}
        setSelected={setSelected}
        onClick={() => onItemClickHOF(user)}
        suffix={isAdded && <Styled.AddedText>Added</Styled.AddedText>}
      />
    );
  };

  return (
    <PopperMaterial
      open={visible}
      anchorEl={anchorEl}
      clickAwayHandler={() => setVisible(false)}
    >
      <Styled.Container $width={anchorEl?.clientWidth} $minHeight={anchorEl?.clientHeight}>
        {loading ? (
          <Styled.LoadingContainer>Loading...</Styled.LoadingContainer>
        ) : (
          renderContent()
        )}
      </Styled.Container>
    </PopperMaterial>
  );
}

SearchUserPopper.propTypes = propTypes;
SearchUserPopper.defaultProps = defaultProps;

export default SearchUserPopper;
