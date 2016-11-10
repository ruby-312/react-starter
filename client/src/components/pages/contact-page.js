import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form'
import { sendContactForm } from '../../actions/index';

const form = reduxForm({
  form: 'contactForm'
});

class ContactPage extends Component {  
  constructor(props) {
    super(props);
  }

  handleFormSubmit(formProps) {
    this.props.sendContactForm(formProps);
    this.props.reset();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderMessage() {
    if (this.props.message) {
      return (
        <div className='alert alert-success'>
          <strong>Success!</strong> {this.props.message}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      {this.renderMessage()}
      <div className="row">
        <div className="col-md-6">
          <fieldset className="form-group">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component="input" type="text" placeholder="First name" required/>
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="form-group">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component="input" type="text" placeholder="Last name" required/>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <fieldset className="form-group">
            <label>Email Address</label>
            <Field name="emailAddress" component="input" className="form-control" type="email" placeholder="Email" required />
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <fieldset className="form-group">
            <label>Subject</label>
            <Field name="subject" className="form-control" component="input" type="text" placeholder="Subject" required />
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <fieldset className="form-group">
            <label>Message</label>
            <Field name="message" component="textarea" type="textarea" className="form-control" placeholder="Message" required />
          </fieldset>
        </div>
      </div>
        {this.renderAlert()}
      <div className="row">
        <div className="col-md-12">
          <button action="submit" className="btn btn-primary col-md-12">Send</button>
        </div>
      </div>        
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.communication.error,
           message: state.communication.message,
           authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps, { sendContactForm })(form(ContactPage));
