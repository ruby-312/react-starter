import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { fetchUsers } from '../../actions/index';

// function format(cell, row){
//   return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
// }
//Row select setting
var selectRowProp = {
  mode: "checkbox",  //checkbox for multi select, radio for single select.
  clickToSelect: true,   //click row will trigger a selection on that row.
  bgColor: "rgb(238, 193, 213)"   //selected row background color
};

class UsersPage extends Component {

  constructor(props) {
    super(props);

    this.props.fetchUsers();
	}

  render() {
  	const { users } = this.props;

  	if(users.length > 0) {
      return (
	  	  <BootstrapTable
		      data={users}
		      striped={true}
		      hover={true}
		      condensed={true}
		      pagination={true}
		      selectRow={selectRowProp}
		      insertRow={true}
		      deleteRow={true}
		      columnFilter={true}
		      search={true}>
	        <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true}>User ID</TableHeaderColumn>
	        <TableHeaderColumn dataField="email" dataSort={true} dataAlign="center">User Email</TableHeaderColumn>
	        <TableHeaderColumn dataField="role" dataAlign="center">User role</TableHeaderColumn>
	      </BootstrapTable>
	  	);
  	} else {
  		return (
  			<div>None Data</div>
  		);
  	}
    
  	
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.profile
  }
}

export default connect(mapStateToProps, { fetchUsers })(UsersPage);