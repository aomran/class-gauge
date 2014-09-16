import Ember from 'ember';
/* global ZeroClipboard */

export default Ember.Component.extend({
	didInsertElement: function () {
	  new ZeroClipboard(this.$('button'));
	}
});
