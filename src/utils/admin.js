// Email de la persona que administra el catálogo.
// IMPORTANTE: tiene que ser el mismo (en minúsculas) que figura en las
// reglas de Firestore. No es un dato secreto: la seguridad real la dan las reglas.
export const ADMIN_EMAIL = "jcmolina@hotmail.com.ar";

export const esAdmin = (user) =>
  !!user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
