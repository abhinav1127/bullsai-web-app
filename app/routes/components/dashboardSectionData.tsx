import { CurrencyDollarIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import RingChart from "./RingGraph";
import ConversionLiftBarGraph from "./ConversionLiftBarGraph";
import type { HomepageMetricSectionProps } from "./MetricsSummaryCards";

export const sections: HomepageMetricSectionProps[] = [
  {
    title: "Total Added Revenue",
    sectionIcon: CurrencyDollarIcon,
    content: <p className="text-2xl font-bold">$546</p>,
  },
  {
    title: "% Personalized Visitors",
    sectionIcon: UserGroupIcon,
    content: (
      <div className="relative">
        <RingChart maxValue={9000} value={3000} />
      </div>
    ),
  },
  {
    title: "Conversion Lift",
    sectionIcon: ChartBarIcon,
    content: (
      <>
        <p className="text-2xl font-bold mb-1">{parseFloat((((2.5 - 2.1) / 2.1) * 100).toFixed(2))}%</p>
        <ConversionLiftBarGraph nonPersonalizedConversionRate={2.1} personalizedConversionRate={2.5} />
      </>
    ),
  },
];

export default sections;
