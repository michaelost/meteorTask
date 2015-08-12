Meteor.methods({
	'sendMessage' : function (partnerID,message) {
		console.log(Meteor.user());

		/* adding your message to current dialog with selected partner in your database */
		Meteor.users.update({
		'_id': Meteor.userId(),
		'profile.dialogs' : { $elemMatch: { 'partnerId' : partnerID } }
			},{
		$push :{ "profile.dialogs.$.messages": message }})
		/* checking if reciever user already have dialog with you */
			
		 var resUser =  Meteor.users.findOne({'_id': partnerID });

		 
		  
	}
})