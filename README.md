# 🕊️ Memorially

Memorially is a modern, compassionate platform for creating beautiful tribute pages in memory of loved ones. Users can easily build a memorial by entering details, sharing a tribute, uploading photos, and optionally allowing RSVPs or livestreams.

> “A simple way to remember, share, and celebrate life.”

---

## 🧠 Purpose

Memorially is designed to streamline the process of creating a virtual memorial. It's built to be accessible for families, caregivers, and communities, enabling them to:
- Share a tribute and photo
- Set a memorial date and location (in-person or streamed)
- Allow RSVPs and messages
- Guide users step-by-step through a simple form flow

---

## 🛠 Tech Stack

| Layer         | Tech/Tool                     |
|--------------|--------------------------------|
| Frontend     | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling      | [Tailwind CSS](https://tailwindcss.com/) + `tw-animate-css` |
| UI Components| [shadcn/ui](https://ui.shadcn.com) |
| Forms        | [React Hook Form](https://react-hook-form.com/) |
| Backend      | [Firebase](https://firebase.google.com/) - Firestore & Storage |
| Hosting      | [Vercel](https://vercel.com/) |
| Icons        | [Lucide](https://lucide.dev/) |
| Fonts        | [Geist](https://vercel.com/font) |

---

## ⚙️ Features

- 🧾 Step-by-step memorial creation flow
- 💡 Smooth and responsive design

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Firebase project configured with Firestore and (optionally) Storage
- `.env.local` with your Firebase keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
