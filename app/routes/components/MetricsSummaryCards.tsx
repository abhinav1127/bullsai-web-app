import type { FC } from "react";
import React from "react";
import type { ProductStatistics, VersionStatistics } from "../../types/types";
import { InformationCardBadge } from "./Badges";

interface MetricDisplayProps {
  statistic: number | undefined;
  description: string;
  dollarSymbol?: boolean;
  percentSymbol?: boolean;
  black?: boolean;
}

function getMetricDisplayColorClass(statistic: number | undefined, black?: boolean) {
  if (black) return "text-black";
  if (!statistic) return "text-gray-500";
  return statistic >= 0 ? "text-green-500" : "text-red-500";
}

const MetricDisplay: FC<MetricDisplayProps> = ({ statistic, description, dollarSymbol, percentSymbol, black }) => {
  const formattedStatistic =
    statistic !== undefined
      ? `${dollarSymbol ? "$" : ""}${statistic.toLocaleString()}${percentSymbol ? "%" : ""}`
      : "-";
  const colorClass = getMetricDisplayColorClass(statistic, black);

  return (
    <div>
      <p className={`text-lg font-semibold text-center ${colorClass}`}>{formattedStatistic}</p>
      <p className="text-xs text-center">{description}</p>
    </div>
  );
};

export const ProductMetricsSummaryCard: FC<{ statistics: ProductStatistics }> = ({ statistics }) => {
  return (
    <div className="flex self-center">
      <div className="flex flex-col my-2">
        <InformationCardBadge header="Product Metrics" />

        <div className="flex space-x-6 p-4 bg-white border rounded-lg">
          <MetricDisplay statistic={statistics.views} description="Views" black />
          <MetricDisplay
            statistic={statistics.personalizedPercentage}
            description="Personalized %"
            percentSymbol
            black
          />
          <MetricDisplay statistic={statistics.conversionRateLift} description="Conversion Lift" percentSymbol />
          <MetricDisplay statistic={statistics.addToCartRateLift} description="Add to Cart Lift" percentSymbol />
          <MetricDisplay statistic={statistics.marginalRevenue} description="Rev Added" dollarSymbol />
        </div>
      </div>
    </div>
  );
};

export const VersionMetricsSummaryCard: FC<{ statistics: VersionStatistics }> = ({ statistics }) => {
  return (
    <div className="flex self-center">
      <div className="flex flex-col my-2">
        <InformationCardBadge header="Version Metrics" />

        <div className="flex space-x-6 p-4 bg-white border rounded-lg">
          <MetricDisplay statistic={statistics.views} description="Views" black />
          <MetricDisplay statistic={statistics.displayPercentage} description="Display %" percentSymbol black />
          <MetricDisplay statistic={statistics.conversionRateLift} description="Conversion Lift" percentSymbol />
          <MetricDisplay statistic={statistics.addToCartRateLift} description="Add to Cart Lift" percentSymbol />
          <MetricDisplay statistic={statistics.marginalRevenue} description="Rev Added" dollarSymbol />
        </div>
      </div>
    </div>
  );
};

export interface HomepageMetricSectionProps {
  title: string;
  sectionIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content: React.ReactNode;
}

export const HomepageMetricSection: React.FC<HomepageMetricSectionProps> = ({
  title,
  sectionIcon: SectionIcon,
  content,
}) => (
  <>
    <div className="flex flex-col mb-4 items-center">
      {SectionIcon && (
        <SectionIcon className="w-6 h-6 mb-1 text-primary" aria-hidden="true" aria-label={`${title} icon`} />
      )}
      {title && <h3 className="text-lg font-medium text-center">{title}</h3>}
    </div>
    {content && <div className="flex flex-col justify-center items-center relative">{content}</div>}
  </>
);

// const DefaultVersionImageAndTag: FC<{ heroImage: string; productTitle: string }> = ({ heroImage, productTitle }) => (
//   <div className="flex flex-col items-center">
//     <img src={heroImage} alt={productTitle} className="w-32 h-32 object-cover rounded-full" />
//     <span className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide">
//       Default Version
//     </span>
//   </div>
// );

// export const DefaultVersionDetailsCard: FC<{ version: Version; productViewMode: ProductViewMode }> = ({
//   version,
//   productViewMode,
// }) => {
//   const renderVersionDetails = () => (
//     <div className="flex-1">
//       <p className="text-xl font-semibold text-black">{version.productTitle}</p>
//       <div className="text-gray-600 mt-2 overflow-hidden text-ellipsis h-24 max-h-24">{version.description}</div>
//     </div>
//   );

//   const renderVersionMetrics = () => (
//     <div className="flex space-y-4 md:space-y-0 md:space-x-6 items-center h-full">
//       <div className="flex flex-col">
//         <div className="flex">
//           <ProductMetricDisplay statistic={version.statistics.views} description="Views" black />
//           <ProductMetricDisplay
//             statistic={version.statistics.conversionRate}
//             description="Conversion Rate"
//             percentSymbol
//             black
//           />
//         </div>
//         <div className="flex">
//           <ProductMetricDisplay
//             statistic={version.statistics.displayPercentage}
//             description="Display %"
//             percentSymbol
//             black
//           />
//           <ProductMetricDisplay
//             statistic={version.statistics.addToCartRate}
//             description="Add to Cart Rate"
//             percentSymbol
//             black
//           />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex justify-start max-h-">
//       <div className="p-4 bg-white border rounded-lg mb-4 w-full">
//         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//           <DefaultVersionImageAndTag heroImage={version.heroImage} productTitle={version.productTitle} />
//           {productViewMode === ProductViewMode.VersionDetails ? renderVersionDetails() : renderVersionMetrics()}
//         </div>
//       </div>
//     </div>
//   );
// };
