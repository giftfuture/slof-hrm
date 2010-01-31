package com.tic.hjsb;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.dozer.Mapper;
import net.sf.json.JsonConfig;

public class HysySswhServiceImpl implements IHysySswhService {
	private ICommonDao commonDao;
	private Mapper dozermapper;
	
	public String getSsfl() {
		try {
			List<HysyLb> list_lb = commonDao.findAll(HysyLb.class, "type=2", new Object[] {});
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getSslb(Integer flid) {
		try {
			List<HysyLb> list_lb = commonDao.findAll(HysyLb.class, "parentid=?", new Object[] {flid});
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getSsmc(Integer lbid) {
		try {
			List<HysyLb> list_lb = commonDao.findAll(HysyLb.class, "parentid=?", new Object[] {lbid});
			Set<String> set_ssmc = new HashSet<String>();
			for (HysyLb hysyLb : list_lb) {
				set_ssmc.add(hysyLb.getName());
			}
			
			String ssmc_sql = "select distinct ssmc from hysy_ssxx where ssid is null and lbid='"+lbid+"'";
			List<Object> list_ssmc = commonDao.findAll(ssmc_sql);
			for (Object object : list_ssmc) {
				String tmp_ssmc = (String)object;
				if(!set_ssmc.contains(tmp_ssmc)) {
					HysyLb hysylb = new HysyLb();
					hysylb.setName(tmp_ssmc);
					list_lb.add(hysylb);
				}
			}
			
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			jsonConfig.registerDefaultValueProcessor(Integer.class, new JsonDoubleValueProcessor());
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getJzdw(Integer lbid) {
	 	return getFieldValue(lbid,"jzdw");
	}
	
	public String getGgxh(Integer lbid) {
		return getFieldValue(lbid,"ggxh");
	}
	
	private String getFieldValue(Integer lbid, String fieldname) {
		try {
			String jsonStr="[";
			String jzdw_sql = "select distinct "+fieldname+" from hysy_ssxx where "+fieldname+"<>'' and lbid='"+lbid+"' order by "+fieldname;
			List<Object> list_jzdw = commonDao.findAll(jzdw_sql);
			for (Object object : list_jzdw) {
				String tmp_jzdw = (String)object;
				jsonStr=jsonStr+"{name:\""+tmp_jzdw+"\"},";
			}
			jsonStr=jsonStr.substring(0,jsonStr.length()-1);
			jsonStr=jsonStr+"]";
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getSsmcBySsxxSql() {
		try {
			String sql = "select distinct ssmc from hysy_ssxx where ssid is null";
			List<Object> list_lb = commonDao.findAll(sql);
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getSsmcBySsxxHql() {
		try {
			String hql = "select distinct ssmc from HysySsxx where ssid is null";
			List<HysySsxx> list_lb = commonDao.getHqlList(hql);
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getJybm() {
		try {
			String jsonStr="[";
			String jybm_sql = "select distinct jybm from hysy_ssjybm order by jybm";
			List<Object> list_jybm = commonDao.findAll(jybm_sql);
			for (Object object : list_jybm) {
				String tmp_jybm = (String)object;
				jsonStr=jsonStr+"{name:\""+tmp_jybm+"\"},";
			}
			jsonStr=jsonStr.substring(0,jsonStr.length()-1);
			jsonStr=jsonStr+"]";
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getLbmc(Integer lbid) {
		try {
			String lbmc_sql = "select name from hysy_lb where id ='"+lbid+"'";
			List<Object> list_lbmc = commonDao.findAll(lbmc_sql);
			return list_lbmc.get(0).toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Integer getSsid(String ssmc) {
		try {
			String ssid_sql = "select id from hysy_lb where name ='"+ssmc+"'";
			List<Object> list_ssid = commonDao.findAll(ssid_sql);
			if(list_ssid.size()>0){
				return (Integer)list_ssid.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private String getDwmc(Integer lrdwId) {
		try {
			String lrdwmc_sql = "select name from xtglt_danwei where id ='"+lrdwId+"'";
			List<Object> list_lrdwmc = commonDao.findAll(lrdwmc_sql);
			return list_lrdwmc.get(0).toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Page findHysySsxxByPage(Page page,String danwei_id,String cx) {
		try {
			String hql = "FROM HysySsxx";
			String count_hql = "select count(*) FROM HysySsxx";
			String str_orderc = "id desc";
			if (page.getSortfiled() != null && !page.getSortfiled().equals("")) {
				str_orderc = page.getSortfiled() + " " + page.getSortdirection();
			}
			String wheresql = getWhereSqlByPage(page,danwei_id,cx);
            
			hql = hql + wheresql;
			count_hql = count_hql + wheresql;

			String hql_order = " order by " + str_orderc;
			hql = hql + hql_order;
//            System.out.print(hql);
			List<HysySsxx> ls = commonDao.findObjectByPage(hql, page.getStart(), page.getLimit());
			
			//添加类别名称，单位名称，分类id，分类名称
			for (HysySsxx hysySsxx : ls) {
				if(hysySsxx.getLbid()!=null){
					hysySsxx.setLbmc(getLbmc(hysySsxx.getLbid()));
					hysySsxx.setFlid(getFlidBylbId(hysySsxx.getLbid()));
				}
				if(hysySsxx.getLrdwId()!=null){
					hysySsxx.setLrdwMc(getDwmc(hysySsxx.getLrdwId()));
				}
				if(hysySsxx.getFlid()!=null){
					hysySsxx.setFlmc(getFlmcById(hysySsxx.getFlid()));
				}
			}
			
			page.setRoot(ls);
			page.setTotalProperty(commonDao.getTotalNum(count_hql));
			return page;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	private static String getWhereSqlByPage(Page page,String danwei_id,String cx) {
		String hql = "";
		ArrayList queryfields = (ArrayList) page.getQueryfields();
		String queryvalue = page.getQueryvalue();
		String hql_where = " where (";
		if (queryfields.size() > 0 && !"".equals(queryvalue)) {
			for (Object object : queryfields) {
				hql_where = hql_where + object.toString() + " like '%" + queryvalue + "%' or ";
			}
			hql_where = hql_where.substring(0, hql_where.length() - 4);
			hql = hql + hql_where + ")";
		}
		
		String hql_where_lrdwid = "";
		 if(cx.equals("0")){hql_where_lrdwid ="lrdw_id in (select id from XtgltDanwei where id="+danwei_id+")";
			// 如果没有where，添加
			if (hql.indexOf("where") > 0) {
				hql = hql + " and " + hql_where_lrdwid;
			} else {
				hql = hql + " where " + hql_where_lrdwid;
			}	}
		  else if(cx.equals("1")){
			 if (page.getQuerylrdwid()==0) {
				  hql_where_lrdwid ="lrdw_id in (select id from XtgltDanwei where id="+danwei_id+" or superior_id="+danwei_id+")";
					// 如果没有where，添加
					if (hql.indexOf("where") > 0) {
						hql = hql + " and " + hql_where_lrdwid;
					} else {
						hql = hql + " where " + hql_where_lrdwid;
					}	
				//hql_where_lrdwid ="dwmc in (select name from Department where parentId='"+ page.getQueryparentid()+"')";
		    
	    	}else{
			    hql_where_lrdwid ="lrdw_id ="+page.getQuerylrdwid()+"";
			    // 如果没有where，添加
			    if (hql.indexOf("where") > 0) {
				hql = hql + " and " + hql_where_lrdwid;
			    } else {
				hql = hql + " where " + hql_where_lrdwid;
			    }
			
		   } 
	  
		  }
		  else if(cx.equals("2")){
				 if (page.getQuerylrdwid()==0) {
					  hql_where_lrdwid ="lrdw_id in (select id from XtgltDanwei where id="+danwei_id+" or superior_id="+danwei_id+")";
						// 如果没有where，添加
						if (hql.indexOf("where") > 0) {
							hql = hql + " and " + hql_where_lrdwid;
						} else {
							hql = hql + " where " + hql_where_lrdwid;
						}	
					//hql_where_lrdwid ="dwmc in (select name from Department where parentId='"+ page.getQueryparentid()+"')";
			    
		    	}else{
				    hql_where_lrdwid ="lrdw_id in (select id from XtgltDanwei where id="+page.getQuerylrdwid()+" or superior_id="+page.getQuerylrdwid()+")";
				    // 如果没有where，添加
				    if (hql.indexOf("where") > 0) {
					hql = hql + " and " + hql_where_lrdwid;
				    } else {
					hql = hql + " where " + hql_where_lrdwid;
				    }
				
			   } 
		  
			  }
		// 添加时间条件
		String hql_where_sj = "";
		if (!page.getQueryyear().equals("0")) {
			if (page.getQuerymonth().equals("0")) {
				hql_where_sj = "year(lrrq)=" + page.getQueryyear();
			} else {
				hql_where_sj = "year(lrrq)=" + page.getQueryyear() + " and month(lrrq)=" + page.getQuerymonth();
			}
			// 如果没有where，添加
			if (hql.indexOf("where") > 0) {
				hql = hql + " and " + hql_where_sj;
			} else {
				hql = hql + " where " + hql_where_sj;
			}
		}

	
		//添加设施分类条件 
		String hql_where_fl = "";
		if (!page.getQueryssfl().equals("0")&&page.getQuerysslb().equals("0")) {
				if (!page.getQueryssfl().equals("0")) {
					hql_where_fl = "lbid in (select id from HysyLb where parentid='"+page.getQueryssfl()+"')";
				} 
					if (hql.indexOf("where") > 0) {
					hql = hql + " and " + hql_where_fl;
				} else {
					hql = hql + " where " + hql_where_fl;
				}	
	
			}
	
		//添加设施类别条件
		String hql_where_lb = "";
		if (!page.getQuerysslb().equals("0")) {
			
			if (!page.getQuerysslb().equals("0")) {	
				hql_where_lb = "lbid= " + page.getQuerysslb();
			} 
			
			if (hql.indexOf("where") > 0) {
				hql = hql + " and " + hql_where_lb;
			} else {
				hql = hql + " where " + hql_where_lb;
			}	
			
		}

		
		//添加设施状态条件
		String hql_where_zt = "";
		if (!page.getQueryyxzt().equals("全部")) {
			
			if (!page.getQueryyxzt().equals("全部")) {	
				hql_where_zt = "yxzt=" +"'"+ page.getQueryyxzt()+"'";
			} 
			
			if (hql.indexOf("where") > 0) {
				hql = hql + " and " + hql_where_zt;
			} else {
				hql = hql + " where " + hql_where_zt;
			}	
			
		}
		
		
		//添加设施flag
		String hql_where_flag = "ssflag in" + JsonStrUtil.getListStr(page.getListflag());
		// 如果没有where，添加
		if (hql.indexOf("where") > 0) {
		    hql = hql + " and " + hql_where_flag;
		} else {
		    hql = hql + " where " + hql_where_flag;
		}
		return hql;
    }
	
		

	public void saveJybm(List<String> list_jybm){
		try {
			if (list_jybm!=null&&list_jybm.size()>0) {
				for (String strjybm : list_jybm) {
					String jybm_sql = "select jybm from hysy_ssjybm where jybm ='"+strjybm+"'";
					List<Object> list_dbjybm = commonDao.findAll(jybm_sql);
					if(list_dbjybm.size()==0){
						String strSql="insert into hysy_ssjybm (jybm) values('"+strjybm+"')";
						commonDao.executeSql(strSql);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private List<String> getJybm(String jyqk){
		List<String> list_jybm = new ArrayList<String>();
		if(jyqk!=null&&!jyqk.equals("")){
			List<HysySsJyqk> ary_jyqk = JsonUtil.getDTOList(jyqk, HysySsJyqk.class);
			for (HysySsJyqk hysySsJyqk : ary_jyqk) {
				list_jybm.add(hysySsJyqk.getBm());
			}
		}
		return list_jybm;
	}
	
	public boolean saveHysySsxx(HysySsxx hysyssxx) {
		try {
			if (hysyssxx.getId() != null) {
				HysySsxx dbhysyssxx = commonDao.getObjectById(HysySsxx.class, hysyssxx.getId());
				//BeanUtils.copyProperties(dbhysyssxx, hysyssxx);
				dozermapper.map(hysyssxx, dbhysyssxx);
				commonDao.updateObject(dbhysyssxx);
				saveJybm(getJybm(hysyssxx.getJyqk()));
			} else {
				commonDao.insertObject(hysyssxx);
				saveJybm(getJybm(hysyssxx.getJyqk()));
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean deleteHysySsxx(List idList) {
		try {
			commonDao.deleteAll(HysySsxx.class, "id in (:idList)", new String[] {"idList"}, new Object[] {idList});
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public HysySsxx getHysySsxxById(Integer id) {
		try {
			List<HysySsxx> szhzsz_list = commonDao.findAll(HysySsxx.class, "id=?", new Object[]{id});
			return szhzsz_list.get(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List getYear() {
		try {
			String hql = "select distinct year(lrrq) FROM HysySsxx order by year(lrrq) desc";
			return commonDao.getHqlList(hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getQueryYearJson() {
		List<Integer> list_year = getYear();
		return JsonStrUtil.getJsonYearsByList(list_year);
	}
	
	public ICommonDao getCommonDao() {
		return commonDao;
	}

	public void setCommonDao(ICommonDao commonDao) {
		this.commonDao = commonDao;
	}

	public Mapper getDozermapper() {
		return dozermapper;
	}

	public void setDozermapper(Mapper dozermapper) {
		this.dozermapper = dozermapper;
	}

	public Integer getFlidBylbId(Integer lbid) {
		try {
			String flid_sql = "select parentid from hysy_lb where id='"+lbid+"'";
			List<Object> list_flid = commonDao.findAll(flid_sql);
			if(list_flid.size()>0){
				return (Integer)list_flid.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getFlmcById(Integer flid) {
		return getLbmc(flid);
	}

	public Integer getLbid(String lbmc) {
		return getSsid(lbmc);
	}
	
//	@SuppressWarnings("null")	
	public String getSsflcx() {
		try {
			List<HysyLb> list_lb = commonDao.findAll(HysyLb.class, "type=2", new Object[] {});
			HysyLb hysylb=new HysyLb("全部",0,0);
			list_lb.add(0,hysylb);
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getSslbcx(Integer flid) {
		try {
			List<HysyLb> list_lb = commonDao.findAll(HysyLb.class, "parentid=?", new Object[] {flid});
			HysyLb hysylb=new HysyLb("全部",0,0);
			list_lb.add(0,hysylb);
			JsonConfig jsonConfig = new JsonConfig();
			String[] excludes = {"parentid", "type"};
			jsonConfig.setExcludes(excludes);
			return JsonUtil.getJSONString(list_lb, jsonConfig);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getDanwei(String danwei) {
		try {
			String jsonStr="[{id:0,name:\"全部\"},";
			String jybm_sql="";
			if (Integer.parseInt(danwei)=='1'){
				jybm_sql = "select id,name from xtglt_danwei where lvl='2' order by name";
			}else{
				jybm_sql = "select id,name from xtglt_danwei where id='"+danwei+"' order by name";
			}
			List<Object> list_jybm = commonDao.findAll(jybm_sql);
			for (Object object : list_jybm) {
				Object[] ary_obj = (Object[])object;
				Integer dwid = (Integer)ary_obj[0];
				String dwmc = (String)ary_obj[1];
				jsonStr=jsonStr+"{id:"+dwid+",name:\""+dwmc+"\"},";
			}
			jsonStr=jsonStr.substring(0,jsonStr.length()-1);
			jsonStr=jsonStr+"]";
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getDanweiHasData(String danwei) {
		try {
         	String jybm_sql="";
			String jsonStr="[";
			jybm_sql = "select id,name from xtglt_danwei where id in (SELECT id  FROM xtglt_danwei WHERE id ='"+danwei+"' or superior_id = '"+danwei+"')order by name";
			List<Object> list_jybm = commonDao.findAll(jybm_sql);
		    jsonStr="[{id:0,name:\"全部\"},";
			for (Object object : list_jybm) {
				Object[] ary_obj = (Object[])object;
				Integer dwid = (Integer)ary_obj[0];
				String dwmc = (String)ary_obj[1];
				jsonStr=jsonStr+"{id:"+dwid+",name:\""+dwmc+"\"},";
			}
			jsonStr=jsonStr.substring(0,jsonStr.length()-1);
			jsonStr=jsonStr+"]";
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List getXcjyYear() {
		try {
			String hql = "select distinct year(xcrq) FROM HysySsxx where xcrq is not null order by year(xcrq) desc";
			return commonDao.getHqlList(hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getQueryXcjyYearJson() {
		List<Integer> list_year = getXcjyYear();
		return JsonStrUtil.getJsonYearsByList(list_year);
	}

	public boolean shsscl(HysySsxx hysyssxx) {
		try {
			HysySsxx dbhysyssxx = commonDao.getObjectById(HysySsxx.class, hysyssxx.getId());
			dbhysyssxx.setLrdwId(dbhysyssxx.getLrdwId());
			dbhysyssxx.setSsshsj(hysyssxx.getSsshsj());
			dbhysyssxx.setSsshry(hysyssxx.getSsshry());
			
			String tmp_shyj = hysyssxx.getSsshyj();
			if (tmp_shyj.indexOf("\r\n") > 0) {
				tmp_shyj=tmp_shyj.replaceAll("\\r\\n", "\\\r\\\n");
			}else {
				if (tmp_shyj.indexOf("\n") > 0) {
					tmp_shyj=tmp_shyj.replaceAll("\\n", "\\\r\\\n");
				}
			}
			dbhysyssxx.setSsshyj(tmp_shyj);
			dbhysyssxx.setSsflag(hysyssxx.getSsflag());
			commonDao.updateObject(dbhysyssxx);
		    return true;
		} catch (Exception e) {
		    e.printStackTrace();	    
		    return false;
		}
	}
	
	public boolean saveHysySsxx(List ssList) {
		try {
			commonDao.updateObject(ssList);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return false;
		}
	}

}
