import React, { Component } from 'react';



export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [
                {
                    name: "Germany",
                    states: [
                        {
                            name: "A",
                            cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"]
                        }
                    ]
                },
                { name: "Spain", states: [{ name: "B", cities: ["Barcelona"] }] },

                { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] }] },
                {
                    name: "Mexico",
                    states: [{ name: "D", cities: ["Puebla"] }]
                },
                {
                    name: "India",
                    states: [
                        { name: "E", cities: ["Delhi", "Kolkata", "Mumbai", "Bangalore"] },
                        { name: "Telangana", cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] }
                    ]
                }
            ],
            selectedState: [],
            selectedCity: [],
            name: this.props.userDetails.Name,
            dob: this.props.userDetails.DateOfBirth,
            maritalStatus: this.props.userDetails.MaritalStatus,
            country: this.props.userDetails.CurrentCountry,
            ste: this.props.userDetails.CurrentState,
            city: this.props.userDetails.CurrentCity,
            gender: this.props.userDetails.Gender,
            id:this.props.userDetails.id,
            formErrors: { nameError: '', dobError: '', maritalStatusError: '', countryError: '', stateError: '', cityError: '', genderError: '' },
            submitClicked:false
        };
        this.getStates = this.getStates.bind(this);
        this.getCities = this.getCities.bind(this);
        //this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if(this.props.operation ==='edit'){
            this.getStates(this.state.country, true);
        }
    }




    getStates(country, onload) {
        let states = this.state.countries.find((c) => c.name === country);
        if(onload){
            this.setState({
                selectedState: states.states,
                selectedCity: []
            },() => this.getCities(this.state.ste));
        }else{
            this.setState({
                selectedState: states.states,
                selectedCity: []
            });
        }
        
    }

    getCities(state) {
        let cities = this.state.selectedState.find((c) => c.name === state);
        this.setState({
            selectedCity: cities.cities
        });
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.state.submitClicked &&   this.validate());

    }

    validate() {
        let nameError = "";
        let dobError = "";
        let maritalStatusError = "";
        let countryError = "";
        let stateError = "";
        let cityError = "";
        let genderError = "";

        if (!this.state.name) {
            nameError = "Name field is required";
        }

        if (!this.state.dob) {
            dobError = "Date of birth field is required";
        }

        if (!this.state.maritalStatus) {
            maritalStatusError = "Marital Status field is required";
        }

        if (!this.state.country) {
            countryError = "Country field is required";
        }

        if (!this.state.ste) {
            stateError = "State field is required";
        }

        if (!this.state.city) {
            cityError = "City field is required";
        }

        if (!this.state.gender) {
            genderError = "Gender field is required";
        }

        if (nameError || dobError || maritalStatusError || countryError || stateError || cityError || genderError) {
            this.setState({ formErrors: { nameError, dobError, maritalStatusError, countryError, stateError, cityError, genderError } });
            return false;
        }else{
            this.setState({ formErrors: { nameError, dobError, maritalStatusError, countryError, stateError, cityError, genderError } });
        }

        return true;
    }



    submit() {
        this.setState({submitClicked:true});
        if (this.validate()) {
            console.warn(this.state);
            let formData = {
                CandidateId: (this.props.operation==='edit'?this.props?.userDetails?.CandidateId:this.props.lastId + 1),
                Name: this.state.name,
                DateOfBirth: this.state.dob,
                MaritalStatus: this.state.maritalStatus,
                Gender: this.state.gender,
                CurrentCountry: this.state.country,
                CurrentState: this.state.ste,
                CurrentCity: this.state.city,
                id: this.state.id,
                operation: this.props.operation
            }
            this.props.onSave(formData);
        }
    }



    render() {
        return (

            <div className='container text-left'>

                <div className='text-right'>{!this.state.showUserDetails && <button className='btn btn btn-link' onClick={this.props.handleBack}>Back</button>}</div>
                <form>
                    <div className="form-group">
                        <label for="name">Name :</label>{this.state.name}
                        <input type="text" className="form-control" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        {this.state.formErrors.nameError && <p class="text-danger">{this.state.formErrors.nameError}</p>}
                    </div>
                    <div className="form-group">
                        <label for="dob">Date Of Birth :</label>{this.state.dob}
                        <input type="date" className="form-control" placeholder="Enter Date Of Birth" name="dob" value={this.state.dob} onChange={this.handleInputChange} />
                        {this.state.formErrors.dobError && <p class="text-danger">{this.state.formErrors.dobError}</p>}
                    </div>
                    <div className="form-group">
                        <label for="mstatus">Marital status:</label>
                        <select className="form-control" name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleInputChange}>
                            <option value="">-Select Marital Status-</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        {this.state.formErrors.maritalStatusError && <p class="text-danger">{this.state.formErrors.maritalStatusError}</p>}
                    </div>

                    <div className="form-group">
                        <label for="country">Country:</label>
                        <select className="form-control" name="country" onChange={e => { this.handleInputChange(e); this.getStates(e.target.value) }} value={this.state.country}>
                            <option value="">-Select Country-</option>
                            {this.state.countries?.map((e, key) => {
                                return (
                                    <option value={e.name} key={key}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                        {this.state.formErrors.countryError && <p class="text-danger">{this.state.formErrors.countryError}</p>}
                    </div>
                    <div className="form-group">
                        <label for="state">State:</label>{this.state.ste}
                        <select className="form-control" name="ste" onChange={e => { this.handleInputChange(e); this.getCities(e.target.value) }} value={this.state.ste}>
                            <option value="">-Select State-</option>
                            {this.state.selectedState.length > 0 && this.state.selectedState.map((e, key) => {
                                return (
                                    <option value={e.name} key={key}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                        {this.state.formErrors.stateError && <p class="text-danger">{this.state.formErrors.stateError}</p>}
                    </div>
                    <div className="form-group">
                        <label for="state">City:</label>
                        <select className="form-control" name="city" value={this.state.city} onChange={this.handleInputChange}>
                            <option value="">-Select City-</option>
                            {this.state.selectedCity.length > 0 && this.state.selectedCity.map((e, key) => {
                                return (
                                    <option value={e} key={key}>
                                        {e}
                                    </option>
                                );
                            })}
                        </select>
                        {this.state.formErrors.cityError && <p class="text-danger">{this.state.formErrors.cityError}</p>}
                    </div>
                    <div className="form-group mb-0">
                        <label for="gener">Gender</label>
                    </div>
                    <div className="form-check-inline">

                        <label className="form-check-label" for="male">
                            <input type="radio" className="form-check-input" id="male" name="gender" value="male" onChange={this.handleInputChange} checked={this.state.gender === 'male'} />Male
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <label className="form-check-label" for="female">
                            <input type="radio" className="form-check-input" id="female" name="gender" value="female" onChange={this.handleInputChange} checked={this.state.gender === 'female'} />Female
                        </label>

                    </div>
                    <div className="form-group mb-0">
                        {this.state.formErrors.genderError && <p class="text-danger">{this.state.formErrors.genderError}</p>}
                    </div>
                    <div className="form-group  mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => this.submit()}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}