'use client'

import PageLayout from '@/components/PageLayout';
import SendTransactionForm from './send-form';

/**
 * Page allowing users to send tokens across supported networks.
 */
export default function SendPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto py-10">
        <SendTransactionForm />
      </div>
    </PageLayout>
  );
}
