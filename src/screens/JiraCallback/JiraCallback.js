import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { teamService } from 'services';

import { LocalStorageKey } from 'constants/localStorage';

import Loading from 'components/Loading';

function PageNotFound() {
  const history = useHistory();

  // todo: parse the code from the current url and send to server to get jiraToken and jiraSiteList then close current tab
  useEffect(() => {
    const getJiraCloudId = async () => {
      // jira callback our app with the url: /jira-callback?code=<code>&state=<roomName>-<teamId>
      const params = new URLSearchParams(history.location.search);
      const code = params.get('code');
      // send 'code' to server to get jira token and jira site list
      try {
        const jiraAccess = await teamService.getListSiteJira(code);
        localStorage.setItem(LocalStorageKey.JIRA_TOKEN, jiraAccess.jiraToken);
        localStorage.setItem(LocalStorageKey.JIRA_CREATE, new Date().getTime());
        // if jira site list have only one site assign this jiraSiteList[0].id and jiraSiteList[0].url to local storage
        // else assign this jiraSiteList to local storage and need to choice site when import
        if (jiraAccess.jiraSiteList.length === 1) {
          localStorage.setItem(LocalStorageKey.JIRA_CLOUD_ID, jiraAccess.jiraSiteList[0].id);
          localStorage.setItem(LocalStorageKey.JIRA_URL, jiraAccess.jiraSiteList[0].url);
        } else {
          localStorage.setItem(LocalStorageKey.JIRA_SITE_LIST, JSON.stringify(jiraAccess.jiraSiteList));
        }
        // close current tab
        window.opener = null;
        window.open('', '_self');
        window.close();
      } catch (error) {
        console.log(error);
      }
    };
    getJiraCloudId();
  }, []);

  return (
    <Loading fullScreen />
  );
}

export default PageNotFound;
