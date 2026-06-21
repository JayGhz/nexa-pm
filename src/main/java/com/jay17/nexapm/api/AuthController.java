package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.LoginRequest;
import com.jay17.nexapm.dto.request.RefreshTokenRequest;
import com.jay17.nexapm.dto.request.RegisterRequest;
import com.jay17.nexapm.dto.response.AuthResponse;
import com.jay17.nexapm.dto.response.UsuarioResponse;
import com.jay17.nexapm.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoints de autenticación — públicos, sin JWT requerido.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Registro, login y gestión de tokens JWT")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar nuevo usuario",
               description = "Crea un usuario y devuelve accessToken + refreshToken")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión",
               description = "Autentica con correo y password, devuelve JWT tokens")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar access token usando refresh token")
    public AuthResponse refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return authService.refresh(request);
    }

    @GetMapping("/me")
    @Operation(summary = "Perfil del usuario autenticado")
    public UsuarioResponse me(@AuthenticationPrincipal UserDetails userDetails) {
        return authService.getMe(userDetails.getUsername());
    }
}
