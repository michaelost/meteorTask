
Meteor.methods({
	'sendMessage' : function (partnerID,message) {
		console.log(Meteor.user());




		Meteor.users.update({
		'_id': Meteor.userId(),
		'profile.dialogs' : { $elemMatch: { 'partnerId' : partnerID } }
			},{
		$push :{ "profile.dialogs.$.messages": message }})




			
		 var resUser =  Meteor.users.findOne({'_id': partnerID });
		 console.log("users dialogs " + resUser.profile.dialogs);
		 if (resUser.profile.dialogs == undefined) {
		 	var nameS = Meteor.user().profile.firstName + " " + Meteor.user().profile.lasteName;
		 	 Meteor.users.update({_id: partnerID},{
		 	 	$set: {
		 	 		'profile.dialogs' : [{
		 	 								   partnerId: Meteor.userId(),
	 										   name: nameS,
	 										   messages: [message]
		 	 		}]
		 	 	}
		 	 })
		 } else {
		 	var doesDialogExist = false;
		 	resUser.profile.dialogs.forEach(function (n) {
		 		if (n.partnerId == Meteor.userId()) {
		 			doesDialogExist = true;
		 		}
		 	});
		 	if (!doesDialogExist) {

		 		Meteor.users.update({_id: resUser._id}, {
		 			$push: { 
		 				'profile.dialogs': {
		 									partnerId: Meteor.userId(),
	 										name: nameS,
	 										messages: [message]
		 				}
		 			}
		 		});

		 	} else {
		 		Meteor.users.update({
				'_id': resUser._id,
				'profile.dialogs' : { $elemMatch: { 'partnerId' : Meteor.userId() } }
				},{
				$push :{ "profile.dialogs.$.messages": message }})

		 	}
		 }
		 
		  
	},

	'getDialog': function (partnerID) {
		
		var user = Meteor.users.findOne({_id: Meteor.userId()});
		user.profile.dialogs.forEach(function (n) {
			
			if (n.partnerId == partnerID) { 
				console.log(n.messages);
				return n.messages;
			}
		});
	}

})

