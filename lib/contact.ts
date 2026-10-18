export const contactTopics = ["general", "datasets", "research", "interviews", "corrections"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const contactSubject: Record<ContactTopic, string> = {
  general: "General inquiry",
  datasets: "Dataset inquiry",
  research: "Research submission",
  interviews: "Interview suggestion",
  corrections: "Source suggestion or correction",
};

export type ContactMessage = {
  topic: ContactTopic;
  name: string;
  email: string;
  organization: string;
  message: string;
};

export function formatContactMessage(data: ContactMessage) {
  return [
    `Topic: ${contactSubject[data.topic]}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.organization ? [`Organization: ${data.organization}`] : []),
    "",
    data.message,
  ].join("\n");
}
