// src/hooks/useBrevo.ts
'use server';

import SibApiV3Sdk from 'sib-api-v3-sdk';

export async function subscribeToNewsletter(email: string) {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY!;

  const contactsApi = new SibApiV3Sdk.ContactsApi();

  try {
    const response = await contactsApi.createContact({
      email,
      listIds: [2], // 👈 Cambiá este número por tu ID real de lista de Brevo
      updateEnabled: true,
    });

    return { success: true, message: 'You are now subscribed!' };
  } catch (error) {
    console.error('Brevo Error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}