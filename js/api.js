const API_ALL_ISSUES = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
const API_SINGLE_ISSUE = 'https://phi-lab-server.vercel.app/api/v1/lab/issue/';

const API_SEARCH = 'https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=';



async function getAllIssues() {
  const res = await fetch(API_ALL_ISSUES);
  const data = await res.json();
  return data.data || [];
}



async function getSingleIssue(id) {
  const res = await fetch(API_SINGLE_ISSUE + id);
  const data = await res.json();
  return data.data;
}



async function searchIssues(query) {
  const res = await fetch(API_SEARCH + encodeURIComponent(query));
  const data = await res.json();
  return data.data || [];
}