import React, { Component } from 'react';

export default class UserDetailsGrid extends Component {

  constructor(props) {
    super(props);
    this.state = { userDetails: [] };
  }


  render() {
    return <table class="table">
      <thead>
        <tr>
          <th scope="col">Id </th>
          <th scope="col">Name </th>
          <th scope="col">Date Of Birth </th>
          <th scope="col">Country</th>
          <th scope="col">State</th>
          <th scope="col">City</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.props.userData.map((item, i) => (
           <tr>
           <th scope="row">{item.CandidateId}</th>
           <td>{item.Name}</td>
           <td>{item.DateOfBirth}</td>
           <td>{item.CurrentCountry}</td>
           <td>{item.CurrentState}</td>
           <td>{item.CurrentCity}</td>
           <td><button type="button" class="btn btn-link" onClick={e =>this.props.handleEdit(item)}>Edit</button><button type="button" class="btn btn-link" onClick={e =>this.props.handleDelete(item)}>Delete</button></td>
         </tr>
        ))}
      </tbody>
    </table>;
  }
}