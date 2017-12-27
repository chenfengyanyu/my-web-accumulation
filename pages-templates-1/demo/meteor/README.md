## Meteor Implementation of Pages Theme
Fully Integrated demo pages and components build for meteor v1.2.0

## Tech Spec
 * Layout uses FlowRouter and FlowLayout
  * iron:router was switched out due to recent trouble in the community / no continuation
 * Begun, where easily possible, to scope jQuery actions `$` to the template `tpl.$`
  * has the benefit to freely re-use templates without css-properties/classes (ie. widget-1320)
 * Some code clean-up and consistency in naming conventions. Semicolons for magnifications etc. mostly according to [meteor style guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide)

 ## Dependencies
Install the following packages from atmosphere
 - less
 - kadira:flow-router
 - meteorhacks:flow-layout
 - zimme:active-route
 - revox:pages-core
 - revox:pages-calendar

## Using revox:pages-core Package
Installing the following page will automatically install the following dependencies, Please make sure to remove duplicates if found.
 - 'jquery'
 - 'mizzao:bootstrap-3'
 - 'momentjs:moment'
 - 'bkruse:pace'
 - 'gromo:jquery.scrollbar'
 - 'cwaring:modernizr'
 - 'fortawesome:fontawesome'

