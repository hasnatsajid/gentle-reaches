import React, { Component , useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, CardTitle, CardSubtitle, CardBody, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter , Spinner, Table } from "reactstrap";
import PropTypes from "prop-types";
import "./style.css";
import { Redirect } from "react-router-dom";
import { logout } from "../actions/authActions";
import { buttonReset } from "../actions/uiActions";
import { withTranslation } from "react-i18next";

// const MyPage = ({ navigation }) => {
//   const [apiData, setApiData] = useState("")
//   const [input, setInput] = useState("")
//   const [myCode, setMycode] = useState("")

//   useEffect(() => {
//       fechData()
//   }, [])

//   const fechData = () => {
//       // console.log(connector.accounts[0])
//       fetch("https://deep-index.moralis.io/api/v2/nft/0x88B48F654c30e99bc2e4A1559b4Dcf1aD93FA656/88846892087309742083104175898609124048292990441697004883777971123010660204545?format=decimal&chain=rinkeby", {
//           method: "GET",
//           headers: {
//               "x-api-key": '9ZYc2Epu1lmPKdHQ18iouaYbwBBVHxDK3t70AArvLxu6T1zl0NpnRbtweXHGw6qZ',
//               "Accept": "application/json",
//           },
//       }).then(async (res) => {
//           console.log("---->", JSON.stringify(res))
//           let json = await res.json()
//           let da = {
//               ...json,
//               metadata: JSON.parse(json.metadata)
//           }


//           setApiData(da)
//       })
//           .catch((err) => {
//               // alert('failed')
//               // alert("errwedo", JSON.stringify(err))
//           })
//   }
// }



export class Profile extends Component {
  static propTypes = {
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };





  constructor(props) {
    super(props);

    this.state = { result: 0, modal: false };
    // added
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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
    let res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=klayuniverse&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        const { user } = this.props.authState;
        const balance = Number(user?.balance);

        this.setState({
          result: Number(data?.klayuniverse.usd) * balance,
        });
      });
  };



  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { user } = this.props.authState;
    const { t, i18n } = this.props;

    return (
      <div className="container">
        <div className="main">
          {/* <img alt='logo' src="img/logo_white.png" width={100} /> */}
          <br /> <br />

          <Table dark>
          <h5>{`KLAY UNIVERSE WALLET` } </h5>

          <br /> <br />
          <h2>{`${this.state?.result.toLocaleString('en-US')} KRW  ` } </h2>

          <h5>{`${this.state?.result.toLocaleString('en-US')} USD  ` } </h5>
          <tbody>
            <tr>
              <th scope="row">
                <img alt='logo' src="img/20703.png" width={30} />
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



        </Table>
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



export default connect(mapStateToProps, { logout, buttonReset })(
  withTranslation()(Profile));
