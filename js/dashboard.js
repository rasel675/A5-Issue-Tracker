let allIssues = [];
let currentTab = 'all';
let searchTimer;

const priority = {high:'bg-red-100 text-red-600',medium: 'bg-yellow-100 text-yellow-600', low: 'bg-gray-100 text-gray-500'
};
const priorityBadge = {high:'bg-red-500',medium:'bg-yellow-500',low: 'bg-gray-500'
};
const labelColor = {
  bug:'bg-red-100 text-red-700 border border-red-200',
  enhancement: 'bg-green-100 text-green-700 border border-green-200',
  help: 'bg-orange-100 text-orange-700 border border-orange-200',
  good:'bg-blue-100 text-blue-700 border border-blue-200',
  doc:'bg-purple-100 text-purple-700 border border-purple-200',
  default: 'bg-gray-100 text-gray-700 border border-gray-200'
};
const labelIcon = {
  bug:'<i class="fa-solid fa-bug mr-1"></i>',
  enhancement: '<i class="fa-solid fa-bolt mr-1"></i>',
  help: '<i class="fa-solid fa-hands-helping mr-1"></i>',
  good:'<i class="fa-solid fa-thumbs-up mr-1"></i>',
  doc: '<i class="fa-solid fa-file-lines mr-1"></i>',
  default: '<i class="fa-solid fa-tag mr-1"></i>'
};



function getLabelKey(label) {
  const l = label.toLowerCase();
  if (l === 'bug') {
    return 'bug';
  }
  if (l.includes('enhancement')) {
    return 'enhancement';
  }
  if (l.includes('help')) {
    return 'help';
  }
  if (l.includes('good')) {
    return 'good';
  }
  if (l.includes('doc')) {
    return 'doc';
  }
  return 'default';
}


function getStatusIcon(status) {
  if (status === 'open') {
    return `<img src="assets/Open-Status.png" class="w-5 h-5" />`  ;
  } else {
    return `<img src="assets/Closed-Status.png" class="w-5 h-5" />`  ;
  }
}



function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
}


function renderCards(issues) {
  const grid = document.getElementById('issues-grid');
  if (issues.length === 0) {
    grid.innerHTML = `
    <div class="col-span-4 text-center py-20 text-gray-400">
    No issues found.
    </div>`;
    return;
  }

  grid.innerHTML = issues.map(issue => {
    let topBorder;
    if (issue.status === 'open') {
      topBorder = 'border-t-green-500';
    } else {
      topBorder = 'border-t-purple-500';
    }

    return `
      <div
        onclick="openModal(${issue.id})"
        class="bg-white rounded-xl border border-gray-200 border-t-4 ${topBorder} overflow-hidden cursor-pointer hover:shadow-md transition-shadow">

    <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            ${getStatusIcon(issue.status)}
            <span class="text-xs font-bold px-2 py-1 rounded-full ${priority[issue.priority] || priority.low}">
              ${issue.priority.toUpperCase()} </span>
          </div>
     <h3 class="font-semibold text-gray-900 text-sm mb-2 leading-snug">
            ${issue.title}</h3>
     <p class="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">
            ${issue.description} </p>

          <div class="flex flex-wrap gap-1 mb-3">
            ${issue.labels.map(l => {
              const key = getLabelKey(l);
              return `
                <span class="text-xs px-2 py-0.5 rounded-full font-medium ${labelColor[key]}">
                  ${labelIcon[key]}${l.toUpperCase()}
                </span>`;
            }).join('')} </div>

        <div class="border-t border-gray-100 pt-3">
            <p class="text-xs text-gray-500">#${issue.id} by ${issue.author}</p>
            <p class="text-xs text-gray-400">${formatDate(issue.createdAt)}</p>
          </div>

    </div>
      </div>`;
  }).join('');
}



function setTab(tab) {
    currentTab = tab;
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.tab-btn').forEach(btn => {
    const inactive = btn.dataset.inactive;
    const active = btn.dataset.active;
    btn.classList.remove(...active.split(' ')) ;
    btn.classList.add(...inactive.split(' '));
  });
  const activeBtn = document.getElementById(`tab-${tab}`);
  const inactive = activeBtn.dataset.inactive;
  const active = activeBtn.dataset.active;
  activeBtn.classList.remove(...inactive.split(' '));
  activeBtn.classList.add(...active.split(' '));
  applyFilter();
}



function applyFilter() {
  const grid = document.getElementById('issues-grid');
  const spinner = document.getElementById('spinner');
  grid.classList.add('hidden');
  spinner.classList.remove('hidden');

  setTimeout(() => {
    let filter;
    if (currentTab === 'all') {
      filter = allIssues;
    } else {
      filter = allIssues.filter(issue => issue.status === currentTab);
    }
    document.getElementById('issue-count-title').innerText = `${filter.length} Issues`
    ;
    renderCards(filter);
    spinner.classList.add('hidden');
    grid.classList.remove('hidden');
  }, 500);
}



function handleSearch() {
  clearTimeout(searchTimer);
  const q = document.getElementById('search-input').value.trim()
  ;
  if (!q) {
    applyFilter();
    return;
  }
  searchTimer = setTimeout(async () => {
    const results = await searchIssues(q);
    let filtered;
    if (currentTab === 'all') {
      filtered = results;
    } else {
      filtered = results.filter(issue => issue.status === currentTab) ;
    }

    document.getElementById('issue-count-title').innerText = `${filtered.length} Issues` ;
    renderCards(filtered);
  }, 350);
}



async function openModal(id) {
  const issue = await getSingleIssue(id);
  document.getElementById('modal-title').innerText = issue.title;
  document.getElementById('modal-desc').innerText = issue.description;
  
  if (issue.assignee) {
    document.getElementById('modal-assignee').innerText = issue.assignee;
  } else {
    document.getElementById('modal-assignee').innerText = 'Unassigned' ;
  }

  const isOpen = issue.status === 'open';
  const badge = document.getElementById('modal-status-badge');
  
  if (isOpen) {
    badge.innerText ='Opened' ;
  } else {
    badge.innerText ='Closed';
  }


  let badgeClass;
  if (isOpen) {
    badgeClass = badge.dataset.open;
  } else {
    badgeClass = badge.dataset.closed;
  }
  badge.className =`px-3 py-1 rounded-full text-white text-xs font-semibold ${badgeClass}`;


  let metaText;
  if (isOpen) {
    metaText = `Opened by ${issue.author} • ${formatDate(issue.createdAt)}`;
  } else {
    metaText =`Closed by ${issue.author} • ${formatDate(issue.createdAt)}`;
  }
  document.getElementById('modal-meta').innerText = metaText;
  document.getElementById('modal-priority').innerHTML = `
    <span class="px-3 py-1 rounded-full text-xs font-bold text-white ${priorityBadge[issue.priority] || 'bg-gray-500'}">
      ${issue.priority.toUpperCase()}
    </span>`;
  document.getElementById('modal-labels').innerHTML = issue.labels.map(l => {
    const key = getLabelKey(l);
    return `
      <span class="text-xs px-3 py-1 rounded-full font-medium ${labelColor[key]}">
        ${labelIcon[key]}${l.toUpperCase()}
      </span>`;
  }).join('');
  document.getElementById('issue-modal').showModal();
}


async function loadIssues() {
  allIssues = await getAllIssues();
  document.getElementById('spinner').classList.add('hidden');
  document.getElementById('issues-grid').classList.remove('hidden');
  document.getElementById('issue-count-title').innerText = `${allIssues.length} Issues`;
  renderCards(allIssues);
}

loadIssues();