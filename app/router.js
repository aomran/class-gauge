import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ClassGaugeENV.locationType
});

Router.map(function() {
	this.resource('lesson', {path: '/:lesson_id'});
});

export default Router;
