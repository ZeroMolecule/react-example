import React, { PureComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { fetchPokemon } from 'store/pokemon';
import store from 'store';
import { REQUEST_STATUS } from 'constants';

export const ACTIONS = {
  FETCH_ALL_POKEMON: ['GET_POKEMON', fetchPokemon],
};

const requestData = (...actions) => (WrappedComponent) => {
  class RequestDataComponent extends PureComponent {
    unsubscribe = null;
    state = {
      status: REQUEST_STATUS.PENDING
    };

    componentDidMount () {
      this.storeListener();
      this.fetchData();
    }

    componentWillUnmount () {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    fetchData = () => {
      this.unsubscribe = store.subscribe(this.storeListener);
      actions.forEach(([, action]) => {
        store.dispatch(action());
      });
    };

    storeListener = () => {
      const state = store.getState();
      let actionsStatus = [];
      actions.forEach(([actionName]) => {
        actionsStatus.push(state.status[actionName] || REQUEST_STATUS.PENDING);
      });

      if (actionsStatus.some(item => item === REQUEST_STATUS.PENDING)) {
        this.setState({
          status: REQUEST_STATUS.PENDING
        });
      } else if (actionsStatus.some(item => item === REQUEST_STATUS.REJECTED)) {
        this.setState({
          status: REQUEST_STATUS.REJECTED
        });
      } else {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
        this.setState({
          status: REQUEST_STATUS.FULFILLED
        });
      }
    };

    render () {
      if (this.state.status === REQUEST_STATUS.FULFILLED) {
        const {forwardedRef, ...props} = this.props;
        return <WrappedComponent ref={forwardedRef} {...props}/>;
      }
      return null;
    }
  }

  hoistNonReactStatic(RequestDataComponent, WrappedComponent);

  return React.forwardRef((props, ref) => {
    return <RequestDataComponent {...props} forwardedRef={ref}/>;
  });
};

export default requestData;
