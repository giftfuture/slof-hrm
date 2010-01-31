<%@ page contentType="text/html; charset=GB2312" language="java" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Date"%>
<%@ page import="java.io.*" %>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<html>
<head>
<title>报告封面内容维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<%
try{
int Page_Height=1140;
int Page_Width=790;
int Content_Height=800;
int Content_Width=640;
int Page_Top_Margin=110;
int Page_Left_Margin=90;
int Body_Top_Margin=10;
int Body_Left_Margin=10;
int Two_Page_Margin=40;
%>
<style type="text/css">
    .PageBreak { page-break-after: always }
	@media screen {
		.printdiv {position:absolute; top:<%=Body_Top_Margin%>px; left:<%=Body_Left_Margin%>px; background: white; filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5, OffY=5, Color='gray', Positive='true'); visibility:visible;}
		.printkuang {BORDER-COLLAPSE: collapse; width:<%=Page_Width%>px; height:<%=Page_Height%>px; visibility:visible;}
		.printtable {position:absolute; top:<%=Page_Top_Margin%>px; left:<%=Page_Left_Margin%>px; width:<%=Content_Width%>px; visibility:visible;}
	}	
	@media print 
    {
		.printbutton {visibility:hidden;}
		.printdiv {position:absolute; top:0px; left:0px; width:0px; height:0px; visibility:hidden;}
		.printkuang {width:0px; height:0px; visibility:hidden;}
		.printtable {width:<%=Content_Width%>px; visibility:visible;}
    }
</style>
</head>
<script language="JavaScript">
	function save(){
		document.all["sm"].value =	document.all["div_sm"].innerHTML;
		document.frm.action="fmnrgl_tj.jsp";
		document.frm.submit();
	}

	function addcontent(){
		if (document.all["objectname"].value!=""&&document.all["objectnamehidden"].value!=""){
			newwin=window.open("","","resizable=yes, scrollbars=yes")
			if (document.all){
			   newwin.moveTo((screen.width-400)/2,(screen.height-310)/2)
			   newwin.resizeTo(400,310)
			}		
			newwin.location="../FCKeditor/editor_page/edit.html?n1="+ document.all["objectname"].value +"&n2=" + document.all["objectnamehidden"].value + "&v=" + document.all[document.all["objectname"].value].innerHTML;
		}else{
			alert("请先选择要编辑的位置！");
		}		
	}
	
	function GetObjectName(namehidden){
		var name = "div_"+namehidden;
		document.all["objectname"].value=name;
		document.all["objectnamehidden"].value=namehidden;
	}
</script>
<body>
<%
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/fmnrgl.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String wtdw="XXXX",bgrq="",bglx_name="XXXX",vc_jcxm="XXXX",sm="",bgbh="XXXX";
String fmdw1="",fmdw2="",fmdw1_en="",fmdw2_en="";

ResultSet fmnr_rs = qxbean.getResultSet("select * from GetSup_DanWei_info('"+ danwei_id +"')");
if(fmnr_rs.next()){
	fmdw1 = fmnr_rs.getString("fmdw1");
	fmdw1_en = fmnr_rs.getString("fmdw1_en");
	fmdw2 = fmnr_rs.getString("fmdw2");
	fmdw2_en = fmnr_rs.getString("fmdw2_en");
	sm = fmnr_rs.getString("content");
}
//----得到封面的数据
//fmdw1="胜利石油管理局采油工艺研究院";
//fmdw1_en="OIL PRODUCTION SPECIAL MATERIAL INSPECTING LABORATORY";
//fmdw2="采油工艺专用材料检验实验室";
//fmdw2_en="OIL PRODUCTION RESEARCH INSTITIUTE SHENGLI PETROLEUM ADMINISTRATIVE BUREAU";
//此处不用
//处理报告日起格式将"2005-8-30"转换为"2005 年 8 月 30 日"
//new_bgrq=bgrq.split("-")[0]+" 年 "+bgrq.split("-")[1]+" 月 "+bgrq.split("-")[2]+" 日";
//------------报告封面-----------------
%>
<form name="frm" method="post">
<DIV class="printdiv">
	<table class="printkuang" borderColor="black" border="1" align="center" cellpadding="0" cellspacing="0">
		<tr>
			<td align="center" valign="top">
				&nbsp;
			</td>
		</tr>
	</table>
</DIV>
<table class="printtable" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr><td align="center">
		<table width="540" height="150" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr>
				<td>&nbsp;</td>
			</tr>
		</table>
		<BR>
		<table width="640" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" style="font:normal bolder 42pt;letter-spacing:3cm">检验报告</td>
			</tr>
			<tr height="70px">
				<td align="center" style="font:normal bolder 18pt;letter-spacing:0mm">INSPECTING&nbsp;&nbsp;REPORT</td>
			</tr>
		</table>
		<table width="450" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr align="center"><td style="font:normal 16pt">报告编号&nbsp;<B>NO.<%=bgbh%></B></td></tr>
			<tr height="90"><td style="font:normal bolder 10pt">&nbsp;</td></tr>	
		</table>
		
		<table width="350" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr height="30px">
				<td width="90" style="font:normal 14pt" >产品名称</td>
				<td width="270" style="text-align:center; font:normal 14pt; border:none; border-bottom-style:solid; border-bottom-color:#000000; border-bottom-width:1px"><%=vc_jcxm%></td>
			</tr>
			<tr height="25px"><td style="font:normal bolder 14pt" colspan="2">PRODUCT</td></tr>
			<tr height="30"><td style="font:normal bolder 10pt">&nbsp;</td></tr>	
		</table>
		
		<table width="350" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr height="30px">
				<td width="90" style="font:normal 14pt">受检单位</td>
				<td width="270" style="text-align:center; font:normal 14pt; border:none; border-bottom-style:solid; border-bottom-color:#000000; border-bottom-width:1px"><%=wtdw%></td>
			</tr>
			<tr height="25px"><td style="font:normal bolder 14pt" colspan="2">INSPECTED ENTERPRISE</td></tr>
			<tr height="30"><td style="font:normal bolder 10pt">&nbsp;</td></tr>	
		</table>
		
		<table width="350" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr height="30px">
				<td width="90" style="font:normal 14pt">检验类别</td>
				<td width="270" style="text-align:center; font:normal 14pt; border:none; border-bottom-style:solid; border-bottom-color:#000000; border-bottom-width:1px"><%=bglx_name%></td>
			</tr>
			<tr height="25px"><td style="font:normal bolder 14pt" colspan="2">INSPECTING TYPE</td></tr>
			<tr height="120"><td style="font:normal bolder 10pt">&nbsp;</td></tr>	
		</table>
		
		<table width="640" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center"><input type="text" style="text-align:center; font:normal 10pt" id="fmdw1" name="fmdw1" value="<%=fmdw1%>" size="55" maxlength="50" title="最大字符串长度:50"></td>
			</tr>
			<tr>
				<td align="center"><input type="text" style="text-align:center; font:normal 10pt" id="fmdw2" name="fmdw2" value="<%=fmdw2%>" size="55" maxlength="50" title="最大字符串长度:50"></td>
			</tr>
			<tr>
				<td align="center" style="font:normal bolder 5pt">&nbsp;</td>
			</tr>			
			<tr>
				<td align="center"><textarea cols="80" rows="3" style="text-align:center; font:normal 10pt" id="fmdw1_en" name="fmdw1_en"><%=fmdw1_en%></textarea></td>
			</tr>
			<tr>
				<td align="center"><textarea cols="80" rows="3" style="text-align:center; font:normal 10pt" id="fmdw2_en" name="fmdw2_en"><%=fmdw2_en%></textarea></td>
			</tr>
		</table>
		<BR>
	</td></tr>
</table>
<style type="text/css">
	@media screen {
		.printdiv_1 {position:absolute; top:<%=Body_Top_Margin+1*(Page_Height+Two_Page_Margin)%>px; left:<%=Body_Left_Margin%>px; background: white; filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5, OffY=5, Color='gray', Positive='true'); visibility:visible;}
		.printkuang_1 {BORDER-COLLAPSE: collapse; width:<%=Page_Width%>px; height:<%=Page_Height%>px; visibility:visible;}
		.printtable_1 {position:absolute; top:<%=Page_Top_Margin+1*(Page_Height+Two_Page_Margin)%>px; left:<%=Page_Left_Margin%>px; width:<%=Content_Width%>px; visibility:visible;}
	}	
	@media print {
		.printdiv_1 {position:absolute; top:0px; left:0px; width:0px; height:0px; visibility:hidden;}
		.printkuang_1 {width:0px; height:0px; visibility:hidden;}
		.printtable_1 {width:<%=Content_Width%>px; visibility:visible;}
    }
</style>
<DIV class="printdiv_1">
	<table class="printkuang_1" borderColor="black" border="1" align="center" cellpadding="0" cellspacing="0">
		<tr><td align="center" valign="bottom">
			&nbsp;
		</td></tr>
	</table>
</DIV>
<table class="printtable_1" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr><td align="center" >
		<table width="400" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr height="30">
				<td align="center" style="font:normal bolder 18pt;letter-spacing:0.4cm">封面反面内容</td>
			</tr>			
			<tr><td align="center"><a href="javascript:addcontent();"><img valign="middle" alt='编辑器' src='../root_img/edit.gif' border="0" style="cursor:hand"></a></td></tr>
		</table>
		<table width="600" border="1" cellpadding="0" cellspacing="0">
			<tr>
				<td align="left">
					<table width="100%" onclick="document.all['div_sm'].focus()" border="0" cellpadding="0" cellspacing="0">
						<tr height="60" >
							<td width="2%">&nbsp;</td>
							<td width="96%" valign="top"><div id="div_sm" name="div_sm" valign="top" contenteditable onfocus="GetObjectName('sm')"><%=sm%></div><textarea name="sm" id="sm" class="userData" STYLE="display:none;overflow:hidden;border:none;" cols="75" rows="5" wrap="VIRTUAL"><%=sm%></textarea></td>
							<td width="2%">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table width="600" border="0" cellpadding="0" cellspacing="0">
			<tr height="30"><td>&nbsp;</td></tr>
			<tr>
				<td align="center" valign="middle">
					<input type="button" name="btnsave" id="btnsave" value=" 保 存 " onClick="save()">
				</td>
			</tr>
		</table>		
	</td></tr>
</table>
<input type=hidden name="objectname" id="objectname">
<input type=hidden name="objectnamehidden" id="objectnamehidden">
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