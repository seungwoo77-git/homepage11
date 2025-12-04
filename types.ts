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
  activities: string[];
}
