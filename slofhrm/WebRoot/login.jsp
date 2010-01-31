<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<html>
<head>
<title>用户登录</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
</head>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<body>
<%
String username;//用户名
String userpass;//用户密码
String sql,yhdm,yhbh;

username=request.getParameter("yhmc");
userpass=request.getParameter("yhmm");
//修改个人信息标示xg
String xg="";
if (request.getParameter("xg")!=null){xg=request.getParameter("xg");}else{xg="0";}
String ipdz = request.getRemoteAddr();
String login_sql="";

//得到操作时间
java.util.Date Now = new java.util.Date() ;
SimpleDateFormat LoginTimeType = new SimpleDateFormat("yyyy-MM-dd EEE,HH:mm:ss");
String op_time = LoginTimeType.format(Now);

//*retval 返回值1:登录成功；返回值-1:密码错误；返回值-2:用户名错误 */
String HasLogin="";
try {
ResultSet login_rs=qxbean.getResultSet("exec userlogin '"+username+"','"+userpass+"'");
if(login_rs.next())
{
	HasLogin=login_rs.getString("retval");
}else{%>
    <script language=javascript>
        alert("数据库操作失败!");
        window.history.go(-1);
    </script>
<%}

if (HasLogin.equals("-1")){
//日志记录
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','密码错误')");
%>
        <script language=javascript>
            alert("密码错误，登录失败!");
            window.history.go(-1);
        </script>
<%}
if (HasLogin.equals("-2")){
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','用户名不存在')");
%>
        <script language=javascript>
            alert("用户名不存在，登录失败!");
            window.history.go(-1);
        </script>
<%}
if (HasLogin.equals("1")){
    qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','登录成功')");
	ResultSet rs=qxbean.getResultSet("select * from xtglt_user where username='"+username+"' and password='"+userpass+"'");
	if(rs.next())
	{
		 String userid = rs.getString("id");
		 username=rs.getString("username");
		 String name=rs.getString("name"); 
		 String email=rs.getString("email");
		 String phone=rs.getString("phone");
		 String note=rs.getString("note");
		 String roleid = rs.getString("role_id");
	
		session.setMaxInactiveInterval(3600);
		session.setAttribute("userid",userid);
		session.setAttribute("username",username);
		session.setAttribute("name",name);
		session.setAttribute("email",email);
		session.setAttribute("phone",phone);
		session.setAttribute("note",note);
		session.setAttribute("roleid",roleid);
		session.setAttribute("ipdz",ipdz);
	
		response.sendRedirect("index.jsp?xg="+xg);
	}
}
}catch(Exception e){
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','登录失败')");%>
    <script language=javascript>
        alert("登录失败!");
        window.history.go(-1);
    </script>
<%}%>
</body>
</html>
