import React, { Component } from "react";
import "./Scape.css";
import NavBar from '../NavBar/NavBar'
import {withRouter} from 'react-router'
import { connect } from "react-redux";
import SelectBox from "./SelectBox";
import {Store} from 'webext-redux'

const store = new Store({
    portName: 'COUNTING',
  })

class Scrape extends Component {
  state = {
    formOptions: [],
    selectedFormName: "",
    selectedFormId: "",
    selectedFormFields: []

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed

    // departmentOptions: [],
    // selectedDept: ''
    // ****************************
  };

  async componentDidMount() {
    await this.props.getForm(localStorage.getItem("id"));

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed
    // await this.props.getDept(localStorage.getItem("id"));
    // ****************************

    for (let i = 0; i < this.props.forms.length; i++) {
      this.setState({
        formOptions: [...this.state.formOptions, this.props.forms[i].name]
      });
    }

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed

    // for (let i = 0; i<this.props.depts.length; i++) {
    //     this.setState({
    //         departmentOptions: [
    //             ...this.state.departmentOptions,
    //             this.props.depts[i].name
    //         ]
    //     })
    // }
    // ****************************
  }

  getSelectedFormFields = async () => {
    for (let i = 0; i < this.props.forms.length; i++) {
      if (this.props.forms[i].name === this.state.selectedFormName) {
        await this.setState({ selectedFormId: this.props.forms[i].form_id });
      }
    }
    await this.props.getField(this.state.selectedFormId);
    this.setState({ selectedFormFields: this.props.getFields });
    this.props.history.push("/edit-scrape");
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className='Scrape'>
        <NavBar />
        <div className='bold'>Scrape</div>

        <div className='dropDown'>
          <p>Form: </p>
          <SelectBox
            title={"Form"}
            name={"selectedFormName"}
            options={this.state.formOptions}
            value={this.state.selectedForm}
            placeholder={"Select Form"}
            onChange={this.handleInput}
          />
        </div>

        {/* **************************** */}
        {/* commented out until form rules and/or emailing is implemented and this is needed */}

        {/* <div className = {classes.dropDown}>
                    <p>Department: </p>
                    <SelectBox 
                        title={"Department"}
                        name={"selectedDept"}
                        options={this.state.departmentOptions}
                        value={this.state.selectedDept}
                        placeholder={"Select Department"}
                        onChange={this.handleInput}
                    />
                </div> */}
        {/* **************************** */}

        <button onClick={() => this.getSelectedFormFields()}>Scrape</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forms: state.formReducer.forms,
    getForm: state.formReducer.getForm,
    getFields: state.formReducer.fieldsToUpdate

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed
    // depts: state.deptReducer.depts,
    // getDept: state.deptReducer.getDept
    // ****************************
  };
};

const mapDispatchToProps = dispatch => {
    return {
      getForm: id => store.dispatch({type: 'alias@ADD_FORM', id: id}),
      getField: (formId) => store.dispatch({type: 'alias@GET_FIELD', formId: formId})
    };
  };

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Scrape));
