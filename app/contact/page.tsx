import ContactPageClient from "@/components/ContactPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact China79 Initiative to ask about U.S.–China datasets, submit research, suggest an interview guest, or share a source or correction.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient deliveryEnabled={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)} />;
}
