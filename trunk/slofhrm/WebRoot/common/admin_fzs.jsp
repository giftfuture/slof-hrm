<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<LINK href="../xtgl/xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>��ѧ����ʽ����</title>
    </head>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean2" scope="page" class="jlcx.DBConn"/>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>
            function gopage()
            {
                document.form1.action="admin_fzs.jsp?page="+document.all["selctpageno"].options[document.all["selctpageno"].selectedIndex].value;
                document.form1.submit();
            }
            
            function redirectpage(pagenum)
            {
                document.form1.action="admin_fzs.jsp?page="+pagenum;
                document.form1.submit();
            }
            
            function delitem(){
            if (confirm("ȷʵҪɾ����")==true){
            document.form1.action="delete_fzs_tj.jsp";
            document.form1.target="_self";
            document.form1.submit();
            }
            }
            
            function query(){
            document.form1.action="admin_fzs.jsp";
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
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="common/admin_fzs.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String strcurrentpage = request.getParameter("page");
        String fzs_id="", chem_name="", cn_name="", isvalid="";
        //�жϲ�ѯ����,����SQL���
        String queryvalue,query_danwei_id,query_role_id;
        if (request.getParameter("queryvalue")!=null){queryvalue = qxbean.ISOtoGB(request.getParameter("queryvalue"));}else{queryvalue ="";}
        String strsql="",strsql2="";

        %>
        <form name="form1" method="post">
            <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;��ѧ����ʽ����</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top" height="120">
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                    <TR>
                        <TD vAlign="middle" bgColor="#FFEFD5">
                            <input name="queryvalue" type="text" id="queryvalue" value="<%=queryvalue%>"/>
                            <input type="button" name="btnquery" value="�鿴" onclick="query();" />
                            <input type="button" name="adduser" value="���" onclick="window.location='add_fzs.jsp'" />
                        </TD>
                        <TD vAlign="middle" bgColor="#FFEFD5"></TD>
                    </TR>
                </table>
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="10%" bgcolor="#FFEFD5"><STRONG>ѡ��</STRONG></TD>
                    <!--<TD width="25%" bgcolor="#FFEFD5"><STRONG>��Ŀ���</STRONG></TD>-->
					<TD width="20%" bgcolor="#FFEFD5"><STRONG>����ʽ����</STRONG></TD>
					<TD width="20%" bgcolor="#FFEFD5"><STRONG>����ʽ</STRONG></TD>
					<TD width="50%" bgcolor="#FFEFD5"><STRONG>&nbsp;</STRONG></TD>
                </TR>
            <%
			
			strsql="select count(*) as num from xtglt_insert_char where char_type='chem' and cn_name like '%"+ queryvalue +"%'";
			strsql2="select * from xtglt_insert_char where char_type='chem' and cn_name like '%"+ queryvalue +"%' order by cn_name asc";
			String strallrownum="";
			int allrownum=0;
			int curpage=0;
			//�õ������� allrownum
			try {
				ResultSet rs1 = qxbean.getResultSet(strsql);
				if(rs1.next()){allrownum=Integer.parseInt(qxbean.ISOtoGB(rs1.getString("num"))); }
			}catch(Exception e) {
				out.println("���ݿ����ʧ��,ʧ��ԭ��:<br>");
				out.println(e.getMessage());
			}
			
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
				fzs_id=rs2.getString("id");
				chem_name=rs2.getString("chem_name");
				cn_name=rs2.getString("cn_name");
				//isvalid=rs2.getString("isvalid");
				if (i>(curpage-1)*onepagenum&&i<=curpage*onepagenum){
			%>
			<TR bgcolor="#FFFAFA" align="center">
				<TD><input type="checkbox" name="chkbx" id="chkbx" value="<%=fzs_id%>"></TD>
				<TD><A Href = "edit_fzs.jsp?id=<%=fzs_id%>"><font color="#0000FF"><%=cn_name%></font></A></TD>
				<TD><%=chem_name%></TD>
				<TD>&nbsp;</TD>
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
<%
qxbean.close();
qxbean1.close();
qxbean2.close();
%>
    </body>
</html>
