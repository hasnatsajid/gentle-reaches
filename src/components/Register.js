import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Alert,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux"; // API to connect component state to redux store
import PropTypes from "prop-types";
import { buttonClicked, isLoading } from "../actions/uiActions";
import { Link } from "react-router-dom";
import { register } from "../actions/authActions";
import "./style.css";
import Web3API from "web3";
import Modals from "./Modals";
import { withTranslation } from "react-i18next";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      msg: "",
      address: "",
      key: "",
      isModalShow: false,
    };
  }

  static propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    button: PropTypes.bool,
    register: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  // Removes sign in and register buttons from homepage
  // upon mounting of Register component
  componentDidMount() {
    this.props.buttonClicked();
    this.handleWeb3Token();
  }

  componentDidUpdate(prevProps, prevState) {
    const status = this.props.status;

    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "REGISTER_FAIL") {
        this.setState({ msg: status.statusMsg });
      } else {
        this.setState({ msg: this.props.status.statusMsg });
      }
    }

    // Redirects to Log In screen after a delay of 2secs if successfully registered
    if (status.id === "REGISTER_SUCCESS") {
    }
  }

  // Sets the value of the input fields to the state items of the same name
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Calls action to register user
  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, address, key } = this.state;

    const user = { name, email, password, address, key };
    this.props.isLoading();
    this.props.register(user, () => {
      this.handleModal();
    });
  };

  handleWeb3Token = () => {
    const web3 = new Web3API(new Web3API.providers.HttpProvider("https://mainnet.infura.io"));
    let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    let wallet = web3.eth.accounts.wallet.add(account);
    let keystore = wallet.encrypt(web3.utils.randomHex(32));

    var address = account.address;
    var key = account.privateKey;

    this.setState({
      address,
      key,
    });
  };

  handleModal = () => {
    this.setState({
      isModalShow: !this.state.isModalShow,
    });
  };

  handleClearState = () => {
    this.setState({
      address: "",
      key: "",
      isModalShow: false,
    });
  };

  render() {
    let className = "divStyle";

    const { t, i18n } = this.props;


    // If HTTP 400 error, render alert with red color, else if
    // it is 200 OK, render alert in green
    let alert;
    if (this.state.msg && this.props.status.respCode >= 400) {
      alert = <Alert color="danger">{this.state.msg}</Alert>;
    } else if (this.state.msg && this.props.status.respCode === 200) {
      alert = (
        <Alert color="success">
          {this.state.msg} <br /> Redirecting to Log In screen
        </Alert>
      );
    }

    if (!this.props.button) {
      className = "formStyle";
    }
    return (
      <div className={className}>
        <Card>
          <CardBody style={{backgroundColor: '#000000'}}>
            <CardTitle>
              <h2>
                <strong>{t("register")} </strong>
              </h2>
            </CardTitle>
            <CardSubtitle className="text-muted">
              {t("already")} 
              <Link to="/login"> {t("login")}  </Link>
            </CardSubtitle>
            <br />
            {alert}
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="text-center">
                <Label for="name">{t("name")} </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={t("enteryourname")} 
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />

                <Label for="email">{t("email")} </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("enteryouremail")}
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />

                <Label for="password">{t("password")} </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("enteryourpassword")} 
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
                <Button color="dark" className="mt-5" size="lg" block>
                  {this.props.loading ? (
                    <span>
                      Registering.. <Spinner size="sm" color="light" />
                    </span>
                  ) : (
                    <span>{t("register")} </span>
                  )}
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        <Modals
          isOpen={this.state.isModalShow}
          toggle={this.handleModal}
          keys={this.state.key}
          address={this.state.address}
          handleClearState={this.handleClearState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  button: state.ui.button,
  status: state.status,
  loading: state.ui.loading,
});

export default connect(mapStateToProps, { register, isLoading, buttonClicked })(
  withTranslation()(Register)
);
