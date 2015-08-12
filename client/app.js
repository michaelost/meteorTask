Template.users.helpers({
	'users' : function () {
		return Meteor.users.find({});
	}
});

Template.dialogs.helpers({
	'dialogs' : function () {
		return Meteor.user().profile.dialogs
	}
})



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
	 		if (us.profile.dialogs.indexOf(this._id) == -1) {
	 	 		Meteor.users.update({_id: currentUser}, 
	 				{$push : {'profile.dialogs' : this._id}});
				}
	

		} else {
	 	 	Meteor.users.update({_id: currentUser}, 
	 			{$set : {'profile.dialogs' : [this._id]}});
	
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