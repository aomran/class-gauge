import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createLesson: function(){
			var self = this;
			var lesson = this.store.createRecord('lesson', {
				name: this.get('lessonName')
			});
			lesson.save().then(function(){
				self.transitionToRoute('lesson', lesson);
			});
		}
	}
});
