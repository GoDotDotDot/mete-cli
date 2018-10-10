import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { Layout, Menu, Select } from 'antd';
// 建议使用BrowserRouter，这里为了配合使用history而采用Router
// BrowserRouter first,here is for history via Router component.
import { Router, Route, Link } from 'react-router-dom';
import nav from './common/nav';
import history from './common/history';
import { changeLang } from './i18n';
import './common/global.scss';

const { Option } = Select;
const {
  Header, Sider, Footer, Content,
} = Layout;

const getDefaultSelectedKeys = (path) => {
  const flatPath = path.split('/').filter(_ => _);
  return [flatPath.length > 0 ? path : '/'];
};
class AppLayout extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  // constructor(props) {
  //   super(props);
  //   // this.hashChangeHandle = this.hashChangeHandle.bind(this);
  // }

  state = {
    lng: 'zh',
  };

  // hashChangeHandle() {
  //   window.scrollTo(0, 0);
  // }

  componentWillMount() {
    // if use HashRouter, the follow code will be uesfull
    // for auto scrolling page to the top of page.
    // window.addEventListener(
    //   "hashchange",
    //   this.hashChangeHandle,
    //   false
    // );
    if (history) {
      // const unlisten = history.listen((location, action) => {
      //   console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
      //   console.log(`The last navigation action was ${action}`);
      // });
      // unlisten()
    }
  }

  componentWillUnmount() {
    // window.removeEventListener('hashchange',this.hashChangeHandle)
  }

  languageChangeHandle = (lng) => {
    changeLang(lng);
    this.setState({ lng });
  };

  // eslint-disable-next-line
  getRoute = navs => navs.map((ele) => {
    if (ele.child) {
      return this.getRoute(ele.child);
    }
    if (ele.component) {
      return <Route key={ele.route} exact path={ele.route} component={ele.component} />;
    }
  });

  getMenuItem = navs => navs.map((ele) => {
    if (ele.child) {
      return (
        <Menu.SubMenu className="sub-menu" key={ele.route} title={ele.title}>
          {this.getMenuItem(ele.child)}
        </Menu.SubMenu>
      );
    }
    const { t } = this.props;
    return (
      <Menu.Item key={ele.route}>
        <Link to={ele.route}>{t(`menu.${ele.title}`)}</Link>
      </Menu.Item>
    );
  });

  render() {
    const { hash } = history.location;
    const { lng } = this.state;
    // eslint-disable-next-line
    const noPrefixHash = hash.replace(/\#/, '');
    return (
      <Router history={history}>
        <Layout style={{ height: '100%' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            className="cus-sider"
            width={250}
          >
            <div className="logo">
              <h1>METE DESIGN ADMIN</h1>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={getDefaultSelectedKeys(noPrefixHash)}
              defaultOpenKeys={[noPrefixHash]}
              className="menu"
            >
              {this.getMenuItem(nav)}
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: '#fff',
                padding: 0,
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
              }}
            >
              <Select
                value={lng}
                onChange={this.languageChangeHandle}
                style={{ float: 'right', transform: 'translate(-20px,50%)' }}
              >
                <Option value="en">English</Option>
                <Option value="zh">简体中文</Option>
              </Select>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.getRoute(nav)}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Mete Design ©2017 Created By Mete Design Group | More Be Found In
              {' '}
              <a href="https://github.com/GoDotDotDot/mete-cli">Github</a>
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

// AppLayout.contextTypes = {
//   history: PropTypes.any,
//   store:PropTypes.any
// };

const mapStateToProps = () => ({ locale: 'zh' });
// changeLocale
export default translate('global')(connect(mapStateToProps)(AppLayout));
