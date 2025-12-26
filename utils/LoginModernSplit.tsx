import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '~/form/Form';
import { Button, FormState, TextField, CheckboxField } from '~/form/fields';
import { useMediaQuery } from '~/hooks/useMediaQuery';

type LoginModernSplitProps = {
  onSubmit: (_data: FormState) => void;
  methods?: UseFormReturn<FormState>;
  gradientFrom?: string;
  gradientTo?: string;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  isLoading?: boolean;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onXLogin?: () => void;
  showSocialLogin?: boolean;
};

/**
 * Login Moderno con Diseño Split-Screen
 * 
 * Características:
 * - Diseño split-screen con gradiente animado a la izquierda
 * - Formulario moderno con iconos inline
 * - Opciones de inicio de sesión con redes sociales
 * - Checkbox de "Recordarme"
 * - Links de "Olvidé mi contraseña" y "Registrarse"
 * - Completamente responsive
 * 
 * @param onSubmit Función que se ejecuta al enviar el formulario
 * @param methods Métodos de react-hook-form
 * @param gradientFrom Color inicial del gradiente (hex o clase tailwind)
 * @param gradientTo Color final del gradiente (hex o clase tailwind)
 * @param title Título del formulario
 * @param subtitle Subtítulo del formulario
 * @param logoUrl URL del logo (opcional)
 * @param isLoading Estado de carga del botón
 * @param onForgotPassword Callback para "Olvidé mi contraseña"
 * @param onRegister Callback para "Registrarse"
 * @param onGoogleLogin Callback para inicio de sesión con Google
 * @param onFacebookLogin Callback para inicio de sesión con Facebook
 * @param onXLogin Callback para inicio de sesión con X/Twitter
 * @param showSocialLogin Mostrar botones de redes sociales (default: true)
 */
export const LoginModernSplit = ({
  onSubmit,
  methods,
  gradientFrom = '#667eea',
  gradientTo = '#764ba2',
  title = 'Bienvenido de nuevo',
  subtitle = 'Ingresa tus credenciales para continuar',
  logoUrl,
  isLoading = false,
  onForgotPassword,
  onRegister,
  onGoogleLogin,
  onFacebookLogin,
  onXLogin,
  showSocialLogin = true,
}: LoginModernSplitProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex h-screen w-full">
      {/* Panel izquierdo con gradiente (solo desktop) */}
      {!isMobile && (
        <div
          className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          }}
        >
          {/* Círculos decorativos animados */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-150" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-bounce" />

          {/* Contenido del panel */}
          <div className="relative z-10 text-center text-white">
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="w-24 h-24 mx-auto mb-6 rounded-xl shadow-lg" />
            )}
            <h1 className="text-4xl font-bold mb-4">Tu plataforma de confianza</h1>
            <p className="text-xl opacity-90 max-w-md">
              Gestiona tus proyectos de manera eficiente y colabora con tu equipo en tiempo real.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                <span>Acceso seguro y encriptado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                <span>Sincronización en tiempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panel derecho con formulario */}
      <div className={`flex flex-col justify-center items-center bg-[var(--bg)] p-8 ${isMobile ? 'w-full' : 'w-1/2'}`}>
        <div className="w-full max-w-md">
          {/* Header móvil */}
          {isMobile && logoUrl && (
            <div className="text-center mb-8">
              <img src={logoUrl} alt="Logo" className="w-16 h-16 mx-auto mb-4 rounded-xl shadow-lg" />
            </div>
          )}

          {/* Título y subtítulo */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--font)]">{title}</h2>
            <p className="text-[var(--placeholder)] mt-2">{subtitle}</p>
          </div>

          {/* Botones de redes sociales */}
          {showSocialLogin && (
            <>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="flex items-center justify-center gap-2 p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--secondaryalthover)] transition-colors"
                >
                  <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                  {!isMobile && <span className="text-sm text-[var(--font)]">Google</span>}
                </button>
                <button
                  type="button"
                  onClick={onFacebookLogin}
                  className="flex items-center justify-center gap-2 p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--secondaryalthover)] transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                  {!isMobile && <span className="text-sm text-[var(--font)]">Facebook</span>}
                </button>
                <button
                  type="button"
                  onClick={onXLogin}
                  className="flex items-center justify-center gap-2 p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--secondaryalthover)] transition-colors"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="text-[var(--font)]" />
                  {!isMobile && <span className="text-sm text-[var(--font)]">X</span>}
                </button>
              </div>

              {/* Separador */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-sm text-[var(--placeholder)]">o continúa con email</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>
            </>
          )}

          {/* Formulario */}
          <Form<FormState> onSubmit={onSubmit} methods={methods} className="space-y-5 md:shadow-none">
            {/* Campo de email */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--placeholder)] z-10"
              />
              <TextField
                name="email"
                isRequired
                validateEmail
                placeholder="correo@ejemplo.com"
                inputClassName="pl-12 p-4 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--focus)] bg-[var(--bg)] transition-all"
              />
            </div>

            {/* Campo de contraseña */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--placeholder)] z-10"
              />
              <TextField
                name="password"
                isRequired
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                inputClassName="pl-12 pr-12 p-4 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--focus)] bg-[var(--bg)] transition-all"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--placeholder)] hover:text-[var(--font)] transition-colors z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between">
              <CheckboxField
                name="rememberMe"
                label="Recordarme"
                labelClassName="text-sm text-[var(--font)]"
                checkClassName="rounded"
              />
              {onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm font-medium hover:underline"
                  style={{ color: gradientFrom }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>

            {/* Botón de login */}
            <Button
              variant="primary"
              type="submit"
              className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              isLoading={isLoading}
              style={{
                background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
              }}
            >
              Iniciar Sesión
            </Button>
          </Form>

          {/* Link de registro */}
          {onRegister && (
            <p className="text-center mt-6 text-[var(--placeholder)]">
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={onRegister}
                className="font-semibold hover:underline"
                style={{ color: gradientFrom }}
              >
                Regístrate aquí
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModernSplit;
