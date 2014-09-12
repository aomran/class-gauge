import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createSurvey: function(){
			var lesson = this.get('model');
			var survey = this.store.createRecord('survey', {
				timestamp: new Date()
			});
			survey.save().then(function(){
				lesson.get('surveys').then(function(surveys){
					surveys.addObject(survey);
					lesson.save();
				});
			});
		}
	}
});
