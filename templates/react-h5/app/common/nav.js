// 在这个地方引入按需加载的组件
// lazyload components here

import HomePage from 'pages/Home/loadable';

const nav = [
  {
    title: 'home',
    route: '/',
    component: HomePage,
    // child: [
    //   {
    //     title: 'Sub1',
    //     route: '/page1/sub1',
    //     component: loadComponent(Sub1)
    //   }, {
    //     title: 'Sub2',
    //     route: '/page1/sub2',
    //     component: loadComponent(Sub2)
    //   }
    // ]
  },
];
export default nav;
