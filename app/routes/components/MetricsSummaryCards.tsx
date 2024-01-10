import type { FC } from "react";
import React from "react";
import type { ProductStatistics, VersionStatistics } from "../types/types";

interface ProductMetricDisplayProps {
  statistic: number | undefined;
  description: string;
  dollarSymbol?: boolean;
  percentSymbol?: boolean;
  black?: boolean;
}

const MetricDisplay: FC<ProductMetricDisplayProps> = ({
  statistic,
  description,
  dollarSymbol,
  percentSymbol,
  black,
}) => {
  let statDiv = <p className="text-lg font-semibold text-center text-gray-500">-</p>;
  let colorClass = black ? "text-black" : "text-gray-500";

  if (statistic !== undefined) {
    if (!black) {
      colorClass = statistic >= 0 ? "text-green-500" : "text-red-500";
    }
    statDiv = (
      <p className={`text-lg font-semibold text-center ${colorClass}`}>
        {dollarSymbol && "$"}
        {statistic.toLocaleString()}
        {percentSymbol && "%"}
      </p>
    );
  }
  return (
    <div>
      {statDiv}
      <p className={`text-sm text-center`}>{description}</p>
    </div>
  );
};

export const ProductMetricsSummaryCard: FC<{ statistics: ProductStatistics }> = ({ statistics }) => {
  return (
    <div className="flex space-x-6 p-4 bg-white shadow rounded-lg mb-4">
      <p className="text-black font-medium text-center inline-flex items-center">Product Metrics:</p>

      <MetricDisplay statistic={statistics.views} description="Views" black />
      <MetricDisplay statistic={statistics.personalizedPercentage} description="Personalized %" percentSymbol black />
      <MetricDisplay statistic={statistics.conversionRateLift} description="CVR Lift" percentSymbol />
      <MetricDisplay statistic={statistics.addToCartRateLift} description="ATC Lift" percentSymbol />
      <MetricDisplay statistic={statistics.marginalRevenue} description="Rev Added" dollarSymbol />
    </div>
  );
};

export const VersionMetricsSummaryCard: FC<{ statistics: VersionStatistics }> = ({ statistics }) => {
  return (
    <div className=" bg-white shadow rounded-lg mb-4">
      <div className="flex flex-col">
        {/* <span className="flex-initial ml-1 px-2 bg-gray-400 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mt-2 z-10">
          Version Metrics
        </span> */}
        <div className="flex justify-center">
          <span className="flex-initial px-3 py-1 bg-gray-400 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mt-3 z-10">
            Version Metrics
          </span>
        </div>
        {/* <p className="text-black font-medium text-center inline-flex items-center">Version Metrics:</p> */}

        <div className="flex space-x-6 p-4">
          <MetricDisplay statistic={statistics.views} description="Views" black />
          <MetricDisplay statistic={statistics.displayPercentage} description="Display %" percentSymbol black />
          <MetricDisplay statistic={statistics.conversionRateLift} description="CVR Lift" percentSymbol />
          <MetricDisplay statistic={statistics.addToCartRateLift} description="ATC Lift" percentSymbol />
          <MetricDisplay statistic={statistics.marginalRevenue} description="Rev Added" dollarSymbol />
        </div>
      </div>
    </div>
  );
};

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
//       <div className="p-4 bg-white shadow rounded-lg mb-4 w-full">
//         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//           <DefaultVersionImageAndTag heroImage={version.heroImage} productTitle={version.productTitle} />
//           {productViewMode === ProductViewMode.VersionDetails ? renderVersionDetails() : renderVersionMetrics()}
//         </div>
//       </div>
//     </div>
//   );
// };
