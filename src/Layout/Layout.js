import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../component/header/Header';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";
import { connect } from 'react-redux';
import { recieveNotificate, sendNotificate } from "../service/action/firebase/FirebaseAction";
import { fetchProject } from '../service/action/project/ProjectAction';
import moment from 'moment';
import { notification } from 'antd';
import { history } from '../service/helper/History';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notiList: [],
            title: '',
            body: '',
            newest: [],
            number: 0
        }
    }

    componentDidMount = () => {
        const fb = firebase.database().ref('fir-4d2be-default-rtdb')
        fb.on('value', snapshot => {
            var notiObj = snapshot.val()
            var temp = [], notiNewest = []
            var newest = {}
            var { number } = this.state
            number = 0

            for (let id in notiObj) {
                if (notiObj[id].topic === 'news') {
                    temp.push({ id, ...notiObj[id] })
                    if (notiObj[id].status) {
                        newest = { id, ...notiObj[id] }
                        notiNewest.push(newest)
                        number++
                    }
                }
            }
            temp = temp.sort((a, b) => { return moment(b.dateCreate).diff(a.dateCreate) })
            this.setState({ notiList: temp, newest: notiNewest, number: number })
        })
    }

    showContent = (RouteList) => {
        var result = null;
        if (RouteList.length > 0) {
            result = RouteList.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact} render={route.main} />
                )
            });
        }
        return <Switch> {result} </Switch>
    }

    onSeen = (id, status, option) => {
        if (status) {
            const fb = firebase.database().ref('fir-4d2be-default-rtdb').child(id)
            fb.update({ status: false })
            if (option === 'single') {
                history.push('/project')
                this.props.fetchProject();
                notification.destroy()
            }
        }
    }

    render() {
        return (
            <div>
                <Header notiList={this.state.notiList}
                    newest={this.state.newest}
                    number={this.state.number}
                    onSeenNoti={this.onSeen}
                />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <NavBar />
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                {this.showContent(RouteList)}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
const map = (dispatch) => {
    return {
        recievedNoti: (token) => {
            dispatch(recieveNotificate(token))
        },
        sendNoti: (pm, body) => {
            dispatch(sendNotificate(pm, body))
        },
        fetchProject: () => {
            dispatch(fetchProject(1, '', true))
        }
    }
}
export default connect(null, map)(Layout);