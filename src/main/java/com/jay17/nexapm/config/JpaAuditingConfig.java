package com.jay17.nexapm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Habilita el soporte de JPA Auditing para @CreatedDate y @LastModifiedDate en BaseEntity.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}
