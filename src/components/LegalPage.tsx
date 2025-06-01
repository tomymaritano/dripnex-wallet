'use client';

import PageLayout from '@/components/PageLayout';

type LegalItem = {
  heading: string;
  content: string;
};

type Props = {
  title: string;
  updatedAt: string;
  sections: LegalItem[];
};

export default function LegalPage({ title, updatedAt, sections }: Props) {
  return (
    <PageLayout>
      <section className="max-w-3xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        {sections.map((item, i) => (
          <div key={i} className="mb-6">
            {item.heading && (
              <h2 className="text-2xl font-semibold mt-8 mb-2">{item.heading}</h2>
            )}
            <p className="text-gray-400 whitespace-pre-line">{item.content}</p>
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-10">Last updated: {updatedAt}</p>
      </section>
    </PageLayout>
  );
}