package com.tic.hjsb;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import jlcx.DBConnConf;

public class UpdateJcrq {

	public static void main(String[] args) throws Exception{
		DBConnConf qxbean = new DBConnConf();
		DBConnConf qxbean1 = new DBConnConf();
		String all_sql = "select id,jyqk from hysy_sbxx";
		ResultSet rs_all = qxbean.getResultSet(all_sql);
		while (rs_all.next()) {
			String id = rs_all.getString("id");
			String jyqk = rs_all.getString("jyqk");
			
			List<HysySbJyqk> list_jyqk = new ArrayList<HysySbJyqk>();
			list_jyqk=JsonUtil.getDTOList(jyqk, HysySbJyqk.class);
			
			HysySbJyqk hysySbJyqk = list_jyqk.get(list_jyqk.size()-1);
			String jcbm=hysySbJyqk.getBm();
			String jcbh=hysySbJyqk.getBh();
			String jcrq=hysySbJyqk.getJr();
			String jczq=hysySbJyqk.getJz();
			String xcrq=hysySbJyqk.getXr();
			String update_sql = "update hysy_sbxx set jcbm ='"+jcbm+"', jcbh='"+jcbh+"', jcrq='"+jcrq+"',jczq='"+jczq+"',xcrq='"+xcrq+"' where id ='"+id+"'";
			try {
				qxbean1.execute(update_sql);
			} catch (Exception e) {
				System.out.println("id:"+id+"------"+e.getMessage()+"\r\n");
			}
		}
	}
}
