<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>ͳ����Ŀ����</title>
    </head>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>
            function gopage()
            {
                document.form1.action="admin_jcxmtj.jsp?page="+document.all["selctpageno"].options[document.all["selctpageno"].selectedIndex].value;
                document.form1.submit();
            }
            
            function redirectpage(pagenum)
            {
                document.form1.action="admin_jcxmtj.jsp?page="+pagenum;
                document.form1.submit();
            }
            
            function delitem(){
            if (confirm("ȷʵҪɾ����")==true){
            document.form1.action="delete_jcxmtj_tj.jsp";
            document.form1.target="_self";
            document.form1.submit();
            }
            }
            
            function query(){
            document.form1.action="admin_jcxmtj.jsp";
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
    String tempurl="xtgl/admin_jcxmtj.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String strcurrentpage = request.getParameter("page");
        String tjxm_id,tjxm,bglb;
        //�жϲ�ѯ����,����SQL���
        String condition,queryvalue,query_danwei_id,query_role_id;
        if (request.getParameter("condition")!=null){condition = qxbean.ISOtoGB(request.getParameter("condition"));}else{condition ="0";}
        if (request.getParameter("queryvalue")!=null){queryvalue = qxbean.ISOtoGB(request.getParameter("queryvalue"));}else{queryvalue ="";}
        String strsql="",strsql2="";

        %>
        <form name="form1" method="post">
            <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;ͳ����Ŀ����
				</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top" height="120">
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                    <TR>
                        <TD vAlign="middle" bgColor="#FFEFD5">&nbsp;<B>�������:</B>
                            <select name="condition" onchange="query()" id="condition">
								<option <%if (condition.equals("0")){%>selected<%}%> value="0">ȫ��</option>
								<%
								String bglb_id, bglb_name;
								ResultSet bglb_rs = qxbean.getResultSet("select distinct bgzl2_id, name from xtglt_jcxmtj inner join xtglt_bgzl2 on xtglt_bgzl2.id=bgzl2_id");
								while(bglb_rs.next()){
									bglb_id=bglb_rs.getString("bgzl2_id");
									bglb_name=bglb_rs.getString("name");
								%>
								<option <%if (condition.equals(bglb_id)){%>selected<%}%> value="<%=bglb_id%>"><%=bglb_name%></option>
								<%
								}%>
                            </select>&nbsp;
							<B>ģ������:</B><input name="queryvalue" type="text" id="queryvalue" value="<%=queryvalue%>"/>
                            <input type="button" name="btnquery" value="�鿴" onclick="query();" />
                            <input type="button" name="adduser" value="���" onclick="window.location='add_jcxmtj.jsp'" />
                        </TD>
                        <TD vAlign="middle" bgColor="#FFEFD5"></TD>
                    </TR>
                </table>
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="5%" bgcolor="#FFEFD5"><STRONG>ѡ��</STRONG></TD>                    
					<TD width="15%" bgcolor="#FFEFD5"><STRONG>ģ������</STRONG></TD>
					<TD width="12%" bgcolor="#FFEFD5"><STRONG>�������</STRONG></TD>
					<TD width="68%" bgcolor="#FFEFD5"><STRONG>��Ŀ����</STRONG></TD>
                </TR>
            <%
			//����Ƿּ�����Ա
			//condition=0 û�в�ѯ����,Ĭ�ϲ�ѯ
			if (condition.equals("0")){
				strsql="select count(*) as num from xtglt_jcxmtj where tjxm like '%"+ queryvalue +"%'";
				strsql2="select xtglt_jcxmtj.id,tjxm,name from xtglt_jcxmtj inner join xtglt_bgzl2 on xtglt_jcxmtj.bgzl2_id=xtglt_bgzl2.id where tjxm like '%"+ queryvalue +"%' order by bgzl2_id asc, xtglt_jcxmtj.id desc";
			}else{
				strsql="select count(*) as num from xtglt_jcxmtj where bgzl2_id='"+ condition +"' and tjxm like '%"+ queryvalue +"%'";
				strsql2="select xtglt_jcxmtj.id,tjxm,name from xtglt_jcxmtj inner join xtglt_bgzl2 on xtglt_jcxmtj.bgzl2_id=xtglt_bgzl2.id where bgzl2_id='"+ condition +"' and tjxm like '%"+ queryvalue +"%' order by xtglt_jcxmtj.id desc";
			}
			
			String strallrownum="";
			int allrownum=0;
			int curpage=0;
			//�õ������� allrownum
			ResultSet rs1 = qxbean.getResultSet(strsql);
			if(rs1.next()){allrownum=Integer.parseInt(qxbean.ISOtoGB(rs1.getString("num"))); }
			
			//�����ܷ�ҳ��
			int onepagenum=10;
			int pagenum=(allrownum%onepagenum)==0?(allrownum/onepagenum):(allrownum/onepagenum+1);
			
			//���ݴ������� strcurrentpage �õ���Ӧҳ�棬���û�д�ֵ����ʾ��һҳ��
			if (strcurrentpage==null){curpage=1;}else{
				curpage=Integer.parseInt(strcurrentpage);
				if (curpage<0){curpage=1;}
				if (curpage>pagenum){curpage=pagenum;}
			}
			
			//����ҳ����ʾ����
			
			int i=0;
			ResultSet rs2 = qxbean.getResultSet(strsql2);
			while(rs2.next()){
				i++;
				tjxm_id=rs2.getString("id");
				tjxm=rs2.getString("tjxm");
				bglb=rs2.getString("name");

				if (i>(curpage-1)*onepagenum&&i<=curpage*onepagenum){
			%>
			<TR bgcolor="#FFFAFA" align="center">
				<TD><input type="checkbox" name="chkbx" id="chkbx" value="<%=tjxm_id%>"> </TD>
				<TD><A Href = "edit_jcxmtj.jsp?id=<%=tjxm_id%>"><font color="#0000FF"><%= tjxm %></font></A></TD>
				<TD><%= bglb %></TD>
				<TD align="left">
				<%//����tjxm_id�õ�ͳ����Ŀ����
				String temp_id="",temp_name="";
				ResultSet jcxm_rs = qxbean1.getResultSet("select jcxm_id,jcxm from xtglt_jcxmtj_jcxm inner join xtglt_jcxm on xtglt_jcxm.id=jcxm_id where jcxmtj_id='"+ tjxm_id +"' order by jcxm asc");
				while(jcxm_rs.next()){
					temp_id=jcxm_rs.getString("jcxm_id");
					temp_name=jcxm_rs.getString("jcxm");
				%>
					<A Href = "edit_jcxm_jcxmtj.jsp?id=<%=temp_id%>"><font color="#0000FF"><%= temp_name %></font></A>&nbsp;
				<%}%>			
				</TD>
			</TR>
			<%
				}
			}
			%>
			</TABLE>
			<table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
				<TR>
					<TD width="30%" align="center" bgColor="#FFEFD5" height="24">
						<input type="button" name="btnselectall" value="ȫѡ" onclick="selectall()" <% if (pagenum==0){%>style="display:none"<%}%>/>
						<input type="button" name="btnunselectall" value="ȫ��ѡ" onclick="unselectall()" style="display:none" />
						<input type="button" name="btndelitem" value="ɾ��" onclick="delitem()" <% if (pagenum==0){%>style="display:none"<%}%>/>
					</TD>
					<TD valign="middle" align="center" width="55%" bgcolor="#FFEFD5" >
						<span id="lPageInfo">[<STRONG><%=curpage%></STRONG>/<%=pagenum%>ҳ] </span>
						<span id="lCount">[��<%=allrownum%>��]</span>
						<a id="first" <% if (curpage==1){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(1);"<%}%>>[��ҳ]</a>
						<a id="pageup" <% if (curpage==1){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=curpage-1%>);"<%}%>>[��һҳ]</a>
						<a id="pagedown" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=curpage+1%>);"<%}%>>[��һҳ]</a>
						<a id="last" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=pagenum%>);"<%}%>>[βҳ]</a>
					</TD>

					<TD valign="middle" align="center" width="15%" bgColor="#FFEFD5" colSpan="3">
						<select name="selctpageno" id="selctpageno">
							<% for (int k=1;k<=pagenum;k++){%><option <%if (k==curpage){%>selected<%}%> value="<%=k%>"><%=k%></option><%}%>
						</select>
						<input type="button" name="btngoto" value="ת��" onclick="gopage()"/>
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
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>