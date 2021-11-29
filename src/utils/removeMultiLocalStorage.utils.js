import { LocalStorageKey } from 'constants/localStorage';

export const removeMultiLocalStorage = (array) => {
  array.forEach((element) => {
    localStorage.removeItem(element);
  });
};

export const removeMultiJiraLocalStorage = () => {
  removeMultiLocalStorage([
    LocalStorageKey.JIRA_CLOUD_ID,
    LocalStorageKey.JIRA_TOKEN,
    LocalStorageKey.JIRA_URL,
    LocalStorageKey.JIRA_SITE_LIST,
    LocalStorageKey.JIRA_CREATE,
  ]);
};
