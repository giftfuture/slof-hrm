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
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/login_log_chart.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String gn_id=request.getParameter("gn_id");
String year_month=request.getParameter("xLabel");

//得到X坐标日期数组(天数)
String[] Xlabels = new String[31];

//得到数据数组
double[] logincount = new double[31];
for(int j=0;j<31;j++){
	Xlabels[j] = (j+1)+"";
	int tempnum=0;
	String query_day="";
	if(Xlabels[j].length()==1){query_day="0"+Xlabels[j];}else{query_day=Xlabels[j];}
	//out.println(query_day);	
	String sql_count="select count(*) as num from loginlog where op_time like '%"+ year_month +"-"+ query_day +"%'";
	ResultSet getcount_rs = qxbean.getResultSet(sql_count);	
	if(getcount_rs.next()){tempnum = Integer.parseInt(getcount_rs.getString("num"));}
	logincount[j]=tempnum;
}
XYChart c = new XYChart((50+15*31+35), 300);
c.addTitle("登录日志统计表 ("+ year_month +")", "宋体 Bold");
c.setPlotArea(50, 40, 15*31, 240);
BarLayer layer = c.addBarLayer3(logincount);
layer.setBarShape(Chart.CircleShape);
double bargap = 3 * 0.25 - 0.25;
layer.setBarGap(bargap);
c.xAxis().setLabels(Xlabels);
c.yAxis().setTitle("次 数", "宋体 Bold");
String chart1URL = c.makeSession(request, "chart1");
String imageMap1 = c.getHTMLImageMap("query_loginlog_day.jsp?y_m="+year_month, "", "title=' {value|0} 次'");
%>
<html>
<body topmargin="5" leftmargin="5" rightmargin="0">
<form name="form1">
<div>登录日志按月份统计</div>
<hr color="#000080">
<table align="left" cellSpacing="0" cellPadding="0" width="100%" border="0">
	<TR>
		<TD align="center">
			<img src='<%=response.encodeURL("getchart.jsp?"+chart1URL)%>' usemap="#map1" border="0">
			<map name="map1"><%=imageMap1%></map>
		</TD>
	</TR>
	<TR>
		<TD align="center">
			<input type="button" name="return" id="return" value=" 返 回 " onclick="window.location='login_log_chart.jsp?gn_id=<%=gn_id%>'">
		</TD>
	</TR>
</table>
</form>
</body>
</html>

