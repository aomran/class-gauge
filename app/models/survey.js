import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  yesVotes: DS.attr('number'),
  noVotes: DS.attr('number'),
  lesson: DS.belongsTo('lesson', { async: true }),
});
