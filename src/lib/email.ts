import { env } from './env'

/**
 * Add an email address to the Brevo contacts list.
 *
 * @param email Address to subscribe.
 * @returns API response body.
 */
export async function subscribeToBrevo(email: string) {
  const apiKey = env.BREVO_API_KEY

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      updateEnabled: true, // permite actualizar si ya existe
    }),
  });

  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      throw new Error(`Brevo error with status ${res.status}`);
    }

    const message = error.message || 'Subscription failed';

    if (message.toLowerCase().includes('already')) {
      throw new Error('already_subscribed');
    }

    throw new Error(message);
  }

  // 👇 Nuevo bloque seguro para evitar .json() vacío
  try {
    return await res.json();
  } catch {
    return {}; // si no hay contenido, devolvemos objeto vacío
  }
}