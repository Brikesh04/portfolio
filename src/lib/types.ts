export interface TranslationDict {
  [key: string]: string;
}

export interface Settings {
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  photo_url: string;
  translations: {
    en: TranslationDict;
    fr: TranslationDict;
    [key: string]: TranslationDict;
  };
}

export interface Project {
  id: string;
  title: string;
  desc_en: string;
  desc_fr: string;
  category_en: string;
  category_fr: string;
  year: string;
  tags: string[];
  img: string;
  date: string;
  images: string[];
}
