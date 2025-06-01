import LegalPage from '@/components/LegalPage';
import cookiesData from '../../../../public/legal/cookies-policy.json';
import '../../globals.css';

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      title={cookiesData.title}
      updatedAt={cookiesData.updatedAt}
      sections={cookiesData.sections}
    />
  );
}