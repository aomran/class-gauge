import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  yesVotes: DS.attr('number', {defaultValue: 0}),
  noVotes: DS.attr('number', {defaultValue: 0}),
  lesson: DS.belongsTo('lesson', { async: true }),
  chartData: function(){
  	return [
  		{
  			value: this.get('yesVotes'),
  			color: "#46BFBD",
  			highlight: "#5AD3D1",
  			label: "Yes!"
  		},
  		{
  			value: this.get('noVotes'),
  			color: "#FDB45C",
  			highlight: "#FFC870",
  			label: "No :("
  		}
  	];
  }.property('yesVotes', 'noVotes')
});
