import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { translate } from 'react-i18next';
import withImmutable from 'with-immutable';
import {
  Input, Button, List, Spin, Icon,
} from 'antd';

import { searchUsersGithubRepo, changeUsername } from './action';
import homeReducer from './reducer';
import saga from './saga';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    repoData: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    repoData: [],
  }

  onSearchClickHandle = () => {
    const { dispatch, name } = this.props;
    // eslint-disable-next-line
    dispatch && dispatch(searchUsersGithubRepo(name));
  };

  onInputChangeHandle = (e) => {
    const { value } = e.target;
    const { dispatch } = this.props;
    // eslint-disable-next-line
    dispatch && dispatch(changeUsername(value));
  };

  render() {
    const {
      name, repoData, loading, error, t,
    } = this.props;
    return (
      <div>
        <Input
          value={name}
          style={{ width: 200, display: 'inline-block', marginRight: 20 }}
          onChange={this.onInputChangeHandle}
        />
        <Button type="primary" icon="search" onClick={this.onSearchClickHandle}>
          {t('home.search')}
        </Button>
        <Spin indicator={antIcon} style={{ paddingTop: 30, width: '100%' }} spinning={loading}>
          {repoData
            && !error && (
              <List
                bordered
                dataSource={repoData}
                renderItem={item => (
                  <List.Item>
                    {' '}
                    <a rel="noopener noreferrer" target="_blank" href={item.html_url}>
                      {item.full_name}
                    </a>
                    {' '}
                  </List.Item>
                )}
              />
          )}
          {error && <div>{error.message}</div>}
        </Spin>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   name: makeSelectUsername(),
//   repoData: makeSelectRepos(),
//   loading: makeSelectLoading(),
//   error: makeSelectError()
// })

const mapStateToProps = (state) => {
  const home = state.get('home');
  return {
    name: home.get('name'),
    repoData: home.get('repoData'),
    loading: home.get('loading'),
    error: home.get('error'),
  };
};

const withConnect = connect(mapStateToProps);
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
