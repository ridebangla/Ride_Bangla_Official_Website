<div align="center">
  <img src="public/assets/logo.png" alt="Ride Bangla" width="110" />
  <h1>Ride Bangla Connect</h1>
  <p><strong>Official bilingual corporate website for the Ride Bangla digital ecosystem</strong></p>

  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
  ![Firebase](https://img.shields.io/badge/Firebase-Real--time-FFCA28?logo=firebase&logoColor=111)
  ![Languages](https://img.shields.io/badge/Languages-English%20%7C%20বাংলা-16A34A)
  ![Responsive](https://img.shields.io/badge/Responsive-All%20Screens-0EA5E9)
</div>

## Ride Bangla ecosystem

Ride Bangla Connect presents the complete official ecosystem: Customer, Partner, Rider, Agent, Admin Console, Marketplace, Courier, Food Delivery, Ride Bangla Studio and Ride Bangla Pay services.

## Main features

- English and বাংলা language foundation with saved user preference; static-page Bengali copy is being completed
- Firestore-powered real-time website updates
- Working notification bell with unread state
- Separate replaceable assets for every ecosystem app
- Responsive layouts for phones, tablets, laptops, desktops, ultrawide displays and smart TVs
- Leadership profiles for Enamul Seddik and Emon Seddik
- Existing policy, support, contact, app, service and update pages retained
- Google AdSense support through `public/ads.txt`
- Firebase contact, subscriber, update comment and update like flows

## App logo paths

```text
public/assets/apps/customer.png
public/assets/apps/partner.png
public/assets/apps/rider.png
public/assets/apps/agent.png
public/assets/apps/admin-console.png
public/assets/apps/pay.png
```

Leadership images:

```text
public/assets/leadership/enamul-seddik.png
public/assets/leadership/emon-seddik.png
```

Replace the image at the same path without changing the file name.

## Firebase update document

Collection: `website_updates`

```ts
{
  title_en: "New Ride Bangla update",
  title_bn: "নতুন Ride Bangla আপডেট",
  excerpt_en: "English summary",
  excerpt_bn: "বাংলা সারসংক্ষেপ",
  body_en: "English details",
  body_bn: "বাংলা বিস্তারিত",
  category: "Announcement",
  published: true,
  published_at: serverTimestamp()
}
```

A published document appears in the Updates page and the notification bell through a Firestore real-time listener.

## Environment variables

Copy `.env.example` to `.env.local` and provide the official Firebase values.

## Quality verification

See `AUDIT_REPORT.md` for the verified fixes and the remaining content/configuration requirements.

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Ownership

Copyright © Ride Bangla. All rights reserved. This repository and its brand assets are proprietary Ride Bangla property.
