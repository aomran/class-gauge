window.ClassGauge = {
	ref: null,
	LESSON_ID: null,
	init: function(){
		ClassGauge.addDialog().setLessonID().setFirebase();

		// Listen for survey polls
		var surveys,
			surveysLength,
			first_time = true;
		
		surveys = ClassGauge.ref.child('lessons/'+ ClassGauge.LESSON_ID + '/surveys');
		surveys.once('value', function(snapshot){
			surveysLength = snapshot.numChildren();
		});
		surveys.limit(1).on("child_added", function(snapshot) {
			(first_time && surveysLength) ? (first_time = false) : ClassGauge.startSurvey(snapshot);
		});
	},
	startSurvey: function(snapshot){
		this.addName(snapshot.name());
		this.overlay('visible');
	},
	addName: function(name){
		document.querySelector("#dialog-overlay").setAttribute('name', name);
	},
	overlay: function(visibility) {
		document.querySelector("#dialog-overlay").style.visibility = visibility;
	},
	surveyVote: function(button){
		var name = document.querySelector("#dialog-overlay").getAttribute('name');
		var survey = this.ref.child("surveys/"+name);
		this.overlay('hidden');

		if (button === 'yes') {
			survey.child('yesVotes').transaction(function(votes){
				return votes+1;
			})
		} else {
		  survey.child('noVotes').transaction(function(votes){
		  	return votes+1;
		  })
		}
	},
	addDialog: function(){
		var dialog="";
		dialog += "<div id=\"dialog-overlay\" style=\"visibility:hidden;position: absolute;top:0;left:0;background-color: rgba(0,0,0,0.6);width:100%;height:100%;z-index:1000\">";
		dialog += "  <div style=\"width:400px;height:150px;position:absolute;margin:auto;top:0;left:0;bottom:0;right:0;box-shadow:0px 2px 7px #292929;border-radius: 10px;background-color:#f2f2f2;border:1px solid #fff;padding:15px;text-align:center;\">";
		dialog += "  	<p style=\"font-size:25px;font-family:sans-serif\">How's the lesson so far?<\/p>";
		dialog += "  	<button id=\"cgyesbutton\" onclick=\"ClassGauge.surveyVote('yes')\" style=\"background-color:#46BFBD;color:#fff;border:none;padding:10px;font-size:18px;border-radius:5px;cursor:pointer\">Keep going!<\/button>";
		dialog += "  	<button id=\"cgnobutton\" onclick=\"ClassGauge.surveyVote('no')\" style=\"background-color:#FDB45C;color:#fff;border:none;padding:10px;font-size:18px;border-radius:5px;cursor:pointer\">Go over it again<\/button>";
		dialog += "  <\/div>";
		dialog += "<\/div>";
		document.querySelector('body').insertAdjacentHTML('afterend', dialog);

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
	},
};

var s=document.createElement('script');
s.type='text/javascript';
s.src='https://cdn.firebase.com/js/client/1.0.21/firebase.js';
s.onload = ClassGauge.init;
document.querySelector('head').appendChild(s);