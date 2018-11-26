import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
// 建议使用BrowserRouter，这里为了配合使用history而采用Router
// BrowserRouter first,here is for history via Router component.
import { Router, Route } from 'react-router-dom';
import { Picker, Button } from 'antd-mobile';
import nav from './common/nav';
import history from './common/history';
import { changeLang } from './i18n';
import './common/global.scss';

class AppLayout extends React.Component {
  state = {
    lng: 'zh-cn',
  };

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

  onLocaleChange = (val) => {
    const lng = val[0];
    changeLang(lng);
    this.setState({ lng });
  };
  // eslint-disable-next-line
  getRoute = navs => navs.map(ele => {
    if (ele.child) {
      return this.getRoute(ele.child);
    }
    if (ele.component) {
      return (
        <Route
          key={ele.route}
          exact
          path={ele.route}
          component={ele.component}
        />
      );
    }
  });

  render() {
    const lngs = [
      { label: '中', value: 'zh-cn' },
      { label: 'EN', value: 'en' },
    ];
    const { lng } = this.state;
    const routes = this.getRoute(nav);
    return (
      <Router history={history}>
        <div>
          <Picker
            data={lngs}
            cols={1}
            value={[lng]}
            title="选择语言"
            onChange={(val) => {
              this.setState({ lng: val });
            }}
            onOk={this.onLocaleChange}
          >
            <Button>{lng}</Button>
          </Picker>
          {routes}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => ({ locale: 'zh' });
// changeLocale
export default translate('global')(connect(mapStateToProps)(AppLayout));
