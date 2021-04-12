import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../component/header/Header';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";
import { notification } from 'antd';
import { connect } from 'react-redux';
// import SuggestCandidate from '../screen/suggest-candidate/SuggestCandidate';
import { recieveNotificate } from "../service/action/FirebaseAction";
import { store } from 'react-notifications-component';

class Layout extends Component {

    componentDidMount = () => {
        const messaging = firebase.messaging()
        messaging.getToken({ vapidKey: 'BCzV0OJHq4w2DQyltsiIxhhiM7Ce4yLOujK-1QRgWkmjUloUxEPRkvp2PgtvuRQ0nj8rVe1OTIcA2eKTIbEZE2w' })
            .then(token => {
                if (token)
                    this.props.recievedNoti(token)
            })
        messaging.onMessage((payload) => {
            this.showNotificate(payload.notification)
        });
    }

    showNotificate = (messaging) => {
        store.addNotification({
            title: messaging.title,
            message: messaging.body,
            type: "info",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
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
    render() {
        return (
            <div>
                <Header />
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
        }
    }
}
export default connect(null, map)(Layout);