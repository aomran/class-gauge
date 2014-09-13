import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createSurvey: function(){
			var lesson = this.get('model');
			var survey = this.store.createRecord('survey', {
				timestamp: new Date()
			});
			lesson.get('surveys').then(function(surveys){
				surveys.addObject(survey);
				lesson.save();
				survey.save();
			});
		},
		sayYes: function(survey){
			survey.incrementProperty('yesVotes');
			survey.save();
		},
		sayNo: function(survey){
			survey.incrementProperty('noVotes');
			survey.save();
		}
	}
});
