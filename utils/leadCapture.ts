import { LeadData } from '../types';

export async function submitLead(lead: LeadData): Promise<boolean> {
  const key = (process as any).env.WEB3FORMS_KEY;

  if (!key || key === 'YOUR_WEB3FORMS_KEY') {
    console.warn('Web3Forms key not configured. lead logged to console:', lead);
    return true;
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `New Avera Lead (${lead.source})`,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        recommended_blend: lead.recommendedBlend || 'N/A',
        quiz_answers: lead.quizAnswers ? JSON.stringify(lead.quizAnswers) : 'N/A',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to submit lead:', error);
    return false;
  }
}
