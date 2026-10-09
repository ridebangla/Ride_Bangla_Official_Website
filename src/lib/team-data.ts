export type TeamMember = {
  id: string;
  name: string;
  title: string;
  photo_url: string;
  facebook_url: string | null;
  instagram_url: string | null;
  x_url: string | null;
  whatsapp_number: string | null;
  wechat_id: string | null;
  bio?: {
    en: string;
    bn: string;
  };
};

export const leadership: TeamMember[] = [
  {
    id: "enamul-seddik",
    name: "Enamul Seddik",
    title: "Co-Founder & CEO",
    photo_url: "/assets/leadership/enamul-seddik.jpg",
    facebook_url: "https://www.facebook.com/share/14iDKweDHqr/",
    instagram_url: "https://www.instagram.com/ena.mul_?igsh=eGNvNm10aDc0dWF6",
    x_url: "https://x.com/enamulseddik",
    whatsapp_number: "+8801626633316",
    wechat_id: "enamul.seddik",
    bio: {
      en:
        "Enamul Seddik is a Co-Founder and the Chief Executive Officer of Ride Bangla. After returning to Bangladesh following a difficult period working abroad, he channelled that experience into building Ride Bangla from the ground up — starting with nothing more than a personal phone, a Facebook page and a clear vision for a homegrown delivery and services company. As CEO, he leads the company's overall vision, business strategy, product direction, technology roadmap and long-term growth, while overseeing executive decision-making, operations, financial and resource priorities, team development, compliance coordination and strategic partnerships. He has personally guided the planning and development of the Customer, Rider, Partner, Agent and Admin platforms, together with the official website and the wider digital ecosystem. His long-term objective is to build a sustainable Bangladesh-based technology company that creates meaningful earning and employment opportunities as the ecosystem expands across all 64 districts.",
      bn:
        "এনামুল সিদ্দিক Ride Bangla-এর একজন Co-Founder এবং Chief Executive Officer (CEO)। প্রবাসে কঠিন এক অভিজ্ঞতার পর দেশে ফিরে তিনি সেই অভিজ্ঞতাকে কাজে লাগিয়ে শূন্য থেকে Ride Bangla গড়ে তোলেন — একটি ব্যক্তিগত মোবাইল ফোন, একটি Facebook Page এবং একটি দেশীয় ডেলিভারি ও সার্ভিস কোম্পানি গড়ার স্পষ্ট স্বপ্ন নিয়ে। CEO হিসেবে তিনি প্রতিষ্ঠানের সামগ্রিক ভিশন, ব্যবসায়িক কৌশল, প্রোডাক্ট দিকনির্দেশনা, প্রযুক্তিগত রোডম্যাপ ও দীর্ঘমেয়াদি প্রবৃদ্ধির নেতৃত্ব দেন, পাশাপাশি নির্বাহী সিদ্ধান্ত গ্রহণ, অপারেশন, আর্থিক ও রিসোর্স অগ্রাধিকার, টিম ডেভেলপমেন্ট, কমপ্লায়েন্স সমন্বয় এবং কৌশলগত পার্টনারশিপ তদারকি করেন। তিনি ব্যক্তিগতভাবে Customer, Rider, Partner, Agent ও Admin প্ল্যাটফর্ম, অফিসিয়াল ওয়েবসাইট এবং বৃহত্তর ডিজিটাল ইকোসিস্টেমের পরিকল্পনা ও উন্নয়নে নেতৃত্ব দিয়েছেন। দীর্ঘমেয়াদে তার লক্ষ্য হলো এমন একটি টেকসই বাংলাদেশভিত্তিক প্রযুক্তি প্রতিষ্ঠান গড়ে তোলা, যা ইকোসিস্টেম সব ৬৪ জেলা জুড়ে বিস্তারের সঙ্গে সঙ্গে অর্থবহ আয় ও কর্মসংস্থানের সুযোগ তৈরি করবে।",
    },
  },
  {
    id: "emon-seddik",
    name: "Emon Seddik",
    title: "Co-Founder & Director",
    photo_url: "/assets/leadership/emon-seddik.jpg",
    facebook_url: "https://www.facebook.com/share/14gWYs5XrYE/",
    instagram_url: "https://www.instagram.com/emonrehman51?stkn=ZTI4bzA3MHNlNzZr",
    x_url: null,
    whatsapp_number: "+8801885002951",
    wechat_id: null,
    bio: {
      en:
        "Emon Seddik is a Co-Founder and the Director of Ride Bangla. Balancing his role at the company with his university studies, he brings hands-on discipline and quiet determination to the organization's day-to-day leadership, proving that ambition and impact are never limited by physical ability. As Director, he coordinates day-to-day organizational activities, supports operational planning and execution, maintains communication between teams, and works closely with partners, riders and agents to keep the network running smoothly. He also oversees internal administration and helps management implement approved business decisions, contributing to operational discipline, team coordination and consistent service quality. Working in close partnership with the Co-Founder & CEO, Emon plays a central role in turning Ride Bangla's vision into a dependable, everyday service for customers across Bangladesh.",
      bn:
        "ইমন সিদ্দিক Ride Bangla-এর একজন Co-Founder এবং Director। বিশ্ববিদ্যালয়ের পড়াশোনার পাশাপাশি প্রতিষ্ঠানের দায়িত্ব সামলে তিনি দৈনন্দিন নেতৃত্বে হাতে-কলমে নিষ্ঠা ও দৃঢ়তা নিয়ে আসেন, প্রমাণ করেন যে উচ্চাকাঙ্ক্ষা ও অবদান কখনোই শারীরিক সীমাবদ্ধতার দ্বারা আটকে থাকে না। Director হিসেবে তিনি দৈনন্দিন সাংগঠনিক কার্যক্রম সমন্বয় করেন, অপারেশনাল পরিকল্পনা ও বাস্তবায়নে সহায়তা করেন, বিভিন্ন টিমের মধ্যে যোগাযোগ বজায় রাখেন এবং নেটওয়ার্ক সচল রাখতে পার্টনার, রাইডার ও এজেন্টদের সঙ্গে ঘনিষ্ঠভাবে কাজ করেন। এছাড়াও তিনি অভ্যন্তরীণ প্রশাসনিক কার্যক্রম তদারকি করেন এবং ব্যবস্থাপনাকে অনুমোদিত ব্যবসায়িক সিদ্ধান্ত বাস্তবায়নে সহায়তা করেন, যা অপারেশনাল শৃঙ্খলা, টিম সমন্বয় ও ধারাবাহিক সার্ভিস কোয়ালিটি বজায় রাখতে সহায়ক হয়। Co-Founder & CEO-এর সঙ্গে ঘনিষ্ঠভাবে কাজ করে ইমন Ride Bangla-এর ভিশনকে বাংলাদেশজুড়ে গ্রাহকদের জন্য একটি নির্ভরযোগ্য দৈনন্দিন সার্ভিসে রূপান্তরে গুরুত্বপূর্ণ ভূমিকা পালন করেন।",
    },
  },
  {
    id: "obayedur-rahman-shaikh",
    name: "Obayedur Rahman Shaikh",
    title: "Co-Founder & Marketing Director",
    photo_url: "/assets/leadership/obayedur-rahman-shaikh.jpg",
    facebook_url: "https://www.facebook.com/share/1DhQcdkysb/",
    instagram_url: "https://www.instagram.com/obayedurrahmanshaikh?stkn=MTlvMm5weXlvczdnZg==",
    x_url: null,
    whatsapp_number: "+8801675514786",
    wechat_id: null,
    bio: {
      en:
        "Obayedur Rahman Shaikh is the Co-Founder & Marketing Director of Ride Bangla. He leads the company's marketing direction — shaping how Ride Bangla builds brand awareness, strengthens its institutional marketing partnerships and reaches new customers across Bangladesh. As Marketing Director, he is responsible for planning and driving the strategies that take the business forward, working closely with the founding team to turn Ride Bangla's growth vision into consistent, on-the-ground market presence. His focus stays on building a brand that people in every district come to recognise and trust as Ride Bangla continues to expand.",
      bn:
        "ওবায়েদুর রহমান শেখ Ride Bangla-এর Co-Founder & Marketing Director। তিনি প্রতিষ্ঠানের মার্কেটিং দিকনির্দেশনার নেতৃত্ব দেন — Ride Bangla কীভাবে ব্র্যান্ড অ্যাওয়ারনেস গড়ে তুলবে, প্রাতিষ্ঠানিক মার্কেটিং পার্টনারশিপ মজবুত করবে এবং বাংলাদেশজুড়ে নতুন গ্রাহকদের কাছে পৌঁছাবে — সেই কাজগুলো তিনি দেখভাল করেন। Marketing Director হিসেবে ব্যবসাকে সামনের দিকে এগিয়ে নেওয়ার কৌশল পরিকল্পনা ও বাস্তবায়নের দায়িত্ব তার, এবং প্রতিষ্ঠাতা দলের সঙ্গে ঘনিষ্ঠভাবে কাজ করে তিনি Ride Bangla-এর প্রবৃদ্ধির ভিশনকে মাঠ পর্যায়ে ধারাবাহিক উপস্থিতিতে রূপ দেন। তার লক্ষ্য থাকে এমন একটি ব্র্যান্ড গড়ে তোলা, যাকে Ride Bangla-এর সম্প্রসারণের সাথে সাথে প্রতিটি জেলার মানুষ চিনবে এবং বিশ্বাস করবে।",
    },
  },
  {
    id: "tabassum-nisha",
    name: "Tabassum Nisha",
    title: "IT Team Director",
    photo_url: "/assets/leadership/tabassum-nisha.jpg",
    facebook_url: "https://www.facebook.com/ridebanglait0",
    instagram_url: null,
    x_url: null,
    whatsapp_number: "+8801825234644",
    wechat_id: null,
    bio: {
      en:
        "Tabassum Nisha is the IT Team Director of Ride Bangla. She leads and directs all technology work across the Ride Bangla ecosystem — every website, app, and digital platform is built under her direction. Her leadership drives the company's technology vision, from development to deployment, ensuring world-class digital experiences for millions of users.",
      bn:
        "তাবাসসুম নিশা রাইড বাংলার আইটি টিম ডিরেক্টর। তিনি রাইড বাংলা ইকোসিস্টেমের সমস্ত প্রযুক্তিগত কাজের নেতৃত্ব ও দিকনির্দেশনা দেন — প্রতিটি ওয়েবসাইট, অ্যাপ এবং ডিজিটাল প্ল্যাটফর্ম তাঁর নির্দেশনায় তৈরি হয়। তাঁর নেতৃত্ব কোম্পানির প্রযুক্তি ভিশনকে এগিয়ে নিয়ে যায়, ডেভেলপমেন্ট থেকে ডিপ্লয়মেন্ট পর্যন্ত, লক্ষ লক্ষ ব্যবহারকারীর জন্য বিশ্বমানের ডিজিটাল অভিজ্ঞতা নিশ্চিত করে।",
    },
  },

];
