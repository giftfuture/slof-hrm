//Validate date, Example: XXXX-XX-XX
//------------------------------------------------
// Desc: Validate date
// in  : inpt
//       input type="text";
// out : 
// Time: 2005.9.1
// Author: GL
//------------------------------------------------
function verifyDate(inpt,x,y) 
{ 
	var strdate = inpt.value; 
	var tmpstring="<BR>¸ñÊ½:XXXX-XX-XX</BR>ÀýÈç:2006-01-01"
	var width = "250";
	var pattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
	if (strdate!="")
	{
		beTrue = pattern.test(strdate); 
		if(beTrue) 
		{ 
			UnShowTip(inpt);
			return true; 
		} 
		else 
		{ 		
			ShowTip(inpt,tmpstring,x,y);
			return false; 
		} 
	}
	else
	{
		return true;
	}
}