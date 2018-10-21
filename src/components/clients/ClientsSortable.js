import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class ClientsSortable extends Component {
  state = {
    totalOwed: null
  };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }
  priceFormatter = (cell, row) => {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  };
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <BootstrapTable data={clients} version="4">
          <TableHeaderColumn
            dataField="firstName + lastName"
            isKey
            dataSort={true}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="balance" dataSort={true}>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="balance"
            dataFormat={this.priceFormatter}
            dataSort={true}
          >
            Balance
          </TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientsSortable.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(ClientsSortable);
