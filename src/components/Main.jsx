import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import bank from '../assets/bank.gif';

import Header from './Header';
import AccountList from './AccountList';
import Logo from '../svg/Logo';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount = () => {
    const updatePublicKey = () => 'public_key_qWCwNJcVPT2jMY105s7K6bUDm3gixoXkf94ZrR8F';
    const updateOauthKey = () => 'oauth_snMDtxJzhaLR13BIEAFNSiqjdXkYZ0uvowpyrKC4';
    const updateUserId = () => '5cdca3d814ddee0064a05b17';
    window.SynapseMain({ updatePublicKey, updateOauthKey, updateUserId });
    console.log(document.getElementById('the_iframe').style.display);
  }

  componentDidUpdate = () => {
    document.getElementById('the_iframe').style.display;
    console.log(document.getElementById('the_iframe').style.display);
  }

  render() {
    const accounts = [
      { bank_name: 'chase', logo: 'Logo' },
      { bank_name: 'bank of america', logo: 'Logo' },
      { bank_name: 'bank of west', logo: 'Logo' },
    ];

    return (
      <div className="main-container">
        <Header />
        <div className="main-left-child">
          <div className="welcome">Welcome to the Bank Logins demo.</div>
          <button id="link-button-iframe" className="iframe-btn" type="button">Link an Account </button>
          <AccountList accounts={accounts} />
        </div>
        <div className="main-right-child" style={{ float: 'right' }}>
          <div><img className="bank-gif" src={bank} alt="gif" /></div>
        </div>
      </div>
    );
  }
}

export default Main;
