import React, { Component, useState, useEffect } from 'react';
import { FiArrowUp, FiArrowDown, FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './style.css';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { buttonReset } from '../actions/uiActions';
import { withTranslation } from 'react-i18next';
import './styles/profile.css';

export class Profile extends Component {
  static propTypes = {
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { result: 0, resultKrw: 0, kutBalance: 0, address: '', username: '', modal: false, private_key: '' };
    // added
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  componentDidMount() {
    this.handleGetResult();
  }

  handleGetResult = async () => {
    let res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=klayuniverse&vs_currencies=usd')
      .then((response) => response.json())
      .then((data) => {
        const { user } = this.props.authState;
        const balance = Number(user?.balance);
        const address = user?.address;
        const username = user?.name;
        const initialTokenValuelUsd = 650 / 1422.81;
        const privatekey = user?.pkey;
        console.log(privatekey);

        this.setState({
          result: Number(data?.klayuniverse.usd) * balance,
          resultKrw: Number(data?.klayuniverse.usd) * balance * 1422.81,
          revenue: (Number(data?.klayuniverse.usd) / initialTokenValuelUsd) * 100,
          kutBalance: 1 * balance,
          walletAddress: address,
          username: username,
          private_key: privatekey,
        });
      });
  };

  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    const { user } = this.props.authState;
    const { t, i18n } = this.props;

    return (
      <div className="container">
        <div className="main">
          {/* <div className="profile-page">
            <div className="header">
              <div className="title">KlayUniverse Wallet</div>
              <br></br> <br></br>
              <div className="balance-usd">{this.state?.private_key}</div>
              <div>{this.state?.username} </div>
              <div>{this.state?.walletAddress} </div>
              <div className="percentage">{`${parseInt(this.state?.revenue)} %  `} </div>
              <div className="balance">{`${this.state?.resultKrw.toLocaleString('en-US')} KRW  `}</div>
              <div className="balance-usd">{`${this.state?.result.toLocaleString('en-US')} USD  `}</div>
              <br></br>
              <div className="balance-usd">{this.state?.private_key}</div>
            </div>
            <div className="asset-container">
              <div className="button-container">
                <div className={'button'}>Assets</div>
              </div>
            </div>

            <section className="assets-display-section">
              <div className="token-image-container">
                <img alt="logo" src="img/20703.png" className={'token-image'} />
              </div>
              <div className="token-name">
                <span>{'Klay Universe Token'}</span>
              </div>
              <div className="token-value">
                <span>{`${this.state?.kutBalance} KUT  `}</span>
              </div>
            </section>
          </div> */}

          <div className="profile">
            <div className="settings">
              <FiSettings />
            </div>
            <h2>Health Money</h2>
            <p>No Health & No Wealth</p>
            <h1>47,741,600 KRW</h1>
            <p>33,200 USD</p>

            <div className="hero-img">
              <img src="/img/helm.png" alt="" />
            </div>

            <div className="icons">
              <div className="send">
                <div className="icon">
                  <FiArrowUp />
                </div>
                <p>Send assets</p>
              </div>
              <div className="receive">
                <div className="icon">
                  <FiArrowDown />
                </div>
                <p>Receive</p>
              </div>
            </div>
          </div>

          {/*<Table dark>
            <h5>{`KLAY UNIVERSE WALLET`} </h5>

            <br/> <br/>
            <h2>{`${this.state?.result.toLocaleString('en-US')} KRW  `} </h2>

            <h5>{`${this.state?.result.toLocaleString('en-US')} USD  `} </h5>
            <tbody>
            <tr>
              <th scope="row">
                <img alt="logo" src="img/20703.png" width={30}/>
              </th>
              <td>
                KlayUniverse Token
              </td>
              <td>
                {` ${user.balance.toLocaleString('en-US')} KUT`}
              </td>
              <td>
                {` ${this.state?.result.toLocaleString('en-US')} USD`}
              </td>
            </tr>

            </tbody>


          </Table>*/}
          {/* <Button size="lg" onClick={this.onLogout} color="primary">
                {t("logout")}
        </Button> */}

          {/* <Card>
            <CardBody style={{backgroundColor: '#000000'}}>
              <CardTitle>
                <h1>
                  {t("welcome")}, {user ? `, ${user.name}, ` : ""}{" "}
                  <span role="img" aria-label="party-popper">
                    🎉{" "}
                  </span>{" "}
                </h1>
              </CardTitle>
              <br />
              <CardSubtitle>
              <h5>{t("Lock-up balance")} {user ? ` : ${user.balance.toLocaleString('en-US')} KUT` : ""}{" "}</h5>
              <h5>{t("Lock-up value in USD")}  </h5>  <h5> : $ {this.state?.result.toLocaleString('en-US')} </h5>

              </CardSubtitle>
              <br />
              <CardTitle><h5 style={{ color: '#8dfcc4' }}>{t("1st Release")} :{user ? `  ${user.release1}` : ""} <span role="img" aria-label="party-popper"> </span> </h5></CardTitle>
              <CardTitle><h5 style={{ color: '#8dfcc4' }}>{t("2nd Release")} : {user ? ` ${user.release2}` : ""} <span role="img" aria-label="party-popper"> </span> </h5></CardTitle>
              <br />
              <CardSubtitle>
                <h5>{t("My Address")} : </h5> <h5 style={{ fontSize: "14px" }}>{user?.address} </h5>
              </CardSubtitle>
              <br />

              <div>
              <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}{t("Export Private Key")}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>{t("Warning : Never disclose this key.")}</ModalHeader>
                  <ModalBody style={{ fontSize: "12px" }}>{user?.key}</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>{t("Close")}</Button>{' '}
                  </ModalFooter>
                </Modal>

              </div>
              <br />
              <br />


              <Button size="lg" onClick={this.onLogout} color="primary">
                {t("logout")}
              </Button>
            </CardBody>
          </Card> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth,
});

export default connect(mapStateToProps, { logout, buttonReset })(withTranslation()(Profile));
