Meteor.methods({
	'sendMessage' : function (partnerID,message) {
		console.log(Meteor.user());

		
		Meteor.users.update({
		'_id': Meteor.userId(),
		'profile.dialogs' : { $elemMatch: { 'partnerId' : partnerID } }
			},{
		$push :{ "profile.dialogs.$.messages": message }})
		

	}
})