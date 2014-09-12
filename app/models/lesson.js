import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  surveys: DS.hasMany('survey', { async: true }),
  surveyCount: function(){
  	return this.get('surveys.length');
  }.property('surveys.length')
});
