<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%> 
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>通知单查询</title>
    </head>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>
            function gopage()
            {
            window.location="admin_loginlog.jsp?page="+document.all["selctpageno"].options[document.all["selctpageno"].selectedIndex].value;
            }

            function delitem(){
            if (confirm("确实要删除吗？")==true){
            document.form1.action="delete_loginlog.jsp";
            document.form1.target="_self";
            document.form1.submit();
            }
            }
            
            function query(){
            document.form1.action="admin_loginlog.jsp";
            document.form1.submit();
            }
            
            function selectall(){
            var len=document.all["chkbx"].length;
            if (len>1){
            for (var i=0;i<len;i++){
            document.all["chkbx"][i].checked=true;
            }
            }else{
            document.all["chkbx"].checked=true;
            }
            document.all["btnunselectall"].style["display"]="inline";
            document.all["btnselectall"].style["display"]="none";
            }
            
            function unselectall(){
            var len=document.all["chkbx"].length;
            if (len>1){

            for (var i=0;i<len;i++){
            document.all["chkbx"][i].checked=false;
            }
            }else{
            document.all["chkbx"].checked=false;
            }
            document.all["btnunselectall"].style["display"]="none";
            document.all["btnselectall"].style["display"]="inline";
            }
            
        </script>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/admin_loginlog.jsp";
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
	String queryyear,querymonth;
	if (request.getParameter("queryyear")!=null){
		queryyear = qxbean.ISOtoGB(request.getParameter("queryyear"));
	}else{
		ResultSet getyear_rs = qxbean.getResultSet("select distinct substring(op_time,0,5) as year from loginlog order by substring(op_time,0,5) desc");
		if(getyear_rs.next()){
			queryyear = getyear_rs.getString("year");
		}else{
			queryyear = "";
		}
	}
	
	if (request.getParameter("querymonth")!=null){querymonth = qxbean.ISOtoGB(request.getParameter("querymonth"));}else{querymonth =nowmonth;}

	String strsql="",strsql2="";
	//当年份为空,月份为空时,年份选择库中最近的年份,月份选择12个月
	if (querymonth.equals("")){
		strsql="SELECT count(*) as num FROM loginlog  where op_time like '%"+ queryyear +"%'";
		strsql2="SELECT * FROM loginlog  where op_time like '%"+ queryyear +"%' order by id desc";
	}else{
		strsql="SELECT count(*) as num FROM loginlog  where op_time like '%"+ queryyear +"-"+ querymonth +"%' or op_time like '%"+ queryyear +"-0"+ querymonth +"%'";
		strsql2="SELECT * FROM loginlog  where op_time like '%"+ queryyear +"-"+ querymonth +"%' or op_time like '%"+ queryyear +"-0"+ querymonth + "%' order by id desc";
	}
    
//得到总行数 allrownum
	ResultSet rs1 = qxbean.getResultSet(strsql);
	if(rs1.next()){allrownum=Integer.parseInt(rs1.getString("num"));}

//计算总分页数
	int onepagenum=15;
	int pagenum=(allrownum%onepagenum)==0?(allrownum/onepagenum):(allrownum/onepagenum+1);
	
//根据传过来的 strcurrentpage 得到相应页面，如果没有传值，显示第一页。
	if (strcurrentpage==null){curpage=1;}else{
		curpage=Integer.parseInt(strcurrentpage);
		if (curpage<0){curpage=1;}
		if (curpage>pagenum){curpage=pagenum;}
	}
	
//根据页数显示数据
%>
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
                    <TD vAlign="middle" bgColor="#FFEFD5">
                        <select name="queryyear" onchange="query()" id="queryyear">
                           <%ResultSet year_rs = qxbean.getResultSet("select distinct substring(op_time,0,5) as year from loginlog order by substring(op_time,0,5) desc");
                            while(year_rs.next()){
                                String stryear=year_rs.getString("year");
                            %>
                                <option <%if (queryyear.equals(stryear)){%>selected<%}%> value="<%=stryear%>"><%=stryear%>年</option>
                            <%}%>
                        </select>                        
                        <select name="querymonth" onchange="query()" id="querymonth">
                            <option <%if (querymonth.equals("0")){%>selected<%}%> value="0">所有月份</option>
                            <% for(i = 1;i<13;i++){%>
                                <option  <%if (querymonth.equals(""+i)){%>selected<%}%> value="<%=i%>"><%=i%>月</option>
                            <%}%>
                        </select>
                        <input type="button" name="btnquery" value="查看" onclick="query();" />
                    </TD>
                    <TD vAlign="middle" bgColor="#FFEFD5"></TD>
                </TR>
            </table>
			<table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
			<TR bgcolor="#FFEFD5" align="center" height="25px">
				<TD width="5%" bgcolor="#FFEFD5"><STRONG>选择</STRONG></TD>
				<TD width="20%" bgcolor="#FFEFD5"><STRONG>登录名</STRONG></TD>
				<TD width="15%" bgcolor="#FFEFD5"><STRONG>登录IP</STRONG></TD>
				<TD width="30%" bgcolor="#FFEFD5"><STRONG>登录时间</STRONG></TD>
				<TD width="30%" bgcolor="#FFEFD5"><STRONG>登录结果</STRONG></TD>
			</TR>
			<%
			i=0;
			ResultSet rs2 = qxbean.getResultSet(strsql2);
			while(rs2.next()){
				i++;
				id=rs2.getString("id");
				username=rs2.getString("username");
				user_ip=rs2.getString("user_ip");
				op_time=rs2.getString("op_time");
				op_result=rs2.getString("op_result");
				if (i>(curpage-1)*onepagenum&&i<=curpage*onepagenum){
			%>
			<TR bgcolor="#FFFAFA">
				<TD align="center"><input type="checkbox" name="chkbx" value="<%=id%>"></TD>
				<TD align="center"><%= username %></TD>
				<TD align="center"><%= user_ip %></TD>
				<TD align="center"><%= op_time %></TD>
                <%if (op_result.equals("登录失败")){%><TD align="center"><font color=red><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("登录成功")){%><TD align="center"><font color=green><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("密码错误")){%><TD align="center"><font color=blue><%= op_result %></font></TD><%}%>
                <%if (op_result.equals("用户名不存在")){%><TD align="center"><font color=blue><%= op_result %></font></TD><%}%>
			</TR>
			<%}
			}
			%>
			</TABLE>
			<%
			qxbean.close();
			%>
			<table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
				<TR>
					<TD width="30%" align="center" bgColor="#FFEFD5" height="24">
						<input type="button" name="btnselectall" value="全选" onclick="selectall()" <% if (pagenum==0){%>style="display:none"<%}%>/>
						<input type="button" name="btnunselectall" value="全不选" onclick="unselectall()" style="display:none" />
						<input type="button" name="btndelitem" value="删除" onclick="delitem()" <% if (pagenum==0){%>style="display:none"<%}%>/>
					</TD>
					<TD valign="middle" align="center" width="55%" bgcolor="#FFEFD5" >
						<span id="lPageInfo">[<STRONG><%=curpage%></STRONG>/<%=pagenum%>页] </span>
						<span id="lCount">[共<%=allrownum%>个]</span>
						<a id="first" <% if (curpage==1){%>disabled="disabled"<%}else{%>href="admin_loginlog.jsp?page=1"<%}%>>[首页]</a>
						<a id="pageup" <% if (curpage==1){%>disabled="disabled"<%}else{%>href="admin_loginlog.jsp?page=<%=curpage-1%>"<%}%>>[上一页]</a>
						<a id="pagedown" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%>href="admin_loginlog.jsp?page=<%=curpage+1%>"<%}%>>[下一页]</a>
						<a id="last" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%>href="admin_loginlog.jsp?page=<%=pagenum%>"<%}%>>[尾页]</a>
					</TD>
					<TD valign="middle" align="center" width="15%" bgColor="#FFEFD5" colSpan="3">
						<select name="selctpageno" id="selctpageno">
							<% for (int k=1;k<=pagenum;k++){%><option <%if (k==curpage){%>selected<%}%> value="<%=k%>"><%=k%></option><%}%>
						</select>
						<input type="button" name="btngoto" value="转到" onclick="gopage()"/>
					</TD>
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
	qxbean1.close();
}
%>