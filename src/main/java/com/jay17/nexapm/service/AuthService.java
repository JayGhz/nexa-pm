package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.LoginRequest;
import com.jay17.nexapm.dto.request.RefreshTokenRequest;
import com.jay17.nexapm.dto.request.RegisterRequest;
import com.jay17.nexapm.dto.response.AuthResponse;
import com.jay17.nexapm.dto.response.UsuarioResponse;
import com.jay17.nexapm.exception.BusinessException;
import com.jay17.nexapm.mapper.UsuarioMapper;
import com.jay17.nexapm.model.Usuario;
import com.jay17.nexapm.repository.UsuarioRepository;
import com.jay17.nexapm.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de autenticación — registro, login y refresh de tokens JWT.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UsuarioMapper usuarioMapper;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByCorreo(request.correo())) {
            throw new BusinessException("Ya existe un usuario con el correo: " + request.correo());
        }

        Usuario usuario = Usuario.builder()
                .nombre(request.nombre())
                .correo(request.correo())
                .password(passwordEncoder.encode(request.password()))
                .rol(request.rol())
                .activo(true)
                .build();

        usuarioRepository.save(usuario);
        log.info("Nuevo usuario registrado: {} [{}]", usuario.getCorreo(), usuario.getRol());

        String accessToken = jwtTokenProvider.generateAccessToken(usuario);
        String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);
        return AuthResponse.of(accessToken, refreshToken, jwtExpiration, usuario);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.correo(), request.password()));

        Usuario usuario = (Usuario) userDetailsService.loadUserByUsername(request.correo());
        String accessToken = jwtTokenProvider.generateAccessToken(usuario);
        String refreshToken = jwtTokenProvider.generateRefreshToken(usuario);
        log.info("Login exitoso: {}", usuario.getCorreo());
        return AuthResponse.of(accessToken, refreshToken, jwtExpiration, usuario);
    }

    @Transactional(readOnly = true)
    public AuthResponse refresh(RefreshTokenRequest request) {
        String token = request.refreshToken();

        if (!jwtTokenProvider.isRefreshToken(token)) {
            throw new BusinessException("El token proporcionado no es un refresh token válido");
        }

        String correo = jwtTokenProvider.extractUsername(token);
        Usuario usuario = (Usuario) userDetailsService.loadUserByUsername(correo);

        String newAccessToken = jwtTokenProvider.generateAccessToken(usuario);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(usuario);
        return AuthResponse.of(newAccessToken, newRefreshToken, jwtExpiration, usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse getMe(String correo) {
        Usuario usuario = (Usuario) userDetailsService.loadUserByUsername(correo);
        return usuarioMapper.toResponse(usuario);
    }
}
