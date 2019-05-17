/**
 * Created by win7 on 2018/11/15.
 */
import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Home from './conpoment/page/Home'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

export default class RouterMap extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
            <BrowserRouter>
                <Switch>
                     <Route path="/" exact component={Home} />
                </Switch>
            </BrowserRouter>
            </LocaleProvider>
        );
    }
}