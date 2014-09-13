import Ember from 'ember';
/* global Chart */

export default Ember.Component.extend({
	tagName: 'canvas',
	attributeBindings: ['width', 'height'],
	width: 100,
	height: 100,

	didInsertElement: function(){
    this.renderChart();
	},
	renderChart: function(){
		var context = this.get('element').getContext('2d');
    var data = this.get('data');
    new Chart(context).Pie(data);
	}.observes('data')
});
