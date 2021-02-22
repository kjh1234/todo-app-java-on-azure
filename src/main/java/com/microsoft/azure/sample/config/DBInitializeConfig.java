package com.microsoft.azure.sample.config;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

//@Configuration
//@Order(2)
public class DBInitializeConfig {

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	public void initialize() {
		try {
			Connection connection = dataSource.getConnection();
			Statement statement = connection.createStatement();
			statement.execute("DROP TABLE IF EXISTS todo_item");
			statement.executeUpdate("CREATE TABLE todo_item(" + "id varchar(30) Primary key, "
					+ "owner varchar(30) not null," + "description varchar(300))");
			statement.close();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
