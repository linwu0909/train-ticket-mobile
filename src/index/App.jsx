import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';

import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';

import { h0 } from '../common/fp';

import {
    exchangeFromTo,
    hideCitySelector,
    showCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
} from './actions';
function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        highSpeed,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);
    const cbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector,
                hideCitySelector,
            },
            dispatch
        );
    }, []);

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideCitySelector,
                fetchCityData,
                onSelect: setSelectedCity,
            },
            dispatch
        );
    }, []);

    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, []);

    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }
        if (day < h0()) {
            return;
        }
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, []);

    return (
      <div className="App">
        <div className="header-wrapper">
          <Header title="火车票" onBack={onBack} />
        </div>
        <form action="./query.html" className="form">
          <Journey from={from} to={to} {...cbs} />
          <DepartDate time={departDate} {...departDateCbs} />
          <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
          <Submit />
        </form>
        <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
        <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />
      </div>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
