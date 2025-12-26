import { faCircleUser, faFingerprint, faKey, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Form } from '~/form/Form';
import { Button, FormState, TextField } from '~/form/fields';
import { useMediaQuery } from '~/hooks/useMediaQuery';

type LoginMinimalistCardProps = {
  onSubmit: (_data: FormState) => void;
  methods?: UseFormReturn<FormState>;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  isLoading?: boolean;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  accentColor?: string;
  showBiometricLogin?: boolean;
  onBiometricLogin?: () => void;
  backgroundPattern?: 'dots' | 'grid' | 'none';
};

/**
 * Login Minimalista con Tarjeta Centrada
 * 
 * Características:
 * - Diseño minimalista con tarjeta flotante
 * - Labels flotantes animados
 * - Fondo con patrón decorativo sutil
 * - Opción de login biométrico
 * - Animaciones suaves con framer-motion
 * - Avatar/logo circular en la parte superior
 * - Diseño limpio y moderno
 * 
 * @param onSubmit Función que se ejecuta al enviar el formulario
 * @param methods Métodos de react-hook-form
 * @param title Título del formulario
 * @param subtitle Subtítulo del formulario
 * @param logoUrl URL del logo/avatar (opcional)
 * @param isLoading Estado de carga del botón
 * @param onForgotPassword Callback para "Olvidé mi contraseña"
 * @param onRegister Callback para "Registrarse"
 * @param accentColor Color de acento para el diseño
 * @param showBiometricLogin Mostrar opción de login biométrico
 * @param onBiometricLogin Callback para login biométrico
 * @param backgroundPattern Patrón de fondo ('dots', 'grid', 'none')
 */
export const LoginMinimalistCard = ({
  onSubmit,
  methods,
  title = 'Inicia Sesión',
  subtitle = 'Accede a tu cuenta',
  logoUrl,
  isLoading = false,
  onForgotPassword,
  onRegister,
  accentColor = '#3B82F6',
  showBiometricLogin = false,
  onBiometricLogin,
  backgroundPattern = 'dots',
}: LoginMinimalistCardProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Observar valores de los campos para determinar si el label debe estar flotante
  const usernameValue = methods ? useWatch({ control: methods.control, name: 'username' }) : '';
  const passwordValue = methods ? useWatch({ control: methods.control, name: 'password' }) : '';

  // Determinar si un campo tiene valor o está enfocado para flotar el label
  const isFieldActive = (fieldName: string) => {
    if (focusedField === fieldName) return true;
    if (fieldName === 'username' && usernameValue) return true;
    if (fieldName === 'password' && passwordValue) return true;
    return false;
  };

  // Estilos para el patrón de fondo
  const getBackgroundPattern = () => {
    switch (backgroundPattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${accentColor}15 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'grid':
        return {
          backgroundImage: `linear-gradient(${accentColor}10 1px, transparent 1px), linear-gradient(90deg, ${accentColor}10 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4"
      style={getBackgroundPattern()}
    >
      {/* Elementos decorativos de fondo */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="fixed bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: accentColor }}
      />

      {/* Tarjeta principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} bg-[var(--bg)] rounded-3xl shadow-2xl overflow-hidden`}
      >
        {/* Barra superior decorativa */}
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }}
        />

        <div className="p-8 pt-6">
          {/* Avatar/Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="w-20 h-20 rounded-full border-4 shadow-lg object-cover"
                style={{ borderColor: accentColor }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-4xl"
                  style={{ color: accentColor }}
                />
              </div>
            )}
          </motion.div>

          {/* Título y subtítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-[var(--font)]">{title}</h1>
            <p className="text-[var(--placeholder)] mt-1 text-sm">{subtitle}</p>
          </motion.div>

          {/* Formulario */}
          <Form<FormState> onSubmit={onSubmit} methods={methods} className="space-y-6 md:shadow-none">
            {/* Campo de usuario con label flotante */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
            >
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                  isFieldActive('username')
                    ? 'top-0 text-xs px-1 bg-[var(--bg)] -translate-y-1/2'
                    : 'top-1/2 -translate-y-1/2 text-sm'
                }`}
                style={{ color: isFieldActive('username') ? accentColor : 'var(--placeholder)' }}
              >
                Usuario o Email
              </label>
              <TextField
                name="username"
                isRequired
                placeholder=""
                inputClassName="p-4 border-2 rounded-xl focus:outline-none transition-all bg-[var(--bg)]"
              />
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${
                  focusedField === 'username' ? 'w-full' : 'w-0'
                }`}
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>

            {/* Campo de contraseña con label flotante */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            >
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                  isFieldActive('password')
                    ? 'top-0 text-xs px-1 bg-[var(--bg)] -translate-y-1/2'
                    : 'top-1/2 -translate-y-1/2 text-sm'
                }`}
                style={{ color: isFieldActive('password') ? accentColor : 'var(--placeholder)' }}
              >
                Contraseña
              </label>
              <TextField
                name="password"
                isRequired
                type="password"
                placeholder=""
                inputClassName="p-4 border-2 rounded-xl focus:outline-none transition-all bg-[var(--bg)]"
              />
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${
                  focusedField === 'password' ? 'w-full' : 'w-0'
                }`}
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>

            {/* Link de olvidé contraseña */}
            {onForgotPassword && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-right"
              >
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm hover:underline"
                  style={{ color: accentColor }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </motion.div>
            )}

            {/* Botón de login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                variant="primary"
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                isLoading={isLoading}
                style={{ backgroundColor: accentColor }}
              >
                <FontAwesomeIcon icon={faKey} />
                Acceder
              </Button>
            </motion.div>

            {/* Login biométrico */}
            {showBiometricLogin && onBiometricLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-xs text-[var(--placeholder)]">o usa</span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                </div>

                <button
                  type="button"
                  onClick={onBiometricLogin}
                  className="w-full py-4 rounded-xl border-2 border-[var(--border)] hover:border-current transition-all flex items-center justify-center gap-3 text-[var(--font)]"
                >
                  <FontAwesomeIcon icon={faFingerprint} className="text-xl" style={{ color: accentColor }} />
                  <span>Acceso biométrico</span>
                </button>
              </motion.div>
            )}
          </Form>

          {/* Link de registro */}
          {onRegister && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-8 text-[var(--placeholder)] text-sm"
            >
              ¿Aún no tienes cuenta?{' '}
              <button
                type="button"
                onClick={onRegister}
                className="font-semibold hover:underline"
                style={{ color: accentColor }}
              >
                Crear cuenta
              </button>
            </motion.p>
          )}

          {/* Footer de seguridad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-[var(--border)]"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-[var(--placeholder)]">
              <FontAwesomeIcon icon={faShieldHalved} style={{ color: accentColor }} />
              <span>Conexión segura y encriptada</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginMinimalistCard;
