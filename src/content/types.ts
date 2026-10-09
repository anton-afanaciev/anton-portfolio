export interface Copy {
 nav: readonly { id: string; label: string }[];
 name: string; firstName: string; lastName: string; role: string; intro: string; heroSlogan: readonly [string, string];
 ui: { light: string; dark: string; menu: string; close: string; skip: string; motion: string; photo: string; photoLater: string; projects: string; contact: string; back: string };
 about: { label: string; title: string; text: string };
 skills: { label: string; title: string; text: string; items: Record<'web'|'api'|'mobile'|'infra'|'ai',string>; tools: Record<string,{title:string;description:string}> };
 directions: { label: string; title: string; items: Record<'api'|'web-mobile'|'logs'|'scenarios'|'releases',string>; descriptions: Record<'api'|'web-mobile'|'logs'|'scenarios'|'releases',string> };
 projects: { label: string; title: string; text: string; statuses: Record<'development',string>; items: Record<string,{title:string;description:string}>; categories: Record<'all'|'web'|'ai'|'qa',string>; filterLabel: string; empty: string; count: string; links: Record<'site'|'source',string> };
 hobbies: { label: string; title: string; text: string; credit: string; unavailable: string; items: Record<'swim'|'football'|'enduro',{title:string;note:string}> };
 contacts: { label: string; title: string; text: string };
 footer: string;
 labels: { home: string; navigation: string; space: string; visualTag: string; detail: string; scroll: string; projectCode: string; projectCredit: string; roleQa: string; roleAi: string };
}


