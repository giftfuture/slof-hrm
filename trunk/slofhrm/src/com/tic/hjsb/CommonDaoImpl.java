package com.tic.hjsb;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.tic.hjsb.ICommonDao;

public class CommonDaoImpl extends HibernateDaoSupport implements ICommonDao {

	public void insertObject(Object entity) throws Exception {
		// this.getHibernateTemplate().save(entity);
		this.getHibernateTemplate().save(entity);
	}

	public void updateObject(Object entity) throws Exception {
		// this.getHibernateTemplate().merge(entity);
		this.getHibernateTemplate().saveOrUpdate(entity);
	}
	
	public void updateObject(List list) throws Exception {
		for (Object obj : list) {
		    this.getHibernateTemplate().update(obj);
		}
	}
	public <E> List<E> findObjectByPage(String query_hql, int pageStart, int pageLimit) throws Exception {
		List<E> entiyList;
		final String f_query_hql = query_hql;
		final int f_pageStart = pageStart;
		final int f_pageLimit = pageLimit;
		entiyList = this.getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				return session.createQuery(f_query_hql).setFirstResult(f_pageStart).setMaxResults(f_pageLimit).list();
			}
		});
		return entiyList;
	}

	public int getTotalNum(String query_hql) throws Exception{
		Long totalNum = 0L;
		totalNum = (Long) this.getHibernateTemplate().find(query_hql).get(0);
		return totalNum.intValue();
	}

	public <E> E getObjectById(Class<E> clasz, Integer id) throws Exception {
		E entiy = (E) this.getHibernateTemplate().get(clasz, id);
		// 初始化延迟加载的数据
//		if (!Hibernate.isInitialized(entiy)) {
//			Hibernate.initialize(entiy);
//		}
		return entiy;
	}

//	public SzHzsylclx getSzHzsylclxById(Integer id) throws Exception {
//		SzHzsylclx szhzsylclx = (SzHzsylclx) this.getHibernateTemplate().get(SzHzsylclx.class, new Integer(id));
//		// 初始化延迟加载的数据
//		if (!Hibernate.isInitialized(szhzsylclx.getSzHzsylcszs())) {
//			Hibernate.initialize(szhzsylclx.getSzHzsylcszs());
//		}
//		return szhzsylclx;
//	}
	
//	public SzHzsznlclx getSzHzsznlclxById(Integer id) throws Exception {
//		SzHzsznlclx szhzsznlclx = (SzHzsznlclx) this.getHibernateTemplate().get(SzHzsznlclx.class, new Integer(id));
//		// 初始化延迟加载的数据
//		if (!Hibernate.isInitialized(szhzsznlclx.getSzHzsznlcszs())) {
//			Hibernate.initialize(szhzsznlclx.getSzHzsznlcszs());
//		}
//		return szhzsznlclx;
//	}
	public void deleteAll(Class<?> clasz, String conditions, Object[] args) throws Exception {
		List entities = findAll(clasz, conditions, args);
		this.getHibernateTemplate().deleteAll(entities);
	}

	public void deleteAll(Class<?> clasz, String conditions, String[] paramNames, Object[] args) throws Exception {
		List entities = findAll(clasz, conditions, paramNames, args);
		this.getHibernateTemplate().deleteAll(entities);
	}

	public <E> E find(Class<E> clasz, Object id) throws Exception {
		 return (E)this.getHibernateTemplate().get(clasz, (Integer)id);
	}
	
	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args) throws Exception {
		String hql = "from " + clasz.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		return (List<E>) this.getHibernateTemplate().find(hql, args);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, String[] paramNames, Object[] values) throws Exception {
		String hql = "from " + clasz.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		return (List<E>) this.getHibernateTemplate().findByNamedParam(hql, paramNames, values);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order) throws Exception {
		String hql = "from " + clasz.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		if (order != null && !order.equals("")) {
			hql = hql + " order by " + order;
		}
		return (List<E>) this.getHibernateTemplate().find(hql, args);
	}
	
	
	//执行普通sql
	public List findAll(String queryString) throws Exception {
		final String sqlString = queryString;
		return (List)getHibernateTemplate().execute(new HibernateCallback(){
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				return session.createSQLQuery(sqlString).list();
			}});
	}
	
	//执行普通insert delete sql
	public Integer executeSql(String strSql) throws Exception {
		final String sqlString = strSql;
		return (Integer)getHibernateTemplate().execute(new HibernateCallback(){
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				return session.createSQLQuery(sqlString).executeUpdate(); 
			}});
	}
	
	public List getHqlList(String hql) throws Exception {
		return this.getHibernateTemplate().find(hql);
	}


}
