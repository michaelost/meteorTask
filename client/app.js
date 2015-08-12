Template.users.helpers({
	'users' : function () {
		return Meteor.users.find({});
	}
});

Template.dialogs.helpers({
	'dialogs' : function () {
		return Meteor.user().profile.dialogs
	}
});

Template.dialogs.events({
	'click .partner' : function (event) {
		event.preventDefault();
		
		sessionStorage.setItem('selectedPartner',this.partnerId);
		console.log(sessionStorage.selectedPartner + " selected parther");
	},
	'keydown textarea' : function (event) {
		console.log(event.keyCode);
		if (event.keyCode == 13) {
			var message = {
				sender: Meteor.user().profile.firstName +" "+ Meteor.user().profile.lastName,
				text: $('textarea').val(),
				sentAt: new Date()
			}
			/*
			Meteor.users.update({
		'_id': Meteor.userId(),
		'profile.dialogs' : { $elemMatch: { 'partnerId' : sessionStorage.selectedPartner } }
			},{
		$push :{ "profile.dialogs.$.messages": message }})
			*/
			Meteor.call('sendMessage',sessionStorage.selectedPartner,message);
			console.log(sessionStorage.selectedPartner);
			
			/*
			Meteor.user().profile.dialogs[sessionStorage.partnerIndex].messages.push(message)
			*/





			console.log(message);


			$('textarea').val("");
		}
	}
}) 

Template.messages.helplers({
	'mess': function () {
		
		var index = -1;
		Meteor.user().profile.dialogs.forEach(function (n) {
			index ++;

			sessionStorage.setItem('selectedPartner',this.partnerId);
			if (n.parthner_id == sessionStorage.selectedParthner ) {
				sessionStorage.setItem('partnerIndex',index);

				return n.messages; 
			}
		});
		
	}
});




Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password,
            profile: {
            	firstName: $('[name=firstName]').val(),
            	lastName: $('[name=lastName]').val()
            } 
        }, function (error) {
        	if(error) {
        		console.log(error.reason);
        	} else {
        		var currentRoute = Router.current().route().getName();
        		if (currentRoute == "login") {
        			Router.go('/home');
        		}
        		
        	}
        });
        Router.go('/home')
    }
});


Template.navigation.events({
	'click .logout' : function (event) {
		event.preventDefault();
		Meteor.logout();
	}
})


Template.user.events({
	'click .startDialog' : function (event) {
	event.preventDefault();
	var currentUser = Meteor.userId();

	var us =	Meteor.users.findOne({_id: currentUser});
		if (us.profile.dialogs) {

			var doesDialogExist = false;
			var id = this._id;

			us.profile.dialogs.forEach(function (n) {
				console.log("parthner_id" + n.partnerId);
				console.log("this id - " + id);
				if (n.partnerId == id) {
					doesDialogExist = true;
				}
			});
	 		if (!doesDialogExist) {
	 	 		Meteor.users.update({_id: currentUser}, 
	 				{$push : {
	 					'profile.dialogs' : {
	 						partnerId: this._id,
	 						name: this.profile.firstName + " " + this.profile.lastName,
	 						messages: []
	 					}
	 				}});
				} 
	

		} else {
	 	 	Meteor.users.update({_id: currentUser}, 
	 			{$set : {'profile.dialogs' : [{
	 										   partnerId: this._id,
	 										   name: this.profile.firstName + " " + this.profile.lastName,
	 										   messages: []
	 										 }]}});
	
		}
	 
	 console.log(us);
	 console.log(this.profile.firstName);
	Router.go('/home');
	}
	
})


Template.login.events({
	'submit form' : function (event) {
		event.preventDefault();
		var email = $("[name=email]").val();
		var password = $('[name=password]').val();
		Meteor.loginWithPassword(email,password, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Router.go('/home');
			}
		});

	}
});


Template.login.onRendered(function () {
	$('form').validate();
})

Template.register.onRendered(function (){
	$('form').validate();
});



$.validator.setDefault({
	rules: {
		email: {
			required: true,
			email: true
		},
		password: {
			required: true,
			minlength: 6
		}
	},
	messages: {
		email: {
			required: "You must enter an email address",
			email: "You`ve entered an invalid email address"
		},
		password: {
			required: "You must enter a pssword",
			minlength: "Your password must be at least{0} characters"
		}
	}
});