<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%> 
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title></title>
    </head>
	<body topmargin="1" leftmargin="0">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/login_log_chart.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
Date Now = new Date() ;
String nowdate="",nowmonth="",nowyear="";
nowdate = (Now.getYear() + 1900) + "-";
nowdate = nowdate + (Now.getMonth() + 1) + "-";
nowdate = nowdate + Now.getDate();
nowyear = ""+(Now.getYear() + 1900);
nowmonth = ""+(Now.getMonth() + 1);

String strcurrentpage = request.getParameter("page");
String id="",username="",user_ip,op_time,op_result;
String strallrownum="";
int i=0;
int allrownum=0;
int curpage=0;

//判断查询条件,生成SQL语句
	int queryyear=0,querymonth=0;
	String year_month=request.getParameter("xLabel");
	if (year_month!=null){
		queryyear = Integer.parseInt(year_month.split("-")[0]);
		querymonth = Integer.parseInt(year_month.split("-")[1]);
	}
	
	String strsql="",strsql2="";
	strsql="SELECT count(*) as num FROM loginlog  where op_time like '%"+ queryyear +"-"+ querymonth +"%' or op_time like '%"+ queryyear +"-0"+ querymonth +"%'";
	strsql2="SELECT * FROM loginlog  where op_time like '%"+ queryyear +"-"+ querymonth +"%' or op_time like '%"+ queryyear +"-0"+ querymonth + "%' order by id desc";
//得到总行数 allrownum
	ResultSet rs1 = qxbean.getResultSet(strsql);
	if(rs1.next()){allrownum=Integer.parseInt(rs1.getString("num"));}
	
//根据页数显示数据
ResultSet rs2 = qxbean.getResultSet(strsql2);%>
<script language=javascript>
	function deleteall(){
		if (confirm("确实要删除吗？")==true){
			window.location="delete_loginlog_month.jsp?year_month=<%=year_month%>";
		}
	}
</script>
	<form name="form1" method="post">
	<%
		//out.println(queryyear);
		//out.println(querymonth);
	%>
		<table cellSpacing="0" cellPadding="0" width="100%" border="0">
		<TR>
			<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;登录日志查询</DIV></TD>
		</TR>
		<TR>
		<TD vAlign="top">
            <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                <TR>
                    <TD vAlign="middle" bgColor="#FFEFD5">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="btnquery" value="返回" onclick="history.back()"/>
						<input type="button" name="btnquery" value="删除全部" onclick="deleteall()"/>
                    </TD>
                </TR>
            </table>
			<table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
			<TR bgcolor="#FFEFD5" align="center" height="25px">
				<TD width="20%" bgcolor="#FFEFD5"><STRONG>登录名</STRONG></TD>
				<TD width="15%" bgcolor="#FFEFD5"><STRONG>登录IP</STRONG></TD>
				<TD width="30%" bgcolor="#FFEFD5"><STRONG>登录时间</STRONG></TD>
				<TD width="30%" bgcolor="#FFEFD5"><STRONG>登录结果</STRONG></TD>
			</TR>
			<%
			i=0;
			while(rs2.next()){
				i++;
				id=rs2.getString("id");
				username=rs2.getString("username");
				user_ip=rs2.getString("user_ip");
				op_time=rs2.getString("op_time");
				op_result=rs2.getString("op_result");
			%>
			<TR bgcolor="#FFFAFA">
				<TD align="center"><%= username %></TD>
				<TD align="center"><%= user_ip %></TD>
				<TD align="center"><%= op_time %></TD>
                <%if (op_result.equals("登录失败")){%><TD align="center"><font color=red><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("登录成功")){%><TD align="center"><font color=green><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("密码错误")){%><TD align="center"><font color=blue><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("用户名不存在")){%><TD align="center"><font color=blue><%= op_result %></font></TD><%}%>
			</TR>
			<%
			}
			%>
			</TABLE>
			<table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
				<TR>
					<TD align="center" bgColor="#FFEFD5" height="24"></TD>
				</TR>
			</table>
		</TD>
			</TR>
		</table>
	</form>
</body>
</html>
<%
}catch(Exception e){
	System.out.println("页面"+request.getRequestURI()+"出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>