import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class LanguageBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  handleChangeLang = (lan) => {
    this.props.i18n.changeLanguage(lan);
  };

  handleToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img alt="logo" src="img/20703.png" height="30"/>
          <Dropdown className="ml-4" isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
            <DropdownToggle caret>Select language ({i18n.language})</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  this.handleChangeLang("en");
                }}
              >
                English
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  this.handleChangeLang("kr");
                }}
              >
                한국어
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </>
    );
  }
}

export default withTranslation()(LanguageBtn);
