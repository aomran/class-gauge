import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  yesVotes: DS.attr('number', {defaultValue: 0}),
  noVotes: DS.attr('number', {defaultValue: 0}),
  lesson: DS.belongsTo('lesson', { async: true }),
});
