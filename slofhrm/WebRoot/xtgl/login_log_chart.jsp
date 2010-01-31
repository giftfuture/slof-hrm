<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%> 
<%@ page import="java.sql.*" %>
<%@page import="ChartDirector.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<script language=javascript>
	function query(){
		document.form1.action="login_log_chart.jsp";
		document.form1.submit();
	}
</script>
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

//数据库中含有数据的最近年份
String DataNowYear="";
ResultSet getyear_rs = qxbean.getResultSet("select distinct substring(op_time,0,5) as year from loginlog order by substring(op_time,0,5) desc");
if(getyear_rs.next()){
	DataNowYear = getyear_rs.getString("year");
}else{
	DataNowYear = nowyear;
}

//判断查询条件,生成SQL语句
	String queryyear_start="",querymonth_start="",queryyear_end="",querymonth_end="";
	if (request.getParameter("queryyear_start")!=null){
		queryyear_start = qxbean.ISOtoGB(request.getParameter("queryyear_start"));
	}else{
		queryyear_start = DataNowYear;
	}
	if (request.getParameter("querymonth_start")!=null){querymonth_start = qxbean.ISOtoGB(request.getParameter("querymonth_start"));}else{querymonth_start =1+"";}

	if (request.getParameter("queryyear_end")!=null){
		queryyear_end = qxbean.ISOtoGB(request.getParameter("queryyear_end"));
	}else{
		queryyear_end = DataNowYear;
	}	
	if (request.getParameter("querymonth_end")!=null){querymonth_end = qxbean.ISOtoGB(request.getParameter("querymonth_end"));}else{querymonth_end =nowmonth;}
/*
out.println(queryyear_start);
out.println(querymonth_start);
out.println(querymonth_start.length());
out.println("<BR>");
out.println(queryyear_end);
out.println(querymonth_end);
out.println(querymonth_end.length());
out.println("<BR>");
*/

//得到整型的年月值
int int_queryyear_start=Integer.parseInt(queryyear_start);
int int_querymonth_start=Integer.parseInt(querymonth_start);
int int_queryyear_end=Integer.parseInt(queryyear_end);
int int_querymonth_end=Integer.parseInt(querymonth_end);

//得到查询时用到的月份值
String sql_querymonth_start="",sql_querymonth_end="";
if(querymonth_start.length()==1){sql_querymonth_start="0" + querymonth_start;}else{sql_querymonth_start=querymonth_start;}
if(querymonth_end.length()==1){sql_querymonth_end="0" + querymonth_end;}else{sql_querymonth_end=querymonth_end;}

//根据起始，终止日期，得到相应的查询条件。
String sql_count="";
if(int_queryyear_start>int_queryyear_end){%>
	<script language=javascript>
		alert("起始年份不能大于终止年份!");
		history.back();
	</script>
<%
	return;
}

if(int_queryyear_start==int_queryyear_end){
	if(int_querymonth_start>int_querymonth_end){%>
		<script language=javascript>
			alert("起始月份不能大于终止月份!");
			history.back();
		</script>
	<%
		return;
	}

	if(int_querymonth_start==int_querymonth_end){
		sql_count="select count(*) as num, substring(op_time,0,8) as year_month from loginlog where op_time like '%" + queryyear_start + "-" + sql_querymonth_start + "%' group by substring(op_time,0,8)";
	}
	
	if(int_querymonth_start<int_querymonth_end){
		sql_count="select count(*) as num, substring(op_time,0,8) as year_month from loginlog where op_time between '" + queryyear_start + "-" + sql_querymonth_start + "' and '"+ queryyear_start + "-" + sql_querymonth_end + "' or op_time like '%" + queryyear_start + "-" + querymonth_start + "%' or op_time like '%" + queryyear_end + "-" + sql_querymonth_end + "%' group by substring(op_time,0,8)";
	}
}

if(int_queryyear_start<int_queryyear_end){
	sql_count="select count(*) as num, substring(op_time,0,8) as year_month from loginlog where op_time between '" + queryyear_start + "-" + sql_querymonth_start + "' and '"+ queryyear_end + "-" + sql_querymonth_end + "' or op_time like '%" + queryyear_start + "-" + sql_querymonth_start + "%' or op_time like '%" + queryyear_end + "-" + sql_querymonth_end + "%' group by substring(op_time,0,8)";
}

String delete_start=queryyear_start + "-" + sql_querymonth_start;
String delete_end=queryyear_end + "-" + sql_querymonth_end;

int arynum=(int_queryyear_end-int_queryyear_start)*12 + int_querymonth_end - int_querymonth_start + 1;
//得到X坐标日期数组
String[] Xlabels = new String[arynum];
int tempyear=int_queryyear_start;
int tempmonth=int_querymonth_start;
for(int j=0;j<arynum;j++){
	if (tempmonth==13){
		tempyear++;
		tempmonth=1;
	}
	if(tempmonth<10){Xlabels[j] = tempyear + "-0" + tempmonth;}else{Xlabels[j] = tempyear + "-" + tempmonth;}
	tempmonth++;
	//out.println(Xlabels[j]);
	//out.println("<BR>");
}
//得到数据数组
double[] logincount = new double[arynum];
int tempnum=0;
String tempyear_month="";
ResultSet getcount_rs = qxbean.getResultSet(sql_count);
while(getcount_rs.next()){
	tempnum = Integer.parseInt(getcount_rs.getString("num"));
	tempyear_month = getcount_rs.getString("year_month");
	for(int j=0;j<arynum;j++){
		if(Xlabels[j].equals(tempyear_month)){
			logincount[j]=tempnum;
		}
	}
}
	
//out.println(sql_count);
//out.println("<BR>");
//out.println(arynum);
//out.println("<BR>");

//
//For demo purpose, we use hard coded data. In real life, the following data
//could come from a database.
//
//double[] revenue = {4500, 5600, 6300, 8000, 12000, 14000, 16000, 20000, 24000,28000};
//String[] labels = {"1992", "1993", "1994", "1995", "1996", "1997", "1998","1999", "2000", "2001"};

//Create a XYChart object of size 450 x 200 pixels
XYChart c = new XYChart((50+45*arynum+35), 300);

//Add a title to the chart using Times Bold Italic font
c.addTitle("登录日志统计表", "宋体 Bold");

//Set the plotarea at (60, 25) and of size 350 x 150 pixels
c.setPlotArea(50, 40, 45*arynum, 240);

//Add a blue (0x3333cc) bar chart layer using the given data. Set the bar border
//to 1 pixel 3D style.
//c.addBarLayer(revenue, 0x3333cc, "Revenue").setBorderColor(-1, 1);

//Add a multi-color bar chart layer
BarLayer layer = c.addBarLayer3(logincount);

//Set layer to 3D with 10 pixels 3D depth
//layer.set3D(10);

//Set bar shape to circular (cylinder)
layer.setBarShape(Chart.CircleShape);

double bargap = 3 * 0.25 - 0.25;
layer.setBarGap(bargap);

//Set x axis labels using the given labels
//c.xAxis().setLabels(labels);
c.xAxis().setLabels(Xlabels);

//Add a title to the y axis
c.yAxis().setTitle("次 数", "宋体 Bold");

//Create the image and save it in a temporary location
String chart1URL = c.makeSession(request, "chart1");

//Create an image map for the chart
String imageMap1 = c.getHTMLImageMap("query_loginlog.jsp", "",
    "title=' {value|0} 次'");
%>
<script language=javascript>
	function deleteall(){
		if (confirm("确实要删除 “<%=delete_start%>”—“<%=delete_end%>”内的日志吗？")==true){
			window.location="delete_loginlog_year.jsp?start=<%=delete_start%>&end=<%=delete_end%>";
		}
	}
</script>
<html>
<body topmargin="5" leftmargin="5" rightmargin="0">
<form name="form1">
<div>登录日志按月份统计</div>
<hr color="#000080">
<table align="left" cellSpacing="0" cellPadding="0" width="100%" border="0">
	<TR>
		<TD align="center" height="50">
			<B>起始日期：</B>
			<select name="queryyear_start" id="queryyear_start">
			   <%int hasyear=0;
			    ResultSet year_rs = qxbean.getResultSet("select distinct substring(op_time,0,5) as year from loginlog order by substring(op_time,0,5) desc");
				while(year_rs.next()){
					String stryear=year_rs.getString("year");
				%>
					<option <%if (queryyear_start.equals(stryear)){%>selected<%}%> value="<%=stryear%>"><%=stryear%>年</option>
				<%hasyear++;
				}
				if(hasyear==0){%>
					<option value="<%=nowyear%>"><%=nowyear%>年</option>
				<%}%>
			</select>                        
			<select name="querymonth_start" id="querymonth_start">
				<% for(int i = 1;i<13;i++){%>
					<option  <%if (querymonth_start.equals(""+i)){%>selected<%}%> value="<%=i%>"><%=i%>月</option>
				<%}%>
			</select>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<B>终止日期：</B>
			<select name="queryyear_end" id="queryyear_end">
			   <%year_rs = qxbean.getResultSet("select distinct substring(op_time,0,5) as year from loginlog order by substring(op_time,0,5) desc");
				while(year_rs.next()){
					String stryear=year_rs.getString("year");
				%>
					<option <%if (queryyear_end.equals(stryear)){%>selected<%}%> value="<%=stryear%>"><%=stryear%>年</option>
				<%hasyear++;
				}
				if(hasyear==0){%>
					<option value="<%=nowyear%>"><%=nowyear%>年</option>
				<%}%>
			</select>                        
			<select name="querymonth_end" id="querymonth_end">
				<% for(int i = 1;i<13;i++){%>
					<option  <%if (querymonth_end.equals(""+i)){%>selected<%}%> value="<%=i%>"><%=i%>月</option>
				<%}%>
			</select>
			&nbsp;&nbsp;<input type="button" value="确定" onclick="query()">
		</TD>
	</TR>
	<TR>
		<TD align="center">
			<img src='<%=response.encodeURL("getchart.jsp?"+chart1URL)%>' usemap="#map1" border="0">
			<map name="map1"><%=imageMap1%></map>
		</TD>
	</TR>
	<TR>
		<TD height="20">
		
		</TD>
	</TR>	
	<TR>
		<TD align="center" height="30">
			<input type="button" value="删除选定日期内的日志" onclick="deleteall()">
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