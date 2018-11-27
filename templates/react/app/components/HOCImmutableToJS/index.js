import React from 'react';
import { Iterable, is } from 'immutable';

// eslint-disable-next-line
const ImmutableToJS = WrappedComponent => {
  return class ImmutableComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      // debugger; //eslint-disable-line
      const thisProps = this.props || {};
      const thisState = this.state || {};
      // eslint-disable-next-line
      nextState = nextState || {};
      // eslint-disable-next-line
      nextProps = nextProps || {};

      // eslint-disable-next-line
      if (
        Object.keys(thisProps).length !== Object.keys(nextProps).length || // eslint-disable-line
        Object.keys(thisState).length !== Object.keys(nextState).length
      ) {
        return true;
      }
      // eslint-disable-next-line
      for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
          return true;
        }
      }
      // eslint-disable-next-line
      for (const key in nextState) {
        if (!is(thisState[key], nextState[key])) {
          return true;
        }
      }
      return false;
    }

    componentDidUpdate() {
      console.info('ImmutableToJS Update', WrappedComponent.name);
    }

    render() {
      const KEY = 0;
      const VALUE = 1;
      const propsJS = Object.entries(this.props).reduce(
        (newProps, wrappedComponentProp) => {
          // eslint-disable-next-line
          newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
            wrappedComponentProp[VALUE],
          )
            ? wrappedComponentProp[VALUE].toJS()
            : wrappedComponentProp[VALUE];
          return newProps;
        },
        {},
      );
      return <WrappedComponent {...propsJS} />;
    }
  };
};
export default ImmutableToJS;
