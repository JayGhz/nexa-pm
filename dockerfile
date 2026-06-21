FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /build

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

RUN ./mvnw dependency:go-offline -q

COPY src ./src
RUN ./mvnw package -DskipTests -q

FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S nexapm && adduser -S nexapm -G nexapm

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

RUN chown nexapm:nexapm app.jar

USER nexapm

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:8080/api/v1/actuator/health 2>/dev/null || \
        wget -qO- http://localhost:8080/api/v1/auth/login --post-data '{}' 2>/dev/null | grep -q . || exit 1

ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", "app.jar"]
