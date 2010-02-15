package com.tic.hrm;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;


public class QoSystemDaoImpl extends HibernateDaoSupport implements IQoSystemDao {

	public <E> E find(Class<E> clasz, Object id) throws Exception {
		 return (E)this.getHibernateTemplate().get(clasz, (Integer)id);
	}
	
	public <E> E findFirst(Class<E> clasz) throws Exception {
		return findFirst(clasz, null, null, null, 0, 0);
	}

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args) throws Exception {
		return findFirst(clasz, conditions, args, null, 0, 0);
	}

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order) throws Exception {
		return findFirst(clasz, conditions, args, order, 0, 0);
	}

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order, int limit) throws Exception {
		return findFirst(clasz, conditions, args, order, limit, 0);
	}
	
	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order, int limit, int offset) throws Exception {
		List<E> results = findAll(clasz, conditions, args, order, limit, offset);
	    if (results.size() == 0) {
	      return null;
	    }
		if(!Hibernate.isInitialized(results.get(0))){
			Hibernate.initialize(results.get(0));
		}
	    return results.get(0);
	}

	public <E> List<E> findAll(Class<E> clasz) throws Exception {
		return findAll(clasz, null, null, null, 0, 0);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args) throws Exception {
		return findAll(clasz, conditions, args, null, 0, 0);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order) throws Exception {
		return findAll(clasz, conditions, args, order, 0, 0);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order, int limit) throws Exception {
		return findAll(clasz, conditions, args, order, limit, 0);
	}

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order, int limit, int offset) throws Exception {
		String hql = "from " + clasz.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		if (order != null && !order.equals("")) {
			hql = hql + " order by " + order;
		}
		// return (List<E>)this.getHibernateTemplate().find(hql,args);
		return (List<E>) this.getHibernateTemplate().find(hql, args);
	}
	
	public <E> List<E> findAll(Class<E> clasz, String conditions, String[] paramNames, Object[] values, String order) throws Exception {
		String hql = "from " + clasz.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		if (order != null && !order.equals("")) {
			hql = hql + " order by " + order;
		}
		return (List<E>) this.getHibernateTemplate().findByNamedParam(hql, paramNames, values);
	}

	//执行普通sql
	public List findAll(String queryString) throws Exception {
		final String sqlString = queryString;
		return (List)getHibernateTemplate().execute(new HibernateCallback(){
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				return session.createSQLQuery(sqlString).list();
			}});
	}
	
	public void bulkUpdate(String queryString) throws Exception {
		this.getHibernateTemplate().bulkUpdate(queryString);
	}
	
	public void bulkUpdate(String queryString, Object[] args) throws Exception {
		this.getHibernateTemplate().bulkUpdate(queryString, args);
	}
	
	public void deleteAll(Class<?> clasz, String conditions, Object[] args) throws Exception {
		List entities = findAll(clasz, conditions, args);
		this.getHibernateTemplate().deleteAll(entities);
	}

	public Integer saveInsert(Object entity) throws Exception {
		return (Integer)this.getHibernateTemplate().save(entity);
	}
	public void saveUpdate(Object entity) throws Exception {
		this.getHibernateTemplate().saveOrUpdate(entity);
	}

	public long count(Class<?> c, String conditions, Object[] args) throws Exception {
		Long totalNum= 0L;
	    String hql = "select count(*) from " + c.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		totalNum=(Long)this.getHibernateTemplate().find(hql, args).get(0);
		return totalNum;
	}

	public Integer maximum(Class<?> c, String field, String conditions, Object[] args) throws Exception {
		Integer maxNum;
	    String hql = "select max(" + field + ") from " + c.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		maxNum=(Integer)this.getHibernateTemplate().find(hql, args).get(0);
		return maxNum;
	}

	public Integer minimum(Class<?> c, String field, String conditions, Object[] args) throws Exception {
		Integer minNum;
	    String hql = "select min(" + field + ") from " + c.getName();
		if (conditions != null && !conditions.equals("")) {
			hql = hql + " where " + conditions;
		}
		minNum=(Integer)this.getHibernateTemplate().find(hql, args).get(0);
		return minNum;
	}

	public void delete(Object obj)throws Exception {
		this.getHibernateTemplate().delete(obj);
	}

//	public <E> E getEntity(Class<E> clasz, Integer id) throws Exception {
//		return (E)this.getHibernateTemplate().get(clasz, id);
//	}
}
