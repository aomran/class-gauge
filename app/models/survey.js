import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  lesson: DS.belongsTo('lesson', { async: true }),
  votes: DS.hasMany('vote', { async: true })
});
