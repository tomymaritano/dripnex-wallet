// Este archivo se ejecuta en el servidor

import { NextResponse } from 'next/server';
import SibApiV3Sdk from 'sib-api-v3-sdk';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
  }

  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY!;

  const contactsApi = new SibApiV3Sdk.ContactsApi();

  try {
    await contactsApi.createContact({
      email,
      listIds: [2], // Reemplazá con tu verdadero ID de lista
      updateEnabled: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Brevo error:', error);
    return NextResponse.json({ success: false, message: 'Subscription failed.' }, { status: 500 });
  }
}