<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>�޸Ĺ���</title>
    </head>
    <script language=javascript>
        function datacheck(){
			if(document.form1.gnname.value==""){
				alert("����������˵�����!");
				document.form1.gnname.focus();
				return;
			}
			if(document.all['gnlx'][1].checked==true&&document.form1.description.value==""){
				alert("�ļ�·������Ϊ��!");
				document.form1.description.focus();
				return;
			}			
			if(document.all['gnlx'][2].checked==true&&document.form1.description.value==""){
				alert("��������������ļ�!");
				document.form1.select_filepath.focus();
				return;
			}else{
				document.form1.submit();
			}			
        }
		
		//Ŀ¼�˵�ѡ��
        function mlcd_onclick(){
			document.all['tr_filepath'].style['display']='none';
			document.all['tr_glgn'].style['display']='none';
			document.all['description'].value='';
        }
		//���ܲ˵�ѡ��
		function gncd_onclick(){
			document.all['tr_filepath'].style['display']='inline';
			document.all['tr_glgn'].style['display']='none';
			document.all['description'].readOnly=false;
        }
		//����˵�ѡ��
		function fzcd_onclick(){
			document.all['tr_filepath'].style['display']='inline';
			document.all['tr_glgn'].style['display']='inline';
			document.all['description'].readOnly=true
			document.all['description'].value='';
        }
		//��ѡ�����˵�ʱ
		function zcd_onclick(){
			if(document.all['superiorid_lvl'].value==""){
				document.all['tr_gnlx'].style['display']='none';
				document.all['tr_txcd'].style['display']='inline';
			}else{
				document.all['tr_gnlx'].style['display']='inline';
				document.all['tr_txcd'].style['display']='none';
				document.all['gnlx'][0].checked=true;
				document.all['gnlx'][1].checked=false;
				document.all['gnlx'][2].checked=false;
				document.all['ckbtxcd'].checked=false;
			}
			mlcd_onclick();
        }
    </script>
    <body topmargin="1" leftmargin="0">
    <form action="edit_gn_tj.jsp" method="post" name="form1">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_gn.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
            String id = request.getParameter("id");
            String name="";
            String superior_id="";
            String description="";
			String gnlx="";
			String gn_id_main="";
			String Find_gnid_main="false";
            ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_gn where id='"+id+"'");
            if(rsGetData.next()){
                name=rsGetData.getString("name");
                superior_id=rsGetData.getString("superior_id");
                description=rsGetData.getString("description");
				gnlx=rsGetData.getString("flag");
            }
			//���gnlx=3��Ҫ�õ������������ܲ˵�gn_id_main
			if (gnlx.equals("3")){
				ResultSet gnid_main_rs = qxbean.getResultSet("SELECT * FROM xtglt_gn_menu where gn_id_sub='"+id+"'");
				if(gnid_main_rs.next()){
					gn_id_main=gnid_main_rs.getString("gn_id_main");
				}
			}
            %>
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
                <TR>
                    <TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;�޸Ĺ���</DIV></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�˵�����</TD>
                                <TD bgColor="#ffffff" ><input name="gnname" type="text" size="50" value="<%=name%>" maxlength="50" id="gnname"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�ϼ��˵�����</TD>
                                <TD bgColor="#ffffff">
                                <!-- �оٵ��ϼ��˵����ܰ������˵������¼��˵� -->
									<select name="superiorid_lvl" onchange="zcd_onclick()">
                                        <option <%if (superior_id.equals(id)){%>selected<%}%> value="">���˵�</option>
                                        <%
                                        String allid,lvl,zhu_id;
                                        int i=0,intlvl=0,HasSub=0,is_zhu=0;
										//��������˵�ֱ���������������к���GetSubgn_ExceptID,ֱ��ȡ���������˵����¼��˵�
										ResultSet is_zhu_rs = qxbean.getResultSet("SELECT count(*) as num FROM xtglt_gn WHERE id=superior_id and id='"+ id +"'");
										if(is_zhu_rs.next()) {
											is_zhu=Integer.parseInt(is_zhu_rs.getString("num"));
										}
										if (is_zhu>0){
											ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id and id<>'"+id+"' order by id");
											while(zhu_rs.next()){
												zhu_id=zhu_rs.getString("id");
												ResultSet rs = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+")");
												while(rs.next()) {
													allid=rs.getString("id");
													name=rs.getString("name");
													lvl=rs.getString("lvl");
													HasSub=Integer.parseInt(rs.getString("hassub"));
													intlvl=Integer.parseInt(lvl)-1;
											%>                                  
											<option <%if (allid.equals(superior_id)&& !superior_id.equals(id)){%>selected<%}%> value="<%=allid%>_<%=lvl%>"><%for(i=0;i<intlvl;i++){out.println("��");}%><%if (HasSub==0){out.println("����");}else{out.println("��-��");}%><%=name%></option>
												<%}
											}
										//����������˵���ʹ�ú���GetSubgn_ExceptID
										}else{
											ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id and id<>'"+id+"' order by id");
											while(zhu_rs.next()){
												zhu_id=zhu_rs.getString("id");
												ResultSet rs = qxbean1.getResultSet("select * from GetSubgn_ExceptID(1,"+zhu_id+",'"+id+"')");
												while(rs.next()) {
													allid=rs.getString("id");
													name=rs.getString("name");
													lvl=rs.getString("lvl");
													HasSub=Integer.parseInt(rs.getString("hassub"));
													intlvl=Integer.parseInt(lvl)-1;
											%>                                  
											<option <%if (allid.equals(superior_id)&& !superior_id.equals(id)){%>selected<%}%> value="<%=allid%>_<%=lvl%>"><%for(i=0;i<intlvl;i++){out.println("��");}%><%if (HasSub==0){out.println("����");}else{out.println("��-��");}%><%=name%></option>
												<%}
											}
										}%>
                                    </select>
                                    <FONT face="����" color="#ff0000">*</FONT>
                                </TD>
                            </TR>
							<TR id="tr_gnlx" style="display:<%if(gnlx.equals("4")){%>none<%}else{%>inline<%}%>">
                                <TD align="center" bgColor="#FFFAFA">��������</TD>
                                <TD bgColor="#ffffff">									
									<input type="radio" name="gnlx" id="gnlx" value="2" <%if(gnlx.equals("2")){%>checked<%}%> onclick="mlcd_onclick()">Ŀ¼�˵�&nbsp;&nbsp;
									<input type="radio" name="gnlx" id="gnlx" value="1" <%if(gnlx.equals("1")){%>checked<%}%> onclick="gncd_onclick()">���ܲ˵�&nbsp;&nbsp;
									<input type="radio" name="gnlx" id="gnlx" value="3" <%if(gnlx.equals("3")){%>checked<%}%> onclick="fzcd_onclick()">����˵�
								</TD>
                            </TR>
							<TR id="tr_txcd" style="display:<%if(gnlx.equals("4")){%>inline<%}else{%>none<%}%>">
								<TD align="center" bgColor="#FFFAFA">������ϵ�˵�</TD>
								<TD bgColor="#ffffff"><input type="checkbox" id="ckbtxcd" name="ckbtxcd" value="4" <%if(gnlx.equals("4")){%>checked<%}%>>&nbsp;���ڱ�����ϵ�˵�</TD>
							</TR>
                            <TR id="tr_glgn" <%if(gnlx.equals("1")||gnlx.equals("2")||gnlx.equals("4")){%>style="display:none"<%}else{%>style="display:inline"<%}%>>
                                <TD align="center" bgColor="#FFFAFA">���������ļ�</TD>
                                <TD bgColor="#ffffff">
                                   <select name="select_filepath" onchange="document.all['description'].value=document.all['select_filepath'].value.split(':')[1]">
<%
	ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id order by id");
	while(zhu_rs.next()){
		zhu_id=zhu_rs.getString("id");
		ResultSet rs = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+") where flag<>'3'");
		while(rs.next()){
			allid=rs.getString("id");
			name=rs.getString("name");
			String filepath=rs.getString("description");
			lvl=rs.getString("lvl");
			HasSub=Integer.parseInt(rs.getString("hassub"));
			intlvl=Integer.parseInt(lvl)-1;
		%>                                
			<option <%if (gn_id_main.equals(allid)){Find_gnid_main="true";%>selected<%}%> value="<%=allid%>:<%=filepath%>"><%for(i=0;i<intlvl;i++){out.println("��");}%><%if (HasSub==0){out.println("����-");}else{out.println("��-��");}%><%=name%></option>
		<%}
	 }%>
                                    </select>
								</TD>
                            </TR>
                            <TR id="tr_filepath" <%if(gnlx.equals("2")||gnlx.equals("4")){%>style="display:none"<%}else{%>style="display:inline"<%}%>>
                                <TD align="center" bgColor="#FFFAFA">�ļ�·��</TD>
                                <TD bgColor="#ffffff"><input type=text size="50" name="description" <%if(gnlx.equals("3")){%>readOnly=true<%}%> value="<%
								if(gnlx.equals("3")){
									if(Find_gnid_main.equals("true")){
										out.println(description);
									}
								}
								if(gnlx.equals("2")){
									out.println("");
								}
								if(gnlx.equals("1")){
									out.println(description);
								}%>"><FONT face="����" color="#ff0000"><B>�ο�:*.jsp, */*.jsp, */*.htm</B></FONT></TD>
                            </TR>
                    
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="����" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="��д" />&nbsp;&nbsp;
                                    <input type="button" name="return" value="����" onclick="window.location='admin_gn.jsp'" />
                                </TD>
                            </TR>
                        </TABLE>
                    </TD>
                </TR>
            </table>
            <input type="hidden" name="id" value="<%=id%>">
			 <input type="hidden" name="last_superior_id" value="<%=superior_id%>">
        </form>
    </body>
</html><%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>