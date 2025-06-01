import LegalPage from '@/components/LegalPage';
import terms from '../../../../public/legal/terms-of-use.json';
import '../../globals.css';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title={terms.title}
      updatedAt={terms.updatedAt}
      sections={terms.sections}
    />
  );
}