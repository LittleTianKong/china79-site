import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <ContactPageClient deliveryEnabled={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)} />;
}
