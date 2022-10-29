import React, { Component } from 'react'
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
  Spinner
} from "reactstrap";
import { connect } from "react-redux"; // API to connect component state to redux store
import PropTypes from "prop-types";
import { buttonClicked,isLoading } from "../actions/uiActions";
import { login } from "../actions/authActions";

import { Link } from 'react-router-dom'
import './style.css';
import { withTranslation } from "react-i18next";


class Login extends Component {

  state = {
    email: "",
    password: "",
    msg: ""
  }

  static propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    button: PropTypes.bool,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    status: PropTypes.object.isRequired,
    loading: PropTypes.bool
  };

  componentDidMount() {
    this.props.buttonClicked();
}

componentDidUpdate(prevProps) {
      const status = this.props.status;

     if (status !== prevProps.status) {

      if (status.id === "LOGIN_FAIL") {
        this.setState({ msg: status.statusMsg });
      }
    }
};


onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

onSubmit = (e) => {
    e.preventDefault();

    const { email, password} = this.state;

    const user = { email, password};
    this.props.isLoading();
    this.props.login(user);
  };


  render() {

    let className = 'divStyle';
    if (!this.props.button) {
      className = 'formStyle';
    }

    const { t, i18n } = this.props;

    return (
      <div className={className}>

            <Card style={{backgroundColor: '#000000'}} >
                <CardBody style={{backgroundColor: '#000000'}} >
                  <CardTitle> <h2><strong>{t("login")}</strong></h2></CardTitle>
                <CardSubtitle className="text-muted">{t("donthaveanaccount")}
                <Link to="/register"> {t("register")} </Link></CardSubtitle>
                <br/>
                {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
                  <Form onSubmit={this.onSubmit} >
                  <FormGroup>

                    <Label for="email">{t("email")}</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      size="lg"
                      placeholder={t("enteryouremail")}
                      className="mb-3"
                      onChange={this.onChange}
                    />

                    <Label for="password">{t("password")}</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      size="lg"
                      placeholder={t("enteryourpassword")}
                      className="mb-3"
                      onChange={this.onChange}
                    />
                    <Button size="lg" color="dark" style={{ marginTop: "2rem" }} block>
                       { this.props.loading ?
                       <span >{t("Logging in..")} <Spinner size="sm" color="light" /></span> : <span>{t("login")}</span>}
                    </Button>
                  </FormGroup>
                </Form>
                </CardBody>
            </Card>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({ //Maps state element in redux store to props
  //location of element in the state is on the right and key is on the left
  button: state.ui.button, //store.getState().ui.button another way to get button bool
  isAuthenticated: state.auth.isAuthenticated,
  status: state.status,
  loading: state.ui.loading
});

export default connect(mapStateToProps, { login, isLoading, buttonClicked })(
  withTranslation()(Login)
);
