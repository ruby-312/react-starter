const mailgun = require('../config/mailgun');

exports.sendContactForm = function(req, res, next) {
	const fromText = req.body.form.firstName + ' ' + req.body.form.lastName + ' ' +
                  '<' + req.body.form.emailAddress + '>';                  

  const message = {
    subject: req.body.form.subject,
    text: req.body.form.message
  };

  //mailgun.contactForm(fromText, message);

  res.status(200).json({ message: 'Your email has been sent. We will be in touch with you soon.' });
  next();
}
