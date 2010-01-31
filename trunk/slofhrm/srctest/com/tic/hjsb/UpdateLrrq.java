package com.tic.hjsb;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import jlcx.DBConnConf;

public class UpdateLrrq {
	public static void main(String[] args) throws Exception{
		DBConnConf qxbean = new DBConnConf();
		DBConnConf qxbean1 = new DBConnConf();
		String all_sql = "select id from hysy_sbxx";
		ResultSet rs_all = qxbean.getResultSet(all_sql);
		while (rs_all.next()) {
			String id = rs_all.getString("id");
			String lrrq="2009-12-21";
			String update_sql = "update hysy_sbxx set lrrq ='"+lrrq+"' where id ='"+id+"'";
			try {
				qxbean1.execute(update_sql);
			} catch (Exception e) {
				System.out.println("id:"+id+"------"+e.getMessage()+"\r\n");
			}
		}
	}
}
