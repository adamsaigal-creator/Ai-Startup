import type { Metadata } from "next";
import { getMediaForPicker } from "@/lib/media/picker";
import { TeamMemberEditor, type TeamMemberFormValues } from "../TeamMemberEditor";

export const metadata: Metadata = {
  title: "Add Team Member — Saigal Realty Admin",
  robots: { index: false, follow: false },
};

const EMPTY: TeamMemberFormValues = {
  name: "",
  role: "",
  photo: "",
  languages: "",
  phone: "",
  email: "",
  bio: "",
  status: "draft",
  displayOrder: 0,
};

export default async function AdminNewTeamMemberPage() {
  const media = await getMediaForPicker();
  return <TeamMemberEditor mode="create" initial={EMPTY} media={media} />;
}
