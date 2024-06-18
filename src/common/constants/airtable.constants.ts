export const AIRTABLE_TABLES = {
  TEAMS: 'teams',
} as const;

export type AirtableConfig = keyof typeof AIRTABLE_TABLES;
