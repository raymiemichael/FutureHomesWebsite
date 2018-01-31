exports.contact = function(req, res){
   message = '';
     
   if(req.method == "POST"){
	//  let id = request.params.LID;
      var post  = req.body;
      var name= post.sender_name;
      var email= post.sender_email;
      var mssge= post.message;
	  
	 const lid = 3;
	   
	  db.query("INSERT INTO `messages`(`belong_to_user_id`,`belong_to_listing_id`) SELECT `belong_to_user_id`,`id` FROM `all_listings` WHERE `id` = ?",[lid], function(err,result){
			if(err) throw err;
			console.log(result);
			setValue(result.insertId);
		});
	function setValue(value){
		p = value;
	  
	  db.query("UPDATE `messages` SET `sender_name`= ?,`sender_email`= ?,`message`= ? WHERE`id` =?",[name,email,mssge,p], function(err, result) {
		  
		 message = "Succesfully! Your message is sent.";
		 res.render('contact.ejs',{message: message});
		});
 
	  db.query("SELECT * FROM messages where id = ? ",[p], function(err,result){
			if(err) throw err;
			console.log(result);
		});
	}
	}
   else {
      res.render('contact');
   }
};
