let recoverPassword = (options) => {
  _validate(options.form, options.template);
};

let _validate = (form, template) => {
  $(form).validate(validation(template));
};

let validation = (template) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler() {
      _handleRecovery(template);
    }
  };
};

let _handleRecovery = (template) => {
  let email = template.find('[name="emailAddress"]').value;

  Accounts.forgotPassword({
    email: email
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning', 'fixed-bottom');
    } else {
      Bert.alert('Check your inbox for a reset link!', 'success', 'fixed-bottom');
    }
  });
};

Modules.client.recoverPassword = recoverPassword;
