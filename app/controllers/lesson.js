import Ember from 'ember';

export default Ember.Controller.extend({
	sortProperties: ['timestamp:desc'],
	sortedSurveys: Ember.computed.sort('model.surveys', 'sortProperties'),
	actions: {
		createSurvey: function(){
			var lesson = this.get('model');
			var survey = this.store.createRecord('survey', {
				timestamp: new Date()
			});
			lesson.get('surveys').then(function(surveys){
				surveys.addObject(survey);
				lesson.save();
				survey.save().then(function(survey){
					survey.reload();
				});
			});
		}
	},
	lessonCode: function(){
		return '<script async data-id="ClassGauge" data-token="' + this.get('model.id') + '" src="https://class-gauge.firebaseapp.com/assets/voting_client.js"></script>';
	}.property('model.id')
});
