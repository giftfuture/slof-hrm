<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<html>
<head>
<title>�û���¼</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
</head>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<body>
<%
String username;//�û���
String userpass;//�û�����
String sql,yhdm,yhbh;

username=request.getParameter("yhmc");
userpass=request.getParameter("yhmm");
//�޸ĸ�����Ϣ��ʾxg
String xg="";
if (request.getParameter("xg")!=null){xg=request.getParameter("xg");}else{xg="0";}
String ipdz = request.getRemoteAddr();
String login_sql="";

//�õ�����ʱ��
java.util.Date Now = new java.util.Date() ;
SimpleDateFormat LoginTimeType = new SimpleDateFormat("yyyy-MM-dd EEE,HH:mm:ss");
String op_time = LoginTimeType.format(Now);

//*retval ����ֵ1:��¼�ɹ�������ֵ-1:������󣻷���ֵ-2:�û������� */
String HasLogin="";
try {
ResultSet login_rs=qxbean.getResultSet("exec userlogin '"+username+"','"+userpass+"'");
if(login_rs.next())
{
	HasLogin=login_rs.getString("retval");
}else{%>
    <script language=javascript>
        alert("���ݿ����ʧ��!");
        window.history.go(-1);
    </script>
<%}

if (HasLogin.equals("-1")){
//��־��¼
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','�������')");
%>
        <script language=javascript>
            alert("������󣬵�¼ʧ��!");
            window.history.go(-1);
        </script>
<%}
if (HasLogin.equals("-2")){
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','�û���������')");
%>
        <script language=javascript>
            alert("�û��������ڣ���¼ʧ��!");
            window.history.go(-1);
        </script>
<%}
if (HasLogin.equals("1")){
    qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','��¼�ɹ�')");
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
qxbean.execute("insert into loginlog (username,user_ip,op_time,op_result) values ('"+ username +"','"+ ipdz +"','"+ op_time +"','��¼ʧ��')");%>
    <script language=javascript>
        alert("��¼ʧ��!");
        window.history.go(-1);
    </script>
<%}%>
</body>
</html>
