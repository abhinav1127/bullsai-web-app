import { ProductStatus, VersionStatus } from "./types/enums";
import type { Image, Product } from "./types/types";

export const SampleData: Product[] = [
  {
    id: 1,
    externalId: "ext-1",
    storeId: 101,
    status: ProductStatus.Inactive,
    title: "MOON FRUIT Retinol Alternative Serum",
    handle: "moon-fruit-1-bakuchiol-peptides-retinol-alternative-serum",
    statistics: {
      views: 17923,
      // conversionRateLift: 34.2,
      // marginalRevenue: 100,
      // personalizedPercentage: 75,
      // addToCartRateLift: 50,
    },
    defaultVersionId: 100,
    versions: [
      {
        id: 100,
        productId: 1,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "MOON FRUIT Retinol Alternative Serum",
        heroImage:
          "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V01.jpg?v=1703102622&width=1400",
        description:
          "<p>Revitalize your skin with Peptide and Bakuchiol, an advanced yet gentle retinol alternative. This blend boosts collagen, reducing wrinkles and lines while also hydrating the skin. Moon Fruit serum is non-comedogenic, so it won’t inflame pores and cause acne.</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
        statistics: {
          views: 17923,
          conversionRate: 1.4,
          marginalRevenue: 0,
          displayPercentage: 100,
          addToCartRate: 5.3,
          conversionRateLift: 0,
          addToCartRateLift: 0,
        },
      },
    ],
  },

  {
    id: 2,
    externalId: "ext-2",
    storeId: 101,
    status: ProductStatus.Active,
    title: "BAMBOO CHARCOAL Cleansing Bar Soap",
    handle: "BAMBOO CHARCOAL Cleansing Bar Soap".toLowerCase().replace(/ /g, "-"),
    statistics: {
      views: 20554,
      conversionRateLift: 32.4,
      marginalRevenue: 1864,
      personalizedPercentage: 86,
      addToCartRateLift: 30.1,
    },
    defaultVersionId: 200,
    versions: [
      {
        id: 201,
        productId: 2,
        versionTitle: "Version for product 2",
        status: VersionStatus.Running,
        productTitle: "Product 2",
        heroImage: "image-url-3",
        description: "<p>Description for Product 2 Default Version</p>",
        attributes: ["attr5", "attr6"],
        createdAt: new Date("2024-02-05"),
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
        id: 200,
        productId: 2,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 202,
        productId: 2,
        versionTitle: "Version Undef",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 203,
        productId: 2,
        versionTitle: "College Students",
        status: VersionStatus.Pending,
        productTitle: "BAMBOO CHARCOAL Cleansing Bar Soap",
        heroImage:
          "https://www.herbivorebotanicals.com/cdn/shop/files/BAMBOO-CHARCOAL-114250_V02.jpg?v=1703097917&width=1200",
        description:
          "<p>Gentle yet effective, Bamboo Charcoal Cleansing Bar Soap works especially well to clean and care for oily, combination and blemish-prone skin types. Each bar is unique and hand-crafted with love.</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 204,
        productId: 2,
        versionTitle: "Undef Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 205,
        productId: 2,
        versionTitle: "version undef",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
    id: 3,
    externalId: "ext-3",
    storeId: 103,
    status: ProductStatus.Inactive,
    title: "PINK CLOUD Rosewater + Tremella Creamy Jelly Cleanser",
    handle: "PINK CLOUD Rosewater + Tremella Creamy Jelly Cleanser".toLowerCase().replace(/ /g, "-"),
    statistics: {
      views: 18831,
      // conversionRateLift: 2.5,
      // marginalRevenue: 100,
      // personalizedPercentage: 75,
      // addToCartRateLift: 50,
    },
    defaultVersionId: 300,
    versions: [
      {
        id: 18831,
        productId: 3,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
        statistics: {
          views: 100,
          conversionRate: 1.2,
          marginalRevenue: 0,
          displayPercentage: 100,
          addToCartRate: 4.7,
          conversionRateLift: 0,
          addToCartRateLift: 0,
        },
      },
    ],
  },

  {
    id: 4,
    externalId: "ext-4",
    storeId: 104,
    status: ProductStatus.Active,
    title: "ROSE HIBISCUS Hydrating Face Mist",
    handle: "ROSE HIBISCUS Hydrating Face Mist".toLowerCase().replace(/ /g, "-"),
    statistics: {
      views: 24673,
      conversionRateLift: 26.8,
      marginalRevenue: 3438,
      personalizedPercentage: 74,
      addToCartRateLift: 28.0,
    },
    defaultVersionId: 400,
    versions: [
      {
        id: 401,
        productId: 4,
        versionTitle: "Product Line Previously Purchased",
        status: VersionStatus.Pending,
        productTitle: "ROSE HIBISCUS Hydrating Face Mist",
        heroImage:
          "https://www.herbivorebotanicals.com/cdn/shop/files/ROSE-HIBISCUS-109150_V03.jpg?v=1703113242&width=1200",
        description:
          "<p>A new addition to the Rose Hibiscus line! A new, super-fine spray that creates a gentle cloud of 100% natural hydrating and soothing Vegan Hyaluronic Acid, Organic Rose Hydrosol, Coconut Water, and Hibiscus Extract.</p>",
        attributes: ["attr7", "attr8"],
        createdAt: new Date("2024-02-05"),
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
        id: 400,
        productId: 4,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 402,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Running,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "<p>Description for Product 4 Version D</p>",
        attributes: ["attr7", "attr8"],
        createdAt: new Date("2024-02-05"),
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
        id: 403,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Running,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "<p>Description for Product 4 Version D</p>",
        attributes: ["attr7", "attr8"],
        createdAt: new Date("2024-02-05"),
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
        id: 404,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Running,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "<p>Description for Product 4 Version D</p>",
        attributes: ["attr7", "attr8"],
        createdAt: new Date("2024-02-05"),
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
        id: 405,
        productId: 4,
        versionTitle: "Version D",
        status: VersionStatus.Running,
        productTitle: "Product 4",
        heroImage: "image-url-4",
        description: "<p>Description for Product 4 Version D</p>",
        attributes: ["attr7", "attr8"],
        createdAt: new Date("2024-02-05"),
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
    id: 5,
    externalId: "ext-5",
    storeId: 105,
    status: ProductStatus.Active,
    title: "WRINKLE-FIGHTING DUO Moon Fruit Serum + Phoenix Face Oil",
    handle: "WRINKLE-FIGHTING DUO Moon Fruit Serum + Phoenix Face Oil".toLowerCase().replace(/ /g, "-"),
    defaultVersionId: 500,
    statistics: {
      views: 9264,
      conversionRateLift: 21.5,
      marginalRevenue: 2849,
      personalizedPercentage: 57,
      addToCartRateLift: 70,
    },
    versions: [
      {
        id: 500,
        productId: 5,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 501,
        productId: 5,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 502,
        productId: 5,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
    title: "MOMMY GLOW - Pregnancy-Safe Skincare Bundle",
    handle: "MOMMY GLOW - Pregnancy-Safe Skincare Bundle".toLowerCase().replace(/ /g, "-"),
    statistics: {
      views: 5927,
      conversionRateLift: 16.8,
      marginalRevenue: 3859,
      personalizedPercentage: 44,
      addToCartRateLift: 16.5,
    },
    defaultVersionId: 600,
    versions: [
      {
        id: 601,
        productId: 6,
        versionTitle: "Version E",
        status: VersionStatus.Rejected,
        productTitle: "Product 6",
        heroImage: "image-url-5",
        description: "<p>Description for Product 6 Version E</p>",
        attributes: ["attr9", "attr10"],
        createdAt: new Date("2024-02-05"),
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
        id: 600,
        productId: 5,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 602,
        productId: 6,
        versionTitle: "Version E",
        status: VersionStatus.Running,
        productTitle: "Product 6",
        heroImage: "image-url-5",
        description: "<p>Description for Product 6 Version E</p>",
        attributes: ["attr9", "attr10"],
        createdAt: new Date("2024-02-05"),
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
        id: 603,
        productId: 6,
        versionTitle: "Version E",
        status: VersionStatus.Running,
        productTitle: "Product 6",
        heroImage: "image-url-5",
        description: "<p>Description for Product 6 Version E</p>",
        attributes: ["attr9", "attr10"],
        createdAt: new Date("2024-02-05"),
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
    ],
  },
  {
    id: 7,
    externalId: "ext-7",
    storeId: 107,
    status: ProductStatus.Active,
    title: "COCO MINT Coconut Oil Body Scrub",
    handle: "COCO MINT Coconut Oil Body Scrub".toLowerCase().replace(/ /g, "-"),
    statistics: {
      views: 27351,
      conversionRateLift: 36.4,
      marginalRevenue: 7128,
      personalizedPercentage: 94,
      addToCartRateLift: 39.3,
    },
    defaultVersionId: 700,
    versions: [
      {
        id: 700,
        productId: 7,
        versionTitle: "Default Version",
        status: VersionStatus.Default,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 701,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 702,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 702,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 703,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 704,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 705,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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
      {
        id: 706,
        productId: 7,
        versionTitle: "Version",
        status: VersionStatus.Running,
        productTitle: "Product 1",
        heroImage: "image-url-3",
        description: "<p>Default Product Description</p>",
        attributes: [],
        createdAt: new Date("2024-02-05"),
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

export const DemoGeneratingVersionsArr = [
  {
    id: 1001,
    productId: 1,
    versionTitle: "",
    status: VersionStatus.Generating,
    productTitle: "",
    heroImage: "",
    description: "<p></p>",
    attributes: [],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
  {
    id: 1002,
    productId: 1,
    versionTitle: "",
    status: VersionStatus.Generating,
    productTitle: "",
    heroImage: "",
    description: "<p></p>",
    attributes: [],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
  {
    id: 1003,
    productId: 1,
    versionTitle: "",
    status: VersionStatus.Generating,
    productTitle: "",
    heroImage: "",
    description: "<p></p>",
    attributes: [],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
];

export const DemoGeneratedVersions = [
  {
    id: 1001,
    productId: 1,
    versionTitle: "Middle-aged - Wrinkle Focus",
    status: VersionStatus.Pending,
    productTitle: "MOON FRUIT Serum for Wrinkles - Retinol Alternative",
    heroImage:
      "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V05.jpg?v=1703102684&width=1400",
    description:
      "<p>Bring back your skin's firmness by visibly reducing lines and wrinkles with this clinically advanced serum. With age-resisting Peptide and Bakuchiol, the Moon Fruit Serum is an advanced yet gentle retinol alternative.</p>",
    attributes: ["Age: 50+"],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
  {
    id: 1002,
    productId: 1,
    versionTitle: "Young Adult - Acne Focus",
    status: VersionStatus.Pending,
    productTitle: "MOON FRUIT Anti-Acne Serum - Retinol Alternative",
    heroImage: "https://www.herbivorebotanicals.com/cdn/shop/files/BLUE-TANSY-108120_V04.jpg?v=1703098281&width=1200",
    description:
      "<p>Featuring Peptide and Bakuchiol, the Moon Fruit Serum is your gentle acne-fighting retinol substitute. This non-comedogenic formula prevents whiteheads and blackheads by keeping your pores clear and clean, and even boosts collagens for hydration and anti-wrinkle.</p>",
    attributes: ["Age: 18-24"],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
  {
    id: 1003,
    productId: 1,
    versionTitle: "Dry Skin - Hydration Focus",
    status: VersionStatus.Pending,
    productTitle: "MOON FRUIT Hydrating Serum for Dry Skin - Retinol Alternative",
    heroImage:
      "https://www.herbivorebotanicals.com/cdn/shop/files/CLOUD-JELLY-112090-V_05_5b87e752-546c-47a8-a8ef-ca3987f9af52.jpg?v=1703098951&amp;width=1500",
    description:
      "<p>Keep your skin deeply hydrated with Moon Fruit serum, enriched with Peptide and Bakuchiol, a gentle alternative to retinol. Its unique formula locks in moisture to alleviate chronic dryness, simultaneously smoothing out wrinkles and keeping your pores clear for a supple, refreshed complexion.</p>",
    attributes: ["Past Purchased: Dry Skin Products"],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
  {
    id: 1004,
    productId: 1,
    versionTitle: "Male Focus - Male Skin + Gift for Girlfriend",
    status: VersionStatus.Pending,
    productTitle: "MOON FRUIT Retinol Alternative Serum",
    heroImage: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V05.jpg",
    description:
      "<p>Simplify your routine with the Moon Fruit serum. Infused with Peptide and Bakuchiol for effective hydration, this blend is perfect for maintaining a smooth complexion and helping avoid razor burns and bumps. Treat yourself or complete your Valentine’s gift!</p>",
    attributes: ["Gender: Male", "Near Holiday: Valentine's"],
    createdAt: new Date("2024-02-05"),
    statistics: {
      views: 0,
      conversionRate: 0,
      marginalRevenue: 0,
      displayPercentage: 0,
      addToCartRate: 0,
      conversionRateLift: 0,
      addToCartRateLift: 0,
    },
  },
];

export const sampleImages: Image[] = [
  {
    id: 0,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V01.jpg?v=1703102622&width=1400",
    product_id: 1, // assuming this image is for product 1
    alt: "Image 1 alt text",
    ai_description: "AI generated description for Image 1",
  },
  {
    id: 1,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V05.jpg?v=1703102684&width=1400",
    product_id: 1, // assuming this image is for product 1
    alt: "Image 1 alt text",
    ai_description: "AI generated description for Image 1",
  },
  {
    id: 2,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V08.jpg?v=1703102715&width=1400",
    product_id: 2, // assuming this image is for product 2
    alt: "Image 2 alt text",
    ai_description: "AI generated description for Image 2",
  },
  {
    id: 3,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V09.jpg?v=1703102715&width=1400",
    product_id: 3, // assuming this image is for product 3
    alt: "Image 3 alt text",
    ai_description: "AI generated description for Image 3",
  },
  {
    id: 4,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/MOON-FRUIT-SERUM-112090_V03.jpg?v=1703102715&width=1400",
    product_id: 4, // assuming this image is for product 4
    alt: "Image 4 alt text",
    ai_description: "AI generated description for Image 4",
  },
  {
    id: 5,
    url: "https://www.herbivorebotanicals.com/cdn/shop/files/BLUE-TANSY-108120_V04.jpg?v=1703098281&width=1200",
    product_id: 4, // assuming this image is for product 4
    alt: "Image 4 alt text",
    ai_description: "AI generated description for Image 4",
  },
  {
    id: 6,
    url: "https://anthony.com/cdn/shop/products/anthonymodelsallpurposem_550x.jpg?v=1673567866",
    product_id: 4, // assuming this image is for product 4
    alt: "Image 4 alt text",
    ai_description: "AI generated description for Image 4",
  },
];

export interface Store {
  id: number;
  name: string;
  description: string;
  status: string;
  storeSettings: StoreSettings;
}

export interface StoreSettings {
  bannedWords: string[];
  selectImageInstructions: string;
  generateDescriptionInstructions: string;
  exampleDescription: string;
}

export const sampleStore: Store = {
  id: 1,
  name: "Sample Store",
  description: "This is sample store",
  status: "ACTIVE",
  storeSettings: {
    bannedWords: ["banned", "words"],
    selectImageInstructions: "Select an image",
    generateDescriptionInstructions: "Generate description",
    exampleDescription: "This is an example description",
  },
};

export default SampleData;
