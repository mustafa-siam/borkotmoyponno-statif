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
export const products: Product[] = [
  {
  benefits: {
    heading: "<p>🌿 কালোজিরা ফুলের মধুর অবিশ্বাস্য উপকারিতা</p>",
    steps: [
      "রোগ প্রতিরোধ ক্ষমতা (Immune System) শক্তিশালী করে",
      "স্মৃতিশক্তি বৃদ্ধি এবং ব্রেইন ফাংশন উন্নত করতে অত্যন্ত কার্যকর",
      "পুরানো সর্দি, কাশি এবং হাঁপানি উপশমে জাদুর মতো কাজ করে",
      "যৌন শক্তি বৃদ্ধি এবং শারীরিক দুর্বলতা দূর করে",
      "হজম শক্তি বাড়াতে এবং গ্যাস্ট্রিকের সমস্যায় আরাম দেয়"
    ]
  },
  buyingReason: {
    heading: "<p>কেন খিদমাহ অর্গানিকের কালোজিরা মধু সেরা?</p>",
    steps: [
      "✅ সরাসরি কালোজিরা ক্ষেতের মৌচাক থেকে সংগৃহীত",
      "🍯 শতভাগ প্রাকৃতিক, কোনো প্রকার চিনি বা কৃত্রিম স্বাদ নেই",
      "🧪 ল্যাব টেস্টেড এবং বিএসটিআই (BSTI) মানসম্পন্ন",
      "💎 প্রিমিয়াম প্যাকেজিং এবং দ্রুত ডেলিভারি নিশ্চিত"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 100,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "কালোজিরা ফুলের মধু",
      "Blackseed Flower Honey",
      "Kalojira Modhu",
      "Natural Honey Bangladesh"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম কালোজিরা ফুলের মধু - প্রকৃতির সেরা আরোগ্য ও শক্তি।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f10",
  productName: "<p>প্রিমিয়াম কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey)</p>",
  slug: "premium-blackseed-flower-honey-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/ZRtZQkYr/kalojira.png",
  tagline: "<p>“কালোজিরা ফুলের মধু: সুস্থ জীবনের এক অনন্য হাতিয়ার”</p>",
  quantity: 850,
  unit: "<p>১ কেজি</p>",
  prvPrice: 1400,
  price: 1150,
  hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন: “তোমরা কালোজিরা ব্যবহার করো, কারণ এতে মৃত্যু ব্যতীত সকল রোগের নিরাময় রয়েছে।” (সহীহ বুখারী)</p>",
  category: {
    _id: "cat_honey_001",
    categoryName: "মধু",
    categoryPhoto: "https://i.ibb.co.com/ZRtZQkYr/kalojira.png",
    slug: "honey-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 210,
  __v: 0,
  variants: []
},
 {
  benefits: {
    heading: "<p>☕ প্রিমিয়াম চা পাতার বিশেষত্ব ও উপকারিতা</p>",
    steps: [
      "অ্যান্টি-অক্সিডেন্ট সমৃদ্ধ যা শরীরকে সতেজ ও চনমনে রাখে",
      "ক্লান্তি দূর করে এবং তাৎক্ষণিক এনার্জি প্রদান করে",
      "মস্তিষ্কের কর্মক্ষমতা বাড়াতে এবং মনোযোগ বৃদ্ধিতে সহায়ক",
      "হৃদরোগের ঝুঁকি কমাতে এবং মেটাবলিজম উন্নত করতে সাহায্য করে",
      "প্রাকৃতিক লিকার ও চমৎকার সুঘ্রাণ মনকে শান্ত রাখে"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের চা পাতা সেরা?</p>",
    steps: [
      "✅ শ্রীমঙ্গলের বাগান থেকে সরাসরি সংগৃহীত ফ্রেশ পাতা",
      "🍃 ডাস্ট-ফ্রি (ধুলামুক্ত) এবং কেমিক্যাল মুক্ত বিশুদ্ধ চা",
      "🍵 কড়া লিকার এবং আভিজাত্যপূর্ণ চমৎকার স্বাদ",
      "💎 প্রিমিয়াম গ্রেডের চা পাতা যা সাধারণ চায়ের চেয়ে আলাদা"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 70,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "প্রিমিয়াম চা পাতা",
      "Premium Tea",
      "Srimangal Tea",
      "Organic Tea BD",
      "চা পাতা"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম চা পাতা - বাগান থেকে সরাসরি আসা সতেজ চায়ের স্বাদ ও ঘ্রাণ।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f77",
  productName: "<p>প্রিমিয়াম চা পাতা (Premium Garden Fresh Tea)</p>",
  slug: "premium-garden-fresh-tea-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/G37h6Wb1/tea.png",
  tagline: "<p>“এক কাপ চায়ে সজীবতা, বাগান থেকে সরাসরি আপনার কাপে”</p>",
  quantity: 1500,
  unit: "<p>৫০০ গ্রাম</p>",
  prvPrice: 450,
  price: 380,
  hadith: "<p>রাসূলুল্লাহ ﷺ পানীয় পান করার সময় তিন নিঃশ্বাসে পান করা পছন্দ করতেন এবং পরিচ্ছন্ন পানীয়র প্রশংসা করতেন।</p>",
  category: {
    _id: "cat_tea_003",
    categoryName: "চা",
    categoryPhoto: "https://i.ibb.co.com/G37h6Wb1/tea.png",
    slug: "tea-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 340,
  __v: 0,
  variants: []
},
 {
  benefits: {
    heading: "<p>🌿 প্রিমিয়াম হলুদ গুঁড়ার উপকারিতা</p>",
    steps: [
      "প্রাকৃতিক কারকিউমিন সমৃদ্ধ যা শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
      "শরীরের যেকোনো অভ্যন্তরীণ ইনফ্লামেশন বা প্রদাহ কমাতে সাহায্য করে",
      "ত্বকের উজ্জ্বলতা বৃদ্ধি করে এবং ব্রন দূর করতে কার্যকরী",
      "রক্ত পরিষ্কার করতে এবং লিভার ভালো রাখতে সহায়তা করে",
      "হজম প্রক্রিয়া উন্নত করে এবং মেটাবলিজম বাড়ায়"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের হলুদ গুঁড়া সেরা?</p>",
    steps: [
      "✅ বাছাইকৃত সেরা মানের আস্ত হলুদ থেকে প্রস্তুত",
      "🚫 কোনো প্রকার কৃত্রিম রঙ বা প্রিজারভেটিভ নেই",
      "🌿 নিজস্ব তত্ত্বাবধানে পরিষ্কার ও শুকানো হয়",
      "💎 বাজারের সাধারণ হলুদের চেয়ে কড়া স্বাদ ও ঘ্রাণ"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 70,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "হলুদ গুঁড়া",
      "Turmeric Powder",
      "Organic Turmeric",
      "Premium Spices"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম হলুদ গুঁড়া - শতভাগ বিশুদ্ধ ও কেমিক্যাল মুক্ত।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f99",
  productName: "<p>প্রিমিয়াম হলুদ গুঁড়া (Premium Turmeric Powder)</p>",
  slug: "premium-turmeric-powder-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/NgrrK7Sq/holud.png",
  tagline: "<p>“রান্নায় আসুক খাঁটি রঙের ছোঁয়া আর প্রাকৃতিক গুণাগুণ”</p>",
  quantity: 1200,
  unit: "<p>৫০০ গ্রাম</p>",
  prvPrice: 380,
  price: 320,
  hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন: “পরিচ্ছন্নতা ও পবিত্রতা ঈমানের অঙ্গ।” (সহীহ মুসলিম)</p>",
  category: {
    _id: "cat_spices_002",
    categoryName: "মশলা",
    categoryPhoto: "https://i.ibb.co.com/NgrrK7Sq/holud.png",
    slug: "spices-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 120,
  __v: 0,
  variants: []
},
  {
  benefits: {
    heading: "<p>🌶️ প্রিমিয়াম মরিচ গুঁড়ার উপকারিতা</p>",
    steps: [
      "মেটাবলিজম বাড়িয়ে ক্যালরি পোড়াতে ও ওজন কমাতে সাহায্য করে",
      "শরীরের রক্ত সঞ্চালন প্রক্রিয়া উন্নত করে",
      "হজমে সহায়তা করে এবং পাকস্থলীর ক্ষতিকারক ব্যাকটেরিয়া ধ্বংস করে",
      "ভিটামিন-সি ও বিটাক্যারোটিন সমৃদ্ধ যা চোখ ও ত্বক ভালো রাখে",
      "সাইনাসের সমস্যা ও ঠান্ডাজনিত অস্বস্তি কমাতে কার্যকরী"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের মরিচ গুঁড়া আলাদা?</p>",
    steps: [
      "✅ নিজস্ব তত্ত্বাবধানে বাছাইকৃত সেরা শুকনো মরিচ থেকে তৈরি",
      "🚫 কোনো প্রকার বিষাক্ত টেক্সটাইল রঙ বা ভেজাল মেশানো হয় না",
      "🌿 প্রাকৃতিকভাবে শুকানো মরিচের খাঁটি ঝাল ও লাল রং",
      "💎 রান্নায় আনে চমৎকার স্বাদ ও পারফেক্ট ঝাল"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 70,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "মরিচ গুঁড়া",
      "Chili Powder",
      "Spicy Red Chili",
      "Khidmah Spices",
      "বিশুদ্ধ মশলা"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম মরিচ গুঁড়া - শতভাগ বিশুদ্ধ এবং কেমিক্যাল মুক্ত ঝালের স্বাদ।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f55",
  productName: "<p>প্রিমিয়াম মরিচ গুঁড়া (Premium Chili Powder)</p>",
  slug: "premium-chili-powder-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/YTNdBx5r/morich.png",
  tagline: "<p>“রান্নায় আসুক খাঁটি ঝালের স্বাদ ও আকর্ষণীয় রঙ”</p>",
  quantity: 900,
  unit: "<p>৫০০ গ্রাম</p>",
  prvPrice: 420,
  price: 360,
  hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন: “ক্ষতিকর জিনিস অপসারন করা সদকার সওয়াব।” (সহীহ মুসলিম)</p>",
  category: {
    _id: "cat_spices_002",
    categoryName: "মশলা",
    categoryPhoto: "https://i.ibb.co.com/YTNdBx5r/morich.png",
    slug: "spices-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 185,
  __v: 0,
  variants: []
},
  {
  benefits: {
    heading: "<p>🌼 খাঁটি গাওয়া ঘিয়ের উপকারিতা</p>",
    steps: [
      "হজম শক্তি উন্নত করে ও কোষ্ঠকাঠিন্য দূর করে",
      "স্মৃতিশক্তি ও মস্তিষ্কের কার্যক্ষমতা বাড়াতে সহায়ক",
      "শরীরে দীর্ঘস্থায়ী শক্তি ও এনার্জি প্রদান করে",
      "ত্বক ও চুলের উজ্জ্বলতা বৃদ্ধি করে",
      "হাড়ের জয়েন্টের লুব্রিকেন্ট হিসেবে কাজ করে"
    ]
  },
  buyingReason: {
    heading: "<p>কেন খিদমাহ অর্গানিক থেকে ঘি নিবেন?</p>",
    steps: [
      "✅ ১০০% খাঁটি গাভীর দুধের ননী থেকে প্রস্তুত",
      "🌿 কোনো প্রকার কেমিক্যাল বা প্রিজারভেটিভ নেই",
      "🍯 প্রিমিয়াম কোয়ালিটি ও চমৎকার সুঘ্রাণ",
      "🧪 ল্যাব টেস্টেড এবং স্বাস্থ্যসম্মত উপায়ে তৈরি"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 100,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "খাঁটি ঘি",
      "গাওয়া ঘি",
      "Premium Ghee",
      "Cow Ghee"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম গাওয়া ঘি - স্বাদে ও ঘ্রাণে অতুলনীয়।"
  },
  productType: "variant",
  _id: "68af9b19a3e4342b55fa9e88",
  productName: "<p>খিদমাহ প্রিমিয়াম গাওয়া ঘি (Premium Cow Ghee)</p>",
  slug: "premium-cow-ghee-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/d4vMjkcy/ghee.png",
  tagline: "<p>“ঘিয়ের রাজকীয় ঘ্রাণ আর খাঁটি গুণের নিশ্চয়তা”</p>",
  quantity: 500,
  unit: "<p>৫০০ গ্রাম / ১ কেজি</p>",
  prvPrice: 1850,
  price: 1650,
  hadith: "<p>রাসূলুল্লাহ ﷺ বলেছেন: “তোমরা গরুর দুধ পান করো, কেননা এটি শিফা। আর এর ঘি ব্যবহার করো।”</p>",
  category: {
    _id: "cat_ghee_001",
    categoryName: "ঘি",
    categoryPhoto: "https://i.ibb.co.com/d4vMjkcy/ghee.png",
    slug: "ghee-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 45,
  __v: 0,
  variants: [
    {
      name: "৫০০ গ্রাম",
      price: 850,
      prvPrice: 950,
      image: "https://i.ibb.co/LdnM2S0X/ghee-500.webp"
    },
    {
      name: "১ কেজি",
      price: 1650,
      prvPrice: 1850,
      image: "https://i.ibb.co/LdnM2S0X/ghee-1kg.webp"
    }
  ]
},
 {
  benefits: {
    heading: "<p>🍯 লাল চিনির পুষ্টিগুণ ও স্বাস্থ্য উপকারিতা</p>",
    steps: [
      "সাদা চিনির তুলনায় এতে ক্যালসিয়াম, পটাশিয়াম ও আয়রন বেশি থাকে",
      "শরীরের ক্লান্তি দূর করে তাৎক্ষণিক শক্তি যোগাতে সাহায্য করে",
      "হজম প্রক্রিয়াকে সহজ করে এবং কোষ্ঠকাঠিন্যের সমস্যা কমায়",
      "রাসায়নিক মুক্ত হওয়ায় এটি লিভার ও কিডনির জন্য ক্ষতিকর নয়",
      "শরীরের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করতে সহায়তা করে"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের লাল চিনি (দেশি চিনি) সেরা?</p>",
    steps: [
      "✅ আখের রস থেকে সরাসরি তৈরি, কোনো ব্লিচিং বা রিফাইনিং করা হয়নি",
      "🚫 কোনো প্রকার ক্ষতিকর হাড়ের গুঁড়ো বা রাসায়নিক মিশানো হয় না",
      "🌿 আখের প্রাকৃতিক স্বাদ ও খনিজ উপাদান অক্ষুণ্ণ রাখা হয়েছে",
      "💎 শতভাগ বিশুদ্ধ ও স্বাস্থ্যসম্মত উপায়ে বাজারজাতকৃত"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 70,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "লাল চিনি",
      "Red Sugar",
      "Brown Sugar BD",
      "দেশি চিনি",
      "Unrefined Sugar"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম লাল চিনি - ব্লিচিং ও কেমিক্যাল মুক্ত আখের আসল স্বাদ।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f33",
  productName: "<p>প্রিমিয়াম দেশি লাল চিনি (Premium Red Sugar)</p>",
  slug: "premium-red-sugar-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/fzfYmRbJ/nuts1-clean.png",
  tagline: "<p>“সাদা বিষ বর্জন করুন, প্রাকৃতিক লাল চিনির স্বাদ নিন”</p>",
  quantity: 2500,
  unit: "<p>১ কেজি</p>",
  prvPrice: 180,
  price: 155,
  hadith: "<p>রাসূলুল্লাহ ﷺ মিষ্টি এবং মধু খেতে পছন্দ করতেন। (সহীহ বুখারী)</p>",
  category: {
    _id: "cat_others_004",
    categoryName: "অন্যান্য",
    categoryPhoto: "https://i.ibb.co.com/fzfYmRbJ/nuts1-clean.png",
    slug: "others-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 420,
  __v: 0,
  variants: []
},
  {
  benefits: {
    heading: "<p>🌿 ইসবগুলের ভুসির জাদুকরী উপকারিতা</p>",
    steps: [
      "কোষ্ঠকাঠিন্য দূর করতে এবং মলত্যাগ সহজ করতে অত্যন্ত কার্যকর",
      "হজম প্রক্রিয়া উন্নত করে এবং পাকস্থলীর বর্জ্য পরিষ্কার করতে সাহায্য করে",
      "শরীরের খারাপ কোলেস্টেরল কমিয়ে হৃদপিণ্ড সুস্থ রাখতে সহায়তা করে",
      "রক্তে শর্করার মাত্রা নিয়ন্ত্রণে রাখে, যা ডায়াবেটিস রোগীদের জন্য উপকারী",
      "খাওয়ার আগে খেলে দীর্ঘক্ষণ পেট ভরা রাখে, যা ওজন কমাতে সাহায্য করে"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের ইসবগুলের ভুসি প্রিমিয়াম?</p>",
    steps: [
      "✅ শতভাগ প্রাকৃতিক এবং কোনো প্রকার ভেজালহীন ভুসি",
      "🚫 কোনো কৃত্রিম ফ্লেভার বা কেমিক্যাল প্রিজারভেটিভ নেই",
      "🌿 অত্যন্ত পরিষ্কার এবং স্বচ্ছ কোয়ালিটি নিশ্চিত করা হয়",
      "💎 সরাসরি আমদানিকৃত সেরা মানের দানা থেকে প্রস্তুত"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 70,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "ইসবগুলের ভুসি",
      "Psyllium Husk",
      "Ispaghol Bhusi",
      "Fiber Supplement",
      "Natural Laxative"
    ],
    description: "খিদমাহ অর্গানিক প্রিমিয়াম ইসবগুলের ভুসি - হজম ও কোষ্ঠকাঠিন্যের প্রাকৃতিক সমাধান।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f22",
  productName: "<p>প্রিমিয়াম ইসবগুলের ভুসি (Premium Psyllium Husk)</p>",
  slug: "premium-psyllium-husk-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/qzd34xp/nuts2-clean.png",
  tagline: "<p>“পেটের সুস্বাস্থ্য ও হজমে আসুক প্রাকৃতিক প্রশান্তি”</p>",
  quantity: 600,
  unit: "<p>২৫০ গ্রাম</p>",
  prvPrice: 350,
  price: 290,
  hadith: "<p>“সুস্থতা আল্লাহর এক বিশাল নেয়ামত।” (সহীহ বুখারী)</p>",
  category: {
    _id: "cat_health_005",
    categoryName: "অন্যান্য",
    categoryPhoto: "https://i.ibb.co.com/qzd34xp/nuts2-clean.png",
    slug: "health-safety",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 290,
  __v: 0,
  variants: []
},
{
  benefits: {
    heading: "<p>🥥 খাঁটি নারিকেল তেলের বহুমুখী উপকারিতা</p>",
    steps: [
      "চুলের গোড়া মজবুত করে এবং চুল পড়া রোধে অত্যন্ত কার্যকর",
      "ত্বকের প্রাকৃতিক ময়েশ্চারাইজার হিসেবে কাজ করে এবং ত্বক নরম রাখে",
      "রান্নায় ব্যবহার করলে মেটাবলিজম বাড়ায় এবং ওজন নিয়ন্ত্রণে সাহায্য করে",
      "অ্যান্টি-ফাঙ্গাল ও অ্যান্টি-ব্যাকটেরিয়াল গুনাগুণ সম্পন্ন যা ইনফেকশন দূর করে",
      "প্রাকৃতিক কন্ডিশনার হিসেবে চুলের উজ্জ্বলতা বহুগুণ বাড়িয়ে দেয়"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের নারিকেল তেল সেরা?</p>",
    steps: [
      "✅ বাছাইকৃত শুকনা নারিকেল থেকে ঘানি ভাঙা ১০০% খাঁটি তেল",
      "🚫 কোনো প্রকার প্যারাফিন, মিনারেল অয়েল বা কৃত্তিম ঘ্রাণ নেই",
      "🌿 কোল্ড প্রেসড পদ্ধতিতে তৈরি হওয়ায় তেলের প্রাকৃতিক গুণাগুণ অক্ষুণ্ণ থাকে",
      "💎 স্বচ্ছ ও বিশুদ্ধ, যা রান্নায় এবং ত্বকের যত্নে ব্যবহারের জন্য সম্পূর্ণ নিরাপদ"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 100,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "নারিকেল তেল",
      "Coconut Oil BD",
      "Pure Coconut Oil",
      "Cold Pressed Coconut Oil",
      "ঘানি ভাঙা নারিকেল তেল"
    ],
    description: "অর্গানিক ১০০% খাঁটি নারিকেল তেল - চুলের যত্ন ও রান্নায় বিশুদ্ধতার নিশ্চয়তা।"
  },
  productType: "variant",
  _id: "68af9b19a3e4342b55fa9f66",
  productName: "<p>খাঁটি নারিকেল তেল (Pure Cold Pressed Coconut Oil)</p>",
  slug: "pure-cold-pressed-coconut-oil-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/ZRssJqSD/tel-clean.png",
  tagline: "<p>“প্রকৃতির যত্ন, ঘানি ভাঙা নারিকেল তেলের বিশুদ্ধ পূর্ণতা”</p>",
  quantity: 350,
  unit: "<p>৫০০ মিলি / ১ লিটার</p>",
  prvPrice: 950,
  price: 850,
  hadith: "<p>রাসূলুল্লাহ ﷺ তেল ব্যবহারের পরামর্শ দিতেন এবং এটি ত্বক ও চুলের স্বাস্থ্যের জন্য উপকারী।</p>",
  category: {
    _id: "cat_oil_007",
    categoryName: "তেল",
    categoryPhoto: "https://i.ibb.co.com/ZRssJqSD/tel-clean.png",
    slug: "oil-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 175,
  __v: 0,
  variants: [
    {
      name: "৫০০ মিলি",
      price: 450,
      prvPrice: 500,
      image: "https://i.ibb.co.com/ZRssJqSD/tel-clean.png"
    },
    {
      name: "১ লিটার",
      price: 850,
      prvPrice: 950,
      image: "https://i.ibb.co.com/ZRssJqSD/tel-clean.png"
    }
  ]
},
  {
  benefits: {
    heading: "<p>🍷 বিটরুট পাউডারের বিস্ময়কর উপকারিতা</p>",
    steps: [
      "শরীরের রক্তস্বল্পতা দূর করতে এবং আয়রনের ঘাটতি পূরণে অত্যন্ত কার্যকর",
      "রক্তচাপ (Blood Pressure) নিয়ন্ত্রণে রাখতে এবং হৃদপিণ্ড সুস্থ রাখতে সাহায্য করে",
      "লিভার ডিটক্স করতে এবং শরীর থেকে বিষাক্ত পদার্থ বের করে দিতে সহায়তা করে",
      "ব্যায়ামের আগে খেলে স্ট্যামিনা ও এনার্জি বৃদ্ধি পায় (Natural Pre-workout)",
      "ত্বকের উজ্জ্বলতা বাড়াতে এবং প্রাকৃতিকভাবে গোলাপি ভাব আনতে সাহায্য করে"
    ]
  },
  buyingReason: {
    heading: "<p>কেন আমাদের বিটরুট পাউডার বেছে নিবেন?</p>",
    steps: [
      "✅ সতেজ ও বাছাইকৃত বিটরুট থেকে বৈজ্ঞানিক পদ্ধতিতে শুকিয়ে প্রস্তুত",
      "🚫 কোনো প্রকার কৃত্রিম রঙ, ফ্লেভার বা চিনি মেশানো হয় না",
      "🌿 শতভাগ প্রাকৃতিক এবং পুষ্টিগুণে ভরপুর সুপারফুড",
      "💎 বাজারের সাধারণ পাউডারের চেয়ে কড়া রঙ এবং নিখুঁত স্বাদ"
    ]
  },
  shipping: {
    dhakaCity: 60,
    dhakaCityOuter: 100,
    outsideDhaka: 120
  },
  seo: {
    tag: [
      "বিটরুট পাউডার",
      "Beetroot Powder BD",
      "Organic Beetroot",
      "Blood Booster Food",
      "Natural Iron Supplement"
    ],
    description: "অর্গানিক প্রিমিয়াম বিটরুট পাউডার - রক্তস্বল্পতা দূর করতে এবং ত্বকের যত্নে সেরা সুপারফুড।"
  },
  productType: "regular",
  _id: "68af9b19a3e4342b55fa9f11",
  productName: "<p>প্বিটরুট পাউডার (Beetroot Powder)</p>",
  slug: "premium-beetroot-powder-khidmah-organic-2026",
  productImage: "https://i.ibb.co.com/VWkKs5GP/nuts3-clean.png",
  tagline: "<p>“প্রাকৃতিক শক্তিতে ভরপুর, রক্তস্বল্পতার সমাধানে সুপারফুড”</p>",
  quantity: 450,
  unit: "<p>২০০ গ্রাম</p>",
  prvPrice: 650,
  price: 520,
  hadith: "<p>“তোমাদের জন্য উত্তম চিকিৎসা হচ্ছে শিঙ্গা লাগানো এবং কাসত আল বাহরি।” (বিটরুট সরাসরি উল্লেখ নেই, তবে এটি একটি উত্তম ভেষজ হিসেবে গণ্য)</p>",
  category: {
    _id: "cat_superfood_006",
    categoryName: "অন্যান্য",
    categoryPhoto: "https://i.ibb.co.com/VWkKs5GP/nuts3-clean.png",
    slug: "superfood-collection",
    createdAt: "2025-08-04T16:56:41.378Z",
    updatedAt: "2025-08-04T16:56:41.378Z",
    __v: 0
  },
  sold: 145,
  __v: 0,
  variants: []
}
  
];