import React, { Component } from 'react';

import UserDetailsGrid from '../user-details-grid/user-details-grid';
import UserForm from '../user-form/user-form';
import Loader from '../helperComponents/loader'

export default class userDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { userDetails: [], showUserDetails: true, loading: false, selectedUser: '', operation: '', alertType: '', alertMessage: '' };
        this.setUserSection = this.setUserSection.bind(this);
        this.modifyOrSaveUserDetails = this.modifyOrSaveUserDetails.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails() {
        this.setState({ loading: true });
        fetch("http://localhost:3004/employees")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        userDetails: result,
                        loading: false,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                        loading: false,
                        alertType: 'alert-danger',
                        alertMessage: 'Failed to fetch user details. Please try again !!'
                    });
                }
            )
    }

    setUserSection(type) {
        this.setState({
            showUserDetails: !this.state.showUserDetails,
            selectedUser: '',
            operation: '',
            alertMessage: (type==='modify')?this.state.alertMessage:''
        })
    }

    handleEdit(user) {
        this.setState({ selectedUser: user, operation: 'edit', showUserDetails: !this.state.showUserDetails, alertMessage: '' })
    }

    handleDelete(user) {
        user.operation = 'delete';
        this.modifyOrSaveUserDetails(user);
    }


    modifyOrSaveUserDetails(formData) {
        this.setState({ loading: true, alertMessage: '' });
        let url = '', method = '', alertMessage = '';
        if (formData.operation === 'edit') {
            url = `http://localhost:3004/employees/${formData.id}/`;
            method = 'PUT';
            alertMessage = "Update";
        } else if (formData.operation === 'delete') {
            url = `http://localhost:3004/employees/${formData.id}/`;
            method = 'DELETE';
            alertMessage = "Delete";
        } else {
            url = 'http://localhost:3004/employees';
            method = 'POST';
            alertMessage = "Save";

        }
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        loading: false,
                        alertType: 'alert-success',
                        alertMessage: `${alertMessage}d user successfullay !!`,
                        selectedUser: '',
                        operation: ''
                    });
                    this.getUserDetails();
                    (formData.operation !== 'delete') && this.setUserSection('modify');
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                        loading: false,
                        alertType: 'alert-danger',
                        alertMessage: `Failed to ${alertMessage} user. Please try again !!`,
                        selectedUser: '',
                        operation: ''
                    });
                }
            )
    }


    render() {
        return (
            <div className=''>
                {this.state.loading && <Loader></Loader>}
                {this.state.alertMessage && <div class={`alert ${this.state.alertType} mt-4`} role="alert">
                    {this.state.alertMessage}
                </div>
                }
                <h2>User Details</h2>

                {this.state.showUserDetails &&
                    (
                        <>
                            <div class="text-left mb-4 mt-4"><button type="button" class="btn btn-primary" onClick={this.setUserSection}>Create New User</button></div>
                            <UserDetailsGrid userData={this.state.userDetails} handleEdit={user => this.handleEdit(user)} handleDelete={user => this.handleDelete(user)}></UserDetailsGrid>
                        </>

                    )
                }
                {!this.state.showUserDetails &&
                    (
                        <UserForm userData={this.state.userDetails} lastId={this.state.userDetails.length} onSave={this.modifyOrSaveUserDetails} handleBack={this.setUserSection} userDetails={this.state.selectedUser} operation={this.state.operation}></UserForm>
                    )
                }
            </div>
        )
    }
}