export interface Product {
  _id: string;
  productName: string;
  slug: string;
  productImage: string;
  tagline: string;
  quantity: number;
  unit: string;
  prvPrice: number;
  price: number;
  hadith: string;
  productType: "regular" | "variant";
  sold: number;
  __v: number;

  benefits: {
    heading: string;
    steps: string[];
  };

  buyingReason: {
    heading: string;
    steps: string[];
  };

  shipping: {
    dhakaCity: number;
    dhakaCityOuter: number;
    outsideDhaka: number;
  };

  seo: {
    tag: string[];
    description: string;
  };

  category: {
    _id: string;
    categoryName: string;
    categoryPhoto: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
  };

  variants: Variant[];

  createdAt?: string;
  updatedAt?: string;
}

export interface Variant {
  name: string;
  price: number;
  prvPrice: number;
  image: string;
}
export const products: Product[] =[
    {
      benefits: {
        heading: "<p>🌼 সরিষা ফুলের মধুর উপকারিতা</p>",
        steps: [
          "প্রাকৃতিক শক্তি ও এনার্জি",
          "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
          "ত্বক ও চুলের জন্য উপকারী"
        ]
      },
      buyingReason: {
        heading: "<p>কেন বরকতময় পণ্য থেকে মধু কিনবেন</p>",
        steps: [
          "✅ ১. ১০০% খাঁটি ও ভেজালমুক্ত",
          "🍯 ২. কোরআনে ঘোষিত শিফাসম্পন্ন খাদ্য",
          "🌿 ৩\n. মৌসুমি ও একক ফুলের"
        ]
      },
      shipping: {
        dhakaCity: 0,
        dhakaCityOuter: 0,
        outsideDhaka: 0
      },
      seo: {
        tag: [
          "সরিষা ফুলের মধু",
          "Sorisa honey"
        ],
        description: "সরিষা ফুলের মধু "
      },
      productType: "regular",
      _id: "694d6db04c1a262785b656d4",
      productName: "<p>খাঁটি সরিষা ফুলের মধুর কম্ব অফার – ২ কেজি</p>",
      slug: "sorisha-fuler-modhur-comb-2kg-sorisha-honeycomb-2kg-pure-sorisha-honeycomb-2kg-2025-12-25-1766682032021",
      productImage: "https://i.ibb.co/wrg12s3r/image.webp",
      tagline: "<p>“সরিষা ফুলের মধু—২ কেজি 👉 মাত্র ৮৯০ টাকা 💥</p>",
      quantity: 9757,
      unit: "<p>২ কেজি</p>",
      prvPrice: 1290,
      price: 890,
      hadith: "<p>“মৌমাছির পেট থেকে বিভিন্ন রঙের পানীয় (মধু) বের হয়; তাতে মানুষের জন্য রয়েছে আরোগ্য।”</p><p>— (সূরা আন-নাহল: ১৬:৬৯)</p>",
      category: {
        _id: "6890e64907fe92b5801ec0b4",
        categoryName:  "মধু",
        categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
        slug: "honey-2025-08-04-1754326601171",
        createdAt: "2025-08-04T16:56:41.378Z",
        updatedAt: "2025-08-04T16:56:41.378Z",
        __v: 0
      },
      sold: 0,
      __v: 0,
      variants: []
    },
    {
      benefits: {
        heading: "<p>কালোজিরা + সরিষা ফুলের মধুর উপকারিতা</p>",
        steps: [
          "ঠান্ডা–কাশি ও গলা ব্যথায় দারুণ উপকারী",
          "রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
          "হজমশক্তি উন্নত করে",
          "শক্তি ও স্ট্যামিনা বাড়ায়",
          "হৃদপিণ্ড সুস্থ রাখে",
          "ত্বক ও মুখের উজ্জ্বলতা বাড়ায়",
          "স্মৃতিশক্তি ও ব্রেইন ফাংশন উন্নত করে",
          "ডায়েবেটিস চিনির বিকল্প মধু"
        ]
      },
      buyingReason: {
        heading: "<p>কেনো বরকতময় পণ্য থেকে মধু নিবেন</p>",
        steps: [
          "১০০% বিশুদ্ধ ও ভেজালমুক্ত গ্যারান্টি",
          "মৌসুম অনুযায়ী তাজা মধু",
          "হাদিস অনুযায়ী সুন্নাহভিত্তিক পণ্য",
          "অর্ডারের আগে–পরে সাপোর্ট",
          "ব্যবসার নৈতিকতা ও আমানতদারি",
          "সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা",
          "৭০০০+ কাস্টমারের আস্থা"
        ]
      },
      shipping: {
        dhakaCity: 0,
        dhakaCityOuter: 0,
        outsideDhaka: 0
      },
      seo: {
        tag: [
          "কালোজিরা ও সরিষা ফুলের মধু"
        ],
        description: "Kalojira sorisa honey kombo "
      },
      productType: "regular",
      _id: "693b073e895b9f05565ef267",
      productName: "<p>কালোজিরা ও সরিষা ফুলের মধু মোট ১ কেজির স্বাস্থ্য সচেতন কম্বো</p>",
      slug: "kalojira-sorisa-honey-kombo-500g-kore-2025-12-11-1765476158319",
      productImage: "https://i.ibb.co/xqKsCCNH/image.webp",
      tagline: "<p>দুই ফুলের দুই ভিন্ন স্বাদ ~ খাঁটি প্রিমিয়াম মধু এক প্যাকে।</p>",
      quantity: 3940,
      unit: "<p>অফারটি খুবই সীমিত সময়ের জন্য-৩৫০৳ বিশাল ডিসকাউন্ট🔥</p>",
      prvPrice: 1050,
      price: 700,
      hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন—</p><p></p><p>“তোমরা দু’টি জিনিসে শিফা রাখো: মধু এবং কুরআন।”</p><p>— (ইবনে মাজাহ, হাদিস ৩৪৫২)</p>",
      category: {
        _id: "6890e64907fe92b5801ec0b4",
        categoryName:  "মধু",
        categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
        slug: "honey-2025-08-04-1754326601171",
        createdAt: "2025-08-04T16:56:41.378Z",
        updatedAt: "2025-08-04T16:56:41.378Z",
        __v: 0
      },
      sold: 0,
      __v: 0,
      variants: []
    },
    {
      benefits: {
        heading: "<p>মধুর উপকারিতা</p>",
        steps: [
          "শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
          "ত্বক ও চুলের জন্য উপকারী",
          "প্রাকৃতিক শক্তি ও উদ্যম যোগায়",
          "ব্রেনের কার্যক্ষমতা ও স্মৃতিশক্তি বাড়ায়",
          "লিভার ও হার্টকে সুস্থ রাখতে সাহায্য করে"
        ]
      },
      buyingReason: {
        heading: "<p>কেন বরকতময় পণ্য থেকে মধু নিবেন</p>",
        steps: [
          "ভেজালমুক্ত নিশ্চয়তা",
          "সাশ্রয়ী দাম ও সময়মতো ডেলিভারি",
          "বিশ্বাসযোগ্য ব্র্যান্ড",
          "হাজারো গ্রাহকের আস্থার নাম",
          "সরাসরি মৌচাক ও খামার থেকে সংগ্রহ করা"
        ]
      },
      shipping: {
        dhakaCity: 0,
        dhakaCityOuter: 0,
        outsideDhaka: 1
      },
      seo: {
        tag: [
          "মধু",
          "Honey"
        ],
        description: "২ কেজির বেস্ট মধুর কম্বো"
      },
      productType: "regular",
      _id: "68af9b19a3e4342b55fa9d5c",
      productName: "<p>“বরকতময় প্রিমিয়াম হানি কম্বো”</p>",
      slug: "honey-2025-08-27-1756338967149",
      productImage: "https://i.ibb.co/cXbFdw4R/image.webp",
      tagline: "<p>“খাঁটি মধুর ৩ স্বাদে এক কম্বো – স্বাস্থ্য ও স্বাদে সেরা”</p><p></p>",
      quantity: 9946,
      unit: "<p>১ কেজি সরিষা ফুলের মধু</p><p>৫০০ গ্রাম কালোজিরা ফুলের মধু</p><p>৫০০ গ্রাম মিশ্র ফুলের মধু</p>",
      prvPrice: 1450,
      price: 1150,
      hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেনঃ</p><p>“তোমরা মধু ব্যবহার করো, কারণ এতে আরোগ্য রয়েছে।”</p><p>— (সহীহ বুখারী, হাদিস: ৫৬৮০)</p>",
      category: {
        _id: "6890e64907fe92b5801ec0b4",
        categoryName:  "মধু",
        categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
        slug: "honey-2025-08-04-1754326601171",
        __v: 0
      },
      sold: 0,
      __v: 0,
      variants: []
    },
  {
    benefits: {
      heading: "<p>মধুর উপকারিতা</p>",
      steps: [
        "অ্যালার্জি ও ঠান্ডাজনিত সমস্যা কমাতে সহায়ক",
        "স্বাদে হালকা ও মিষ্টি, শিশুদের জন্য উপযোগী",
        "গলা ব্যথা ও কাশি উপশম করে",
        "সর্দি-কাশি ও শ্বাসকষ্টে উপকারী",
        "একাধিক ফুলের নির্যাস থাকায় পুষ্টিগুণ সমৃদ্ধ",
        "ডায়েবেটিসে চিনির বিকল্পে মধু"
      ]
    },
    buyingReason: {
      heading: "<p>কেন বরকতময় পণ্য থেকে মধু নিবেন</p>",
      steps: [
        "খাঁটি ও প্রাকৃতিক – ভেজালমুক্ত নিশ্চয়তা",
        "সরাসরি মৌচাক ও খামার থেকে সংগ্রহ",
        "বিভিন্ন ফুলের ভিন্ন ভিন্ন স্বাদের সমাহার",
        "স্বাস্থ্যকর ও পুষ্টিগুণে ভরপুর",
        "গ্রাহকের বিশ্বাস ও আস্থার প্রতীক",
        "সম্পূর্ণ ক্যাশ অন ডেলিভারি"
      ]
    },
    shipping: {
      dhakaCity: 0,
      dhakaCityOuter: 0,
      outsideDhaka: 0
    },
    seo: {
      tag: [
        "লিচু ফুলের মধু",
        "Sorisa honey",
        "লিচু ফুলের মধু সরিষা ফুলের মধু কালোজিরা ফুলের মধু মিশ্র ফুলের মত।",
        "Kalojira Honey"
      ],
      description: "Honey kombo "
    },
    productType: "regular",
    _id: "68af3db6581e7566b4ef63b9",
    productName: "<p>কালোজিরা ,সরিষা, মিশ্র, লিচু, ফুলের মধু ২৫০ গ্রাম করে</p>",
    slug: "honey-kombo-2025-08-27-1756315060560",
    productImage: "https://i.ibb.co/vxfrLRTT/image.webp",
    tagline: "<p>খাঁটি মধুর সেরা ফ্যামিলি মিনি কম্বো ১ কেজি,</p><p>ফ্রি ডেলিভারি</p><p></p>",
    quantity: 17744,
    unit: "<p>মোট : ১ কেজির মিনি কম্বো</p>",
    prvPrice: 950,
    price: 650,
    hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন:</p><p>“তোমরা মধু ব্যবহার কর, কারণ এতে রোগের চিকিৎসা আছে।”</p><p>— সহিহ ইবনে মাজাহ, হাদিস: ৩৪৪২</p>",
    category: {
      _id: "6890e64907fe92b5801ec0b4",
      categoryName:  "মধু",
      categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
      slug: "honey-2025-08-04-1754326601171",
      createdAt: "2025-08-04T16:56:41.378Z",
      updatedAt: "2025-08-04T16:56:41.378Z",
      __v: 0
    },
    sold: 0,
    createdAt: "2025-08-27T17:17:42.594Z",
    updatedAt: "2026-03-28T21:37:02.301Z",
    __v: 0,
    variants: []
  },
  {
    benefits: {
      heading: "<p>মধুর উপকারিতা </p>",
      steps: [
        "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে",
        "সর্দি, কাশি ও গলা ব্যথায় উপকারী",
        "শরীরের শক্তি ও কর্মক্ষমতা বাড়ায়"
      ]
    },
    buyingReason: {
      heading: "<p>কেন আমাদের কাছ থেকে মধু নিবেন </p>",
      steps: [
        "খাঁটি ও বিশুদ্ধ",
        "মধু ও কালোজিরা, দুটোই রাসূলুল্লাহ ﷺ এর চিকিৎসা সুপারিশকৃত।",
        "পাহাড় ও বাগান থেকে সরাসরি সংগ্রহ",
        "দ্রুত ডেলিভারি"
      ]
    },
    shipping: {
      dhakaCity: 0,
      dhakaCityOuter: 0,
      outsideDhaka: 0
    },
    seo: {
      tag: ["খাঁটি কালোজিরা ফুলের মধু"],
      description: "কালোজিরা ফুলের মধু "
    },
    productType: "regular",
    _id: "689e14c162e91ea62a4f2d9d",
    productName: "<p>১ কেজি কালোজিরা ফুলের মধু ৯৯০ টাকা </p>",
    slug: "honey-2025-08-14-1755190465743",
    productImage: "https://i.ibb.co/8nc6gg2p/image.webp",
    tagline: "<p>\"কালোজিরা ফুলের মধু – সুন্নাহ্‌র চিকিৎসা, আল্লাহর রহমতের নিদর্শন\"</p>",
    quantity: 2000,
    unit: "<p>কালোজিরা ফুলের মধু </p>",
    prvPrice: 990,
    price: 990,
    hadith: "<p>\"মধুতে আছে রোগের জন্য আরোগ্য।\" (সহিহ বুখারি)</p>",
    category: {
      _id: "6890e64907fe92b5801ec0b4",
      categoryName:  "মধু",
      categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
      slug: "honey-2025-08-04-1754326601171",
      createdAt: "2025-08-04T16:56:41.378Z",
      updatedAt: "2025-08-04T16:56:41.378Z",
      __v: 0
    },
    sold: 0,
    createdAt: "2025-08-14T16:54:25.954Z",
    updatedAt: "2025-08-14T16:54:25.954Z",
    __v: 0,
    variants: []
  },
  {
    benefits: {
      heading: "<p>🍯 লিচু ফুলের মধুর উপকারিতা</p>",
      steps: [
        "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে",
        "লিচু ফুলের মধুতে অ্যান্টি-অক্সিডেন্ট থাকে",
        "শক্তি জোগায় ও ক্লান্তি দূর করে",
        "হজমে সহায়ক",
        "সর্দি-কাশিতে উপকারী",
        "ত্বকের সৌন্দর্য বৃদ্ধি করে",
        "ঘুমের উন্নতি ঘটায়",
        "হৃদপিণ্ড সুস্থ রাখে"
      ]
    },
    buyingReason: {
      heading: "<p>কেন আমাদের কাছ থেকে মধু নিবেন </p>",
      steps: [
        "১০০% খাঁটি ও প্রাকৃতিক",
        "DSTI অনুমোদিত ল্যাব টেস্টেড",
        "সততা ও বিশ্বস্ততা আমাদের অঙ্গীকার",
        "বিশ্বাসযোগ্যতা ও পবিত্রতা",
        "আমাদের নিজস্ব খামার থেকে মধু সংগ্রহ করে থাকি"
      ]
    },
    shipping: {
      dhakaCity: 0,
      dhakaCityOuter: 0,
      outsideDhaka: 0
    },
    seo: {
      tag: ["লিচু ফুলের মধু ", "Honey", "Licu honey"],
      description: "🍯 ২ কেজি লিচু ফুলের খাঁটি মধু – মাত্র ৯৫০ টাকা!"
    },
    productType: "regular",
    _id: "689243be7696af7702c4fe58",
    productName: "<p>প্রাকৃতিক লিচু ফুলের খাঁটি মধু</p>",
    slug: "--2025-08-05-1754416062364",
    productImage: "https://i.ibb.co/39yhp8JD/image.webp",
    tagline: "<p>🍯 ২ কেজি লিচু ফুলের খাঁটি মধু – মাত্র ৯৫০ টাকা!</p>",
    quantity: 990,
    unit: "<p>২ কেজি খাঁটি লিচু ফুলের মধু </p>",
    prvPrice: 1200,
    price: 950,
    hadith: "<p>\"তোমরা দুই ধরনের আরোগ্যের দিকে মনোযোগ দাও – মধু ও কুরআন।\"</p>",
    category: {
      _id: "6890e64907fe92b5801ec0b4",
      categoryName:  "কালোজিরা",
      categoryPhoto: "https://i.ibb.co.com/3VHxMq2/jira.jpg",
      slug: "honey-2025-08-04-1754326601171",
      createdAt: "2025-08-04T16:56:41.378Z",
      updatedAt: "2025-08-04T16:56:41.378Z",
      __v: 0
    },
    sold: 0,
    createdAt: "2025-08-05T17:47:42.588Z",
    updatedAt: "2026-03-25T10:59:04.834Z",
    __v: 0,
    variants: []
  },
  {
    benefits: {
      heading: "<p>কালোজিরা লিচু ফুলের মধুর উপকারিতা </p>",
      steps: [
        "ব্রেইন ও স্মৃতিশক্তি উন্নত করে",
        "রোগ প্রতিরোধ, হজম ও শক্তি বৃদ্ধিতে উত্তম",
        "ঠান্ডা, গলা ও রুচির জন্য উপকারী, মিষ্টি ও হালকা"
      ]
    },
    buyingReason: {
      heading: "<p>কেনো বরকতময় পণ্য থেকে মধু নিবেন</p>",
      steps: [
        "🧪 আমাদের মধু BSTI অনুমোদিত ল্যাবে পরীক্ষিত।",
        "খাঁটি, বিশুদ্ধ ও প্রাকৃতিক উৎস থেকে সংগৃহীত",
        "ঢাকার ভিতরে ২৪ ঘন্টায় ডেলিভারি ঢাকার বাইরে ২থেকে ৩ দিন",
        "আমাদের নিজস্ব খামার থেকে সংগ্রহ করে সরাসরি আপনাদের দরজায়"
      ]
    },
    shipping: {
      dhakaCity: 0,
      dhakaCityOuter: 0,
      outsideDhaka: 0
    },
    seo: {
      tag: ["কালোজিরা ফুলের মধু", "Kalojira honey", "Licu honey"],
      description: "১ কেজি খাঁটি কালোজিরা ফুলের মধু কিনলেই পাচ্ছেন ৫০০ গ্রাম লিচু ফুলের মধু একদম ফ্রি!"
    },
    productType: "regular",
    _id: "6891d28857a25ad3a289e3a9",
    productName: "<p>🍯 কালোজিরা ফুলের মধু – ১ কেজি</p><p>🍯 সরিষা ফুলের মধু – ১ কেজি</p>",
    slug: "--2025-08-05-1754387078627",
    productImage: "https://i.ibb.co/pjR51JpJ/image.webp",
    tagline: "<p>কালোজিরা ও সরিষা ফুলের মধুর কম্বো ২ কেজি</p>",
    quantity: 4999,
    unit: "<p>১ কেজি কালোজিরা ফুলের মধুর সাথে ৫০০ গ্রাম লিচু ফুলের মধু ফ্রি</p>",
    prvPrice: 1600,
    price: 1200,
    hadith: "<p>নবীজি (সঃ)-এর প্রিয় খাবার – রাসূল (সঃ) নিজে মধু খেতেন এবং চিকিৎসায় ব্যবহারের পরামর্শ দিতেন।</p>",
    category: {
      _id: "6890e64907fe92b5801ec0b4",
      categoryName:  "মধু",
      categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
      slug: "honey-2025-08-04-1754326601171",
      createdAt: "2025-08-04T16:56:41.378Z",
      updatedAt: "2025-08-04T16:56:41.378Z",
      __v: 0
    },
    sold: 0,
    createdAt: "2025-08-05T09:44:40.870Z",
    updatedAt: "2026-03-28T08:34:04.658Z",
    __v: 0,
    variants: []
  },

    {
      benefits: {
        heading: "<p>🍯 মধুর উপকারিতা</p>",
        steps: [
          "বৈজ্ঞানিক দৃষ্টিকোণ থেকে:\nইমিউন সিস্টেম বাড়ায় – রোগ প্রতিরোধ ক্ষমতা শক্তিশালী করে।",
          "শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
          "গলা ব্যথা, কাশি ও ঠান্ডা দূর করে",
          "হজম শক্তি বৃদ্ধি করে",
          "সকালে গরম পানিতে মিশিয়ে খেলে ওজন নিয়ন্ত্রণে সাহায্য করে",
          "ত্বককে করে উজ্জ্বল ও মসৃণ",
          "প্রাকৃতিক অ্যান্টিবায়োটিক হিসেবে কাজ করে",
          "মস্তিষ্ককে রাখে সতেজ ও মনকে শান্ত করে"
        ]
      },
      buyingReason: {
        heading: "<p>🍯 কেন ‘বরকতময় পণ্য’ থেকে মধু কিনবেন?</p>",
        steps: [
          "খাঁটি ও বিশুদ্ধ মধু — মিশ্রণহীন ও সরাসরি প্রকৃতি থেকে",
          "কুরআন সম্মত সুন্নত পণ্য — শিফার উৎস",
          "বিশ্বাসযোগ্যতা ও আমানতের প্রতীক — বরকতময় পণ্য",
          "যা বলি, তাই দেই — ওজন, মান ও সেবায় নেই কোনও ছলচাতুরী",
          "🧪 আমাদের মধু BSTI অনুমোদিত ল্যাবে পরীক্ষিত।"
        ]
      },
      shipping: {
        dhakaCity: 60,
        dhakaCityOuter: 70,
        outsideDhaka: 0
      },
      seo: {
        tag: [
          "মধু",
          "লিচু ফুলের মধু",
          "সরিষা ফুলের মধু",
          "কালোজিরা ফুলের মধু",
          "সুন্দর বনের প্রাকৃতিক চাকের মধু",
          "মিশ্র ফুলের মধু"
        ],
        description: "🍯 ৫ রকম খাঁটি ফুলের মধুর সুপার অফার!\nমাত্র ৫০০০ সৌভাগ্যবান কাস্টমারদের জন্য \n✅ মোট ১.২৫ কেজি মধু মাত্র ৯০০ টাকা!"
      },
      _id: "68919d79499de03b76e6515d",
      productName: "<p>🍯 ৫ রকম খাঁটি ফুলের মধুর সুপার অফার! মাত্র ৯৫০ টাকা!</p>",
      slug: "honey-kombo-2025-08-05-1754373496423",
      productImage: "https://i.ibb.co/wrzFwzMG/image.webp",
      tagline: "<p>৫ ধরণের খাঁটি ও পুষ্টিগুণে ভরপুর মধুর সংমিশ্রণ: মধু হাতে পেয়ে টেস্ট করবেন ভেজাল পেলে সাথে সাথে রিটার্ন করে দিবেন ইনশাআল্লাহ আমরা দিচ্ছি ১০০% পার্সেন্ট খাঁটি মধুর নিশ্চয়তা </p>",
      quantity: 4991,
      unit: "<p>২৫০ গ্রাম করে সুন্দরবন কালোজিরা লিচু সরিষা মিশ্র ফুলের মধু</p>",
      prvPrice: 1150,
      price: 800,
      hadith: "<p>🌿 “মধুতে আছে শিফা — কুরআনের ভাষায়।”</p><p>🌸 “নবীজি (সঃ) মধু পছন্দ করতেন, কারণ এতে রয়েছে আরোগ্য।”</p>",
      category: {
        _id: "6890e64907fe92b5801ec0b4",
        categoryName: "তেল",
        categoryPhoto: "https://i.ibb.co.com/YFyg1dcy/oil.jpg",
        slug: "honey-2025-08-04-1754326601171",
        createdAt: "2025-08-04T16:56:41.378Z",
        updatedAt: "2025-08-04T16:56:41.378Z",
        __v: 0
      },
      sold: 0,
      createdAt: "2025-08-05T05:58:17.553Z",
      updatedAt: "2026-03-28T14:21:47.600Z",
      __v: 0,
      productType: "variant",
      variants: [
        {
          name: "খাঁটি ফুলের মধু  টেস্ট ১ ",
          price: 900,
          prvPrice: 950,
          image: "https://i.ibb.co/nsPVB1wV/image.webp"
        },
        {
          name: "খাঁটি ফুলের মধু  টেস্ট 2",
          price: 800,
          prvPrice: 850,
          image: "https://i.ibb.co/gMKYCwP5/image.webp"
        }
      ]
    },
    {
      benefits: {
        heading: "<p>কালোজিরা, লিচু ও সরিষা ফুলের মধুর উপকারিতা </p>",
        steps: [
          "রোগপ্রতিরোধ ক্ষমতা বাড়ায়",
          "ডায়াবেটিস নিয়ন্ত্রণে সহায়ক",
          "হজমশক্তি উন্নত করে",
          "ঠান্ডা-কাশি ও গলা ব্যথায় উপকারী",
          "ত্বক ও চুলের যত্নে ভালো",
          "অ্যান্টি-অক্সিডেন্ট ও অ্যান্টিব্যাকটেরিয়াল গুণে ভরপুর",
          "হালকা মিষ্টি স্বাদের এবং খুবই সুস্বাদু",
          "হৃদপিণ্ড ও রক্তনালীর জন্য ভালো",
          "শক্তি বাড়াতে সহায়ক"
        ]
      },
      buyingReason: {
       heading: "<p>🍯 কেন \"বরকতময় পণ্য\" থেকে মধু কিনবেন?</p>",
        steps: [
          "ইসলামিক দৃষ্টিভঙ্গি: কুরআন ও হাদিসে বর্ণিত পদ্ধতিতে সংগ্রহ ও সংরক্ষণ।",
          "শতভাগ খাঁটি মধুর নিশ্চয়তা ভিন্ন ভিন্ন এলাক  থেকে সংগ্রকৃত মধু (মাগুরা,সাতক্ষীরা,সুন্দরবন)",
          "ঢাকার ভিতরে ২৪ ঘন্টায় ডেলিভারি টাকার বাহিরে ২-৩ দিন",
          "ভেজালমুক্ত (BSTI) অনুমোদিত",
          "ল্যাব টেস্টকৃত বিশুদ্ধতা"
        ]
      },
      shipping: {
        dhakaCity: 0,
        dhakaCityOuter: 0,
        outsideDhaka: 0
      },
      seo: {
        tag: [
          "লিচু ফুলের খাঁটি মধু",
          "কালোজিরা ফুলের খাঁটি মধু",
          "সরিষা ফুলের খাঁটি মধু",
          "honey kombo"
        ],
        description: "🌼 বিশুদ্ধ প্রকৃতির ছোঁয়া – তিন রকমের অনন্য খাঁটি মধু! 🍯"
      },
      productType: "regular",
      _id: "6890f348b0e8141fdeba3f40",
      productName: "<p>🌼 কালোজিরা+লিচু+সরিষা ফুলের মধু ৫০০ গ্রাম করে 🍯</p>",
      slug: "honey-kombo-licu-sorisa-kalojira-2025-08-04-1754329928785",
      productImage: "https://i.ibb.co/2Y3YWtxK/image.webp",
      tagline: "<p>আসসালামু আলাইকুম</p><p> ইনশাআল্লাহ আমরা দিচ্ছি খাঁটি মধুর নিশ্চয়তা,</p><p>বিশুদ্ধ প্রকৃতির ছোঁয়া খাঁটি মধু</p>",
      quantity: 1989,
      unit: "<p>তিন রকমের দেড় কেজি খাঁটি মধু</p>",
      prvPrice: 1200,
      price: 950,
      hadith: "<p>রাসুলুল্লাহ (সা.) মধুর ব্যবহার করতেন এবং তা অন্যান্যদেরকেও উৎসাহিত করতেন।</p><p></p><p>এটি শুধু রোগ নিরাময়ের উপাদান নয়, বরং বরকতময় একটি খাবারও।</p>",
      category: {
        _id: "6890e64907fe92b5801ec0b4",
        categoryName:  "মধু",
        categoryPhoto: "https://i.ibb.co/Rk8k4C8C/image.webp",
        slug: "honey-2025-08-04-1754326601171",
        createdAt: "2025-08-04T16:56:41.378Z",
        updatedAt: "2025-08-04T16:56:41.378Z",
        __v: 0
      },
      sold: 0,
      createdAt: "2025-08-04T17:52:08.993Z",
      updatedAt: "2026-02-04T13:23:02.886Z",
      __v: 0,
      variants: []
    }
  ]