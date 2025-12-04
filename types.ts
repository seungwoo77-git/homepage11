export enum UserCategory {
  STUDY = 'STUDY',
  RECLUSE = 'RECLUSE',
  RESTING = 'RESTING'
}

export interface CategoryConfig {
  id: UserCategory;
  label: string;
  description: string;
  themeColor: string;
  iconName: string;
  activities: string[]; // Added specific activities for the tracker
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}