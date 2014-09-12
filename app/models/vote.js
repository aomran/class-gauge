import DS from 'ember-data';

export default DS.Model.extend({
  result: DS.attr('string'),
  timestamp: DS.attr('date'),
  survey: DS.belongsTo('survey', { async: true })
});
