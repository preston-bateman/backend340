const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/details/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/details/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the Details view HTML
* ************************************ */
Util.buildDetails = async function(data){
  let details
  if (data.length > 0) {
    details = '<div id="details-wrapper">'
    details += '<img id="detail-image" src=" ' + data[0].inv_image + '" alt="picture of' + data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model + '">'
    details += '<div id="vehicle-details">'
    details += '<h2>' + data[0].inv_make + ' ' + data[0].inv_model + ' Details</h2>'
    details += '<div class="dets grey"><p><b>Price: $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</b></p>'
    details += '</div>'
    details += '<div class="dets white"><p><b>Description: </b>' + data[0].inv_description + '</p>'
    details += '</div>'
    details += '<div class="dets grey"><p><b>Color: </b>' + data[0].inv_color + '</p>'
    details += '</div>'
    details += '<div class="dets white"><p><b>Miles: </b>' + new Intl.NumberFormat('en-US').format(data[0].inv_miles) + '</p>'
    details += '</div>'
    details += '</div>'
    details += '</div>'
  } else {
    details += '<p class="notice">Sorry, this vehicle is no longer available.</p>'
  }
  return details
}


/* **************************************
* Saved space for error handling code
* ************************************ */


//exports the utility
module.exports = Util