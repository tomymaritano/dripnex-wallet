import LegalPage from '@/components/LegalPage';
import privacy from '../../../../public/legal/privacy-policy.json';
import '../../globals.css';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title={privacy.title}
      updatedAt={privacy.updatedAt}
      sections={privacy.sections}
    />
  );
}