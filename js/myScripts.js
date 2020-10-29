/**
 * Get html element by XPATH
 * @param {string} STR_XPATH - XPATH
 * @return {Array}
 */
function _x(STR_XPATH) {
    var xresult = document.evaluate(
      STR_XPATH,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    var xnodes = [];
    var xres;
    while ((xres = xresult.iterateNext())) {
      xnodes.push(xres);
    }

    return xnodes;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // Add event tracker on submit to the contact form on the home page and the contact me page
    const nameInput = $(_x('//*[@id="et_pb_contact_name_0"]'));
    const emailInput = $(_x('//*[@id="et_pb_contact_email_0"]'));
    const messageInput = $(_x('//*[@id="et_pb_contact_message_0"]'));
    let mathExpression = $(
      _x('//*[@id="et_pb_contact_form_0"]/div[2]/form/div/div/p/span')
    );
    const catchInput = $(
      _x('//*[@id="et_pb_contact_form_0"]/div[2]/form/div/div/p/input')
    );
    let mathExpressionTotal = 0;
    const btn = $(_x('//*[@id="et_pb_contact_form_0"]/div[2]/form/div/button'));
    let catchInputChanged = false;

    mathExpression = mathExpression.text().split(" + ");
    for (const number of mathExpression) {
      mathExpressionTotal = mathExpressionTotal + parseInt(number);
    }

    btn.click(function () {
      if (
        nameInput.val() !== "" &&
        emailInput.val() !== "" &&
        messageInput.val() !== "" &&
        catchInput.val() !== ""
      ) {
        if (catchInputChanged) {
          mathExpressionTotal = 0;
          mathExpression = $(
            _x('//*[@id="et_pb_contact_form_0"]/div[2]/form/div/div/p/span')
          );
          mathExpression = mathExpression.text().split(" + ");
          for (const number of mathExpression) {
            mathExpressionTotal = mathExpressionTotal + parseInt(number);
          }
        }
        if (mathExpressionTotal === parseInt(catchInput.val())) {
          if (window.location.href.toLocaleLowerCase().includes("contact-me")) {
            ga("send", "event", "Form", "Submit", "Contact Me");
          } else {
            ga("send", "event", "Form", "Submit", "Home");
          }
        } else {
          catchInputChanged = true;
        }
      }
    });

    // Add event tracker on click to TFN on the footer
    $("#footerTfn").click(function() {
        ga("send", "event", "TFN", "Click", "Footer");
    });

    // Add event tracker on click to email on the footer
    $("#footerEmail").click(function() {
        ga("send", "event", "Email", "Click", "Footer");
    });
});