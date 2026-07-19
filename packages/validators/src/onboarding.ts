import { z } from "zod";

export const onboardingProfileSchema = z.object({
  displayName: z.string().min(2, "Display name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes"),
  avatar: z.string().optional(),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  country: z.string().min(1, "Please select a country"),
  timezone: z.string().min(1, "Please select a timezone"),
});

export const onboardingWorkspaceSchema = z.object({
  name: z.string().min(2, "Workspace name is required"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  icon: z.string().optional(),
  theme: z.enum(["blue", "purple", "green", "orange", "neutral"]),
  type: z.enum(["Personal", "Startup", "Company", "Education", "Open Source"]),
});

export const onboardingPreferencesSchema = z.object({
  preferredIde: z.string().optional(),
  theme: z.enum(["Dark", "OLED", "Light"]),
  editorFont: z.enum(["JetBrains Mono", "Fira Code", "Geist Mono", "Cascadia Code"]),
  tabSize: z.number().min(2).max(8),
  fontSize: z.number().min(10).max(24),
  autoSave: z.boolean(),
  wordWrap: z.boolean(),
  miniMap: z.boolean(),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  frameworks: z.array(z.string()),
  aiEnabled: z.boolean(),
  gitIntegration: z.boolean(),
  telemetry: z.boolean(),
  notifications: z.boolean(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["Owner", "Admin", "Developer", "Viewer"]),
});

export const onboardingTeamSchema = z.object({
  invites: z.array(inviteMemberSchema),
});

export type OnboardingProfileInput = z.infer<typeof onboardingProfileSchema>;
export type OnboardingWorkspaceInput = z.infer<typeof onboardingWorkspaceSchema>;
export type OnboardingPreferencesInput = z.infer<typeof onboardingPreferencesSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type OnboardingTeamInput = z.infer<typeof onboardingTeamSchema>;
