package com.jay17.nexapm.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de SpringDoc OpenAPI 3 (Swagger UI).
 * Disponible en: /api/v1/swagger-ui.html
 */
@Configuration
public class SwaggerConfig {

        private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

        @Bean
        public OpenAPI nexaPMOpenAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("NexaPM API")
                                                .description("""
                                                                # NexaPM — Sistema de Gestión de Proyectos de Consultoría TI

                                                                REST API para gestión de proyectos, clientes, consultores y seguimiento de avance.

                                                                ## Roles
                                                                - **ADMIN**: Acceso completo (proyectos, clientes, dashboard, asignaciones).
                                                                - **CONSULTOR**: Solo puede ver sus proyectos asignados, registrar avance y horas.

                                                                ## Autenticación
                                                                1. Usa `POST /auth/login` para obtener el **accessToken**.
                                                                2. Haz clic en **Authorize** e ingresa: `Bearer <accessToken>`.
                                                                """)
                                                .version("1.0.0")
                                                .contact(new Contact()
                                                                .name("NexaPM Team")
                                                                .email("soporte@nexapm.com"))
                                                .license(new License()
                                                                .name("MIT License")
                                                                .url("https://opensource.org/licenses/MIT")))
                                .servers(List.of(
                                                new Server().url("/api/v1").description("Servidor Local"),
                                                new Server().url("https://api.nexapm.com/v1")
                                                                .description("Producción")))
                                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                                .components(new Components()
                                                .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                                                new SecurityScheme()
                                                                                .name(SECURITY_SCHEME_NAME)
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")
                                                                                .description("Ingresa tu JWT token (sin el prefijo 'Bearer')")));
        }
}
