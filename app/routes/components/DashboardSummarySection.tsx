// Create a new file for the component, e.g., `SummarySection.tsx`

import React from 'react';
import { HomepageMetricSection } from './MetricsSummaryCards';

type SummarySectionProps = {
  sections: Array<{ title: string; [key: string]: any }>;
  title?: string;
};

const SummarySection: React.FC<SummarySectionProps> = ({ sections, title }) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      {title && <h2 className="text-lg mb-4">{title}</h2>}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`p-4 cursor-pointer ${
              index < sections.length - 1 ? "sm:border-r border-gray-200 border-b sm:border-b-0" : ""
            }`}
            onClick={() => navigate("/dashboard/metrics")}
          >
            <HomepageMetricSection {...section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;