var path = require("path"),
    fs = require("fs");
    //fs.readFile(path.join(__dirname, '../..', 'foo.bar'))

//var db_controller = require('../controllers/database_controller.js');  
var db_controller = require('./database_controller.js');  
var qry_action = db_controller.sd_use;//-------------SQL CONNECTION GOING TO PERFORM THE CRUD ACTIONS ON USERS
var url = require('url');
//----------------------------Loging into the eSente-------------------------



//-------------------------------GETTING ALL ITEMS----------------------------------
module.exports.GetItems = function(req,res){
	qry_action.query('SELECT A.name,A.description,A.price,A.image,C.category_id,D.department_id,C.name as "category",D.name as "department" FROM product A '+
'join product_category B on A.product_id = B.product_id '+
 'join category C on B.category_id = C.category_id join department D on C.department_id = D.department_id '
,[],function(err,results){

	if (err){
		throw err;
	}
	else
	{

		if (results.length ===0){
			res.end(JSON.stringify({ resp:"err",err: 'Sorry No Items to display!!' }));
		}
		{
			console.log(results.length);



			for (var i = 0; i <= results.length -1; i++) {


			var obj = results[i];

		   results[i].incart =false;
		   results[i].count =0;
		   results[i].total =0;
	
				//console.log(i+obj.name);
			}
			res.end(JSON.stringify(results));

		}
	}

	});
}
//----------------------------------END OF GETTING ALL ITEMS------------------------



//-------------------------GETTING ALL CATEGORIES-----------------------
module.exports.GetCategories = function(req,res){
	console.log('Got a get categories request');
	qry_action.query('select * from category',[],function(err,results){
		if (err){
		throw err;
	}
	else
	{

		if (results.length ===0){
			console.log('No Categories data found');
			res.end(JSON.stringify({ resp:"err",err: 'Sorry No Items to display!!' }));
		}
		else
		{
			console.log('Categories data found');
			res.end(JSON.stringify(results));
		}
	}


	})


}



//------------------------END OF GETTING ALL CATEGORIES	



//-------------------------GETTING ALL DEPARTMENTS-----------------------
module.exports.GetDepartments = function(req,res){
	console.log('Got a get categories request');
	qry_action.query('select * from department',[],function(err,results){
		if (err){
		throw err;
	}
	else
	{

		if (results.length ===0){
			console.log('No Categories data found');
			res.end(JSON.stringify({ resp:"err",err: 'Sorry No Items to display!!' }));
		}
		else
		{
			console.log('Categories data found');
			res.end(JSON.stringify(results));
		}
	}


	})


}



//------------------------END OF GETTING ALL CATEGORIES	


//-------------------------GETTING ALL DEPARTMENTS-----------------------
module.exports.GetColors = function(req,res){
	console.log('Got a get categories request');
	qry_action.query('SELECT A.value as color,A.attribute_value_id as id FROM attribute_value A join attribute B on A.attribute_id = B.attribute_id where B.name ="Color"',[],function(err,results){
		if (err){
		throw err;
	}
	else
	{

		if (results.length ===0){
			console.log('No Categories data found');
			res.end(JSON.stringify({ resp:"err",err: 'Sorry No Items to display!!' }));
		}
		else
		{
			console.log('Categories data found');
			res.end(JSON.stringify(results));
		}
	}


	})


}



//------------------------END OF GETTING ALL CATEGORIES	



//----------------User Login--------
module.exports.UserLogin = function(req,res){
	var userData = req.body;
  qry_action.query('select * from customer where email =? and password =?',[userData.email,userData.password],function (err,results){
   
   if (err){
   		throw err;
   }
   else
   {
   		if (results.length ===0){
   			res.end(JSON.stringify({status:"error",data:"Sorry the provided username or password is incorrect!!"}));
   		}
   		else
   		{
   			res.end(JSON.stringify({status:"success",data:"Access Granted!!",user:results[0]}));

   		}
   }
  
  })


console.log(JSON.stringify(req.body));
}

//-------------End of User Login


//---------------------Create New User------------------------
module.exports.CreateNewUser = function(req,res){
	var userData = req.body;

 //-------Checking if the provided account is already in the system

qry_action.query('select * from customer where email =? ',[userData.email],function (err,results){
   
   if (err){
   		throw err;
   }
   else
   {
   		if (results.length ===0){
   			//-------------User is new in the system
   			//---------------Insert Method
  qry_action.query(' insert into customer set ?',[userData],function (err,results){
   
   if (err){
   		throw err;
   }
   else
   {
   	res.end(JSON.stringify({status:"success",data:"Account Has been successfully Created"}));

   		
   }
  
  })
  //------------End of Insert Method---------
   			
   		}
   		else
   		{
   			res.end(JSON.stringify({status:"error",data:"Sorry thr provided email  has already been used!!!!"}));

   		}
   }
  
  })

 //-------End of Check









console.log(JSON.stringify(req.body));
}


//----------------End of Create New User---------------------


