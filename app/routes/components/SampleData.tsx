import { ProductStatus, VersionStatus } from "../types/enums";
import type { Product } from "../types/types";

export const SampleData: Product[] = [
  {
    id: 1,
    externalId: "ext-1",
    storeId: 101,
    status: ProductStatus.Active,
    title: "Product 1",
    statistics: {
      views: 100,
      conversionRateLift: 2.5,
      marginalRevenue: 100,
      personalizedPercentage: 75,
      addToCartRateLift: 50,
    },
    defaultVersionId: 130,
    versions: [
      {
        id: 101,
        productId: 1,
        versionTitle: "Version A",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage:
          "https://cdn.thewirecutter.com/wp-content/media/2022/12/imacbuyingdesktop-2048px-0074-3x2-1.jpg?auto=webp&quality=75&width=1024",
        description: "Description for Product 1 Version A",
        attributes: ["attr1attr1attr1attr1", "attr2", "attr2", "attr2"],
        statistics: {
          views: 50,
          conversionRate: 1.5,
          marginalRevenue: 50,
          displayPercentage: 60,
          addToCartRate: 30,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
      {
        id: 102,
        productId: 1,
        versionTitle: "Version B",
        status: VersionStatus.Pending,
        productTitle: "Product 1",
        heroImage:
          "https://media.wired.com/photos/5fb2cc575c9914713ead03de/master/pass/Gear-Apple-MacBook-Air-top-down-SOURCE-Apple.jpg",
        description:
          "Description for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version BDescription for Product 1 Version B",
        attributes: ["attr3", "attr4"],
        statistics: {
          views: 60,
          conversionRate: 1.7,
          marginalRevenue: 60,
          displayPercentage: 70,
          addToCartRate: 35,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
      {
        id: 130,
        productId: 1,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "BLACK VELVET ADDED COVERAGE LULU (ZIG-ZAG STITCH) BIKINI BOTTOM",
        heroImage:
          "data:image/jpeg;base64,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",
        description:
          "Default Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product DescriptionDefault Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 0,
          addToCartRateLift: 0,
        },
      },
      {
        id: 184,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Regenerating,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "Description for Product 4 Version D",
        attributes: ["attr7", "attr8"],
        statistics: {
          views: 125,
          conversionRate: 1.8,
          marginalRevenue: 75,
          displayPercentage: 80,
          addToCartRate: 45,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  {
    id: 2,
    externalId: "ext-2",
    storeId: 102,
    status: ProductStatus.Active,
    title: "Product 2",
    statistics: {
      views: 200,
      conversionRateLift: 3.0,
      marginalRevenue: 120,
      personalizedPercentage: 80,
      addToCartRateLift: 60,
    },
    defaultVersionId: 131,
    versions: [
      {
        id: 103,
        productId: 2,
        versionTitle: "Version for product 2",
        status: VersionStatus.Running,
        productTitle: "Product 2",
        heroImage: "image-url-3",
        description: "Description for Product 2 Default Version",
        attributes: ["attr5", "attr6"],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 70,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
      {
        id: 131,
        productId: 2,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  // ... other active products with their versions
  {
    id: 3,
    externalId: "ext-3",
    storeId: 103,
    status: ProductStatus.Inactive,
    title: "Product 3",
    statistics: {
      views: 150,
      // conversionRateLift: 2.5,
      // marginalRevenue: 100,
      // personalizedPercentage: 75,
      // addToCartRateLift: 50,
    },
    defaultVersionId: 132,
    versions: [
      {
        id: 132,
        productId: 3,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  {
    id: 4,
    externalId: "ext-4",
    storeId: 104,
    status: ProductStatus.Active,
    title: "Product 4",
    statistics: {
      views: 250,
      conversionRateLift: 3.5,
      marginalRevenue: 140,
      personalizedPercentage: 85,
      addToCartRateLift: 65,
    },
    defaultVersionId: 134,
    versions: [
      {
        id: 104,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Regenerating,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "Description for Product 4 Version D",
        attributes: ["attr7", "attr8"],
        statistics: {
          views: 125,
          conversionRate: 1.8,
          marginalRevenue: 75,
          displayPercentage: 80,
          addToCartRate: 45,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
      {
        id: 134,
        productId: 4,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  {
    id: 5,
    externalId: "ext-5",
    storeId: 105,
    status: ProductStatus.Generating,
    title: "Product 5",
    defaultVersionId: 15,
    statistics: {
      views: 300,
      conversionRateLift: 4.0,
      marginalRevenue: 160,
      personalizedPercentage: 90,
      addToCartRateLift: 70,
    },
    versions: [
      {
        id: 135,
        productId: 5,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  {
    id: 6,
    externalId: "ext-6",
    storeId: 106,
    status: ProductStatus.Active,
    title: "Product 6",
    statistics: {
      views: 350,
      conversionRateLift: 4.5,
      marginalRevenue: 180,
      personalizedPercentage: 95,
      addToCartRateLift: 75,
    },
    defaultVersionId: 136,
    versions: [
      {
        id: 105,
        productId: 6,
        versionTitle: "Version E",
        status: VersionStatus.Rejected,
        productTitle: "Product 6",
        heroImage: "image-url-5",
        description: "Description for Product 6 Version E",
        attributes: ["attr9", "attr10"],
        statistics: {
          views: 175,
          conversionRate: 2.2,
          marginalRevenue: 90,
          displayPercentage: 85,
          addToCartRate: 50,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
      {
        id: 136,
        productId: 5,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
  {
    id: 7,
    externalId: "ext-7",
    storeId: 107,
    status: ProductStatus.Inactive,
    title: "Product 7",
    statistics: {
      views: 400,
    },
    defaultVersionId: 137,
    versions: [
      {
        id: 137,
        productId: 7,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "Default Product Description",
        attributes: [],
        statistics: {
          views: 100,
          conversionRate: 2.0,
          marginalRevenue: 0,
          displayPercentage: 75,
          addToCartRate: 40,
          conversionRateLift: 2.5,
          addToCartRateLift: 1.5,
        },
      },
    ],
  },
];

export default SampleData;
