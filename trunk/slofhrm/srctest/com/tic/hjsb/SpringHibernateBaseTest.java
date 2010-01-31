package com.tic.hjsb;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringHibernateBaseTest {
	public BeanFactory factory = new ClassPathXmlApplicationContext("applicationContext-*.xml");
	public ICommonDao commonDao = (ICommonDao)factory.getBean("commonDao");
	public IHysySbwhService hysysbwhService = (IHysySbwhService)factory.getBean("hysysbwhService");
}
