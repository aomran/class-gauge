window.ClassGauge = {
	ref: null,
	LESSON_ID: null,
	init: function(){
		this.addDialog().setLessonID().setFirebase().listenFirebase();
	},
	listenFirebase: function(){
		var surveys,
		  surveysLength,
		  first_time = true,
      self = this;

		surveys = this.ref.child('lessons/'+ this.LESSON_ID + '/surveys');
		surveys.once('value', function(snapshot){
			surveysLength = snapshot.numChildren();
		});

		// Throw out first survey on page load
		// Listen for new surveys
		surveys.limit(1).on("child_added", function(snapshot) {
			if (first_time && surveysLength) {
				first_time = false;
			} else {
				self.startSurvey(snapshot);
			};
		});
	},
	startSurvey: function(snapshot){
		this.setSurveyID(snapshot.name());
		this.setOverlay('visible');
	},
	surveyVote: function(choice){
		var survey = this.ref.child("surveys/"+this.getSurveyID());
		if (choice === 'yes') {
			survey.child('yesVotes').transaction(function(votes){
				return votes+1;
			})
		} else if (choice === 'no') {
		  survey.child('noVotes').transaction(function(votes){
		  	return votes+1;
		  })
		};
		this.setOverlay('hidden');
	},
	addDialog: function(){
		var dialogElement = document.createElement('div');
		var dialog="";
		dialog += "<div id=\"dialog-overlay\" style=\"visibility:hidden;position: absolute;top:0;left:0;background-color: rgba(0,0,0,0.6);width:100%;height:100%;z-index:1000\">";
		dialog += "  <div style=\"width:400px;height:150px;position:absolute;margin:auto;top:0;left:0;bottom:0;right:0;box-shadow:0px 2px 7px #292929;border-radius: 10px;background-color:#f2f2f2;border:1px solid #fff;padding:15px;text-align:center;\">";
		dialog += "  	<p style=\"font-size:25px;font-family:sans-serif\">How's the lesson so far?<\/p>";
		dialog += "  	<button id=\"cgyesbutton\" onclick=\"ClassGauge.surveyVote('yes')\" style=\"background-color:#46BFBD;color:#fff;border:none;padding:10px;font-size:18px;border-radius:5px;cursor:pointer\">Keep going!<\/button>";
		dialog += "  	<button id=\"cgnobutton\" onclick=\"ClassGauge.surveyVote('no')\" style=\"background-color:#FDB45C;color:#fff;border:none;padding:10px;font-size:18px;border-radius:5px;cursor:pointer\">Go over it again<\/button>";
		dialog += "  <\/div>";
		dialog += "<\/div>";
		dialogElement.innerHTML = dialog;
		document.querySelector('body').appendChild(dialogElement);

		var s=document.createElement('style');
		s.innerHTML = '#cgyesbutton:hover {background-color: #5AD3D1 !important;} #cgnobutton:hover {background-color: #FFC870 !important;}';
		document.querySelector('head').appendChild(s);
		return this;
	},
	setLessonID: function(){
		this.LESSON_ID = this.LESSON_ID || document.querySelector('script[data-id="ClassGauge"][data-token]').getAttribute('data-token');
		return this;
	},
	setFirebase: function(){
		this.ref = new Firebase("https://class-gauge.firebaseio.com/");
		return this;
	},
	setSurveyID: function(id){
		document.querySelector("#dialog-overlay").setAttribute('surveyID', id);
		return this;
	},
	getSurveyID: function(){
		return document.querySelector("#dialog-overlay").getAttribute('surveyID');
	},
	setOverlay: function(visibility) {
		document.querySelector("#dialog-overlay").style.visibility = visibility;
		return this;
	}
};

var s=document.createElement('script');
s.type='text/javascript';
s.src='https://cdn.firebase.com/js/client/1.0.21/firebase.js';
s.onload = function(){ClassGauge.init();};
document.querySelector('head').appendChild(s);
