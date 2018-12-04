import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { translate } from 'react-i18next';
import withImmutable from 'with-immutable';

import homeReducer from './reducer';
import saga from './saga';

class HomePage extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        {t('home.welcome')}
      </div>
    );
  }
}

const withConnect = connect();
const withReducer = injectReducer({ key: 'home', reducer: homeReducer });
const withSaga = injectSaga({ key: 'home', saga });

export default translate('pages')(
  compose(
    withReducer,
    withSaga,
    withConnect,
    withImmutable,
  )(HomePage),
);
