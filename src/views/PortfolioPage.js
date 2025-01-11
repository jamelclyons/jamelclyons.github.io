import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from './components/LoadingComponent';
import PortfolioComponent from './components/portfolio/PortfolioComponent';
import StatusBarComponent from './components/StatusBarComponent';
var PortfolioPage = function (_a) {
    var user = _a.user, portfolio = _a.portfolio;
    var portfolioLoading = useSelector(function (state) { return state.portfolio; }).portfolioLoading;
    useEffect(function () {
        document.title = "Portfolio - ".concat(user.name);
    }, []);
    if (portfolioLoading) {
        return _jsx(LoadingComponent, {});
    }
    return (_jsx("section", { className: "portfolio", children: _jsx(_Fragment, { children: portfolio ? (_jsx(PortfolioComponent, { portfolio: portfolio })) : (_jsx(StatusBarComponent, {})) }) }));
};
export default PortfolioPage;
