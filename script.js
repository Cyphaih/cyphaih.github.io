// ===== Page Navigation =====
const navButtons = document.querySelectorAll('.nav-button');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const pageId = `${e.currentTarget.dataset.page}-page`;
        navigateToPage(pageId);
    });
});

function navigateToPage(pageId) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Close detail panel if open
        closeDetailPanel();
    }
}

// Initialize with work page
document.addEventListener('DOMContentLoaded', () => {
    navigateToPage('work-page');
});

const frontButton = document.getElementById('front-video');
frontButton.addEventListener('click', () => {
    openDetailPanel(1);
})



// ===== Work Card Selection & Detail Panel =====
const workCards = document.querySelectorAll('.work-card');
const detailPanel = document.getElementById('detail-panel');
const panelOverlay = document.getElementById('panel-overlay');
const panelClose = document.getElementById('panel-close');
const detailPanelTitle = document.getElementById('detail-panel-title');
const detailPanelDescription = document.getElementById('detail-panel-description');



workCards.forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = e.currentTarget.dataset.id;
        openDetailPanel(projectId);
    });
})
/*
workCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const projectId = e.currentTarget.dataset.id;
        openDetailPanel(projectId);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const projectId = e.currentTarget.dataset.id;
            openDetailPanel(projectId);
        }
    });
});
*/


function openDetailPanel(projectId) {
    const card = document.querySelector(`[data-id="${projectId}"]`);
    const title = card.querySelector('.work-card-title').textContent;
    const description = card.querySelector('.work-card-description').textContent;

    const template = document.getElementById(projectId);
    const panelContent = document.getElementById('detail-panel-body');

   
    
    detailPanelTitle.textContent = title;
    detailPanelDescription.textContent = description;

    panelContent.innerHTML = '';
    const clone = template.content.cloneNode(true);
    panelContent.appendChild(clone);
    
    
    detailPanel.classList.add('active');
    panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetailPanel() {
    detailPanel.classList.remove('active');
    panelOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close panel with back button
panelClose.addEventListener('click', closeDetailPanel);

// Close panel when clicking overlay
panelOverlay.addEventListener('click', closeDetailPanel);

// Close panel with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailPanel.classList.contains('active')) {
        closeDetailPanel();
    }
});

// ===== Tab Navigation =====
const tabButtons = document.querySelectorAll('.tab-button');

tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const tabId = e.target.dataset.tab;
        switchTab(tabId);
    });

    // Keyboard accessibility
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
        }
    });
});

function switchTab(tabId) {
    
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    const activeContent = document.querySelector(`.tab-content#${tabId}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

switchTab('skills');

detailPanel.addEventListener('click', (e) => {
    e.stopPropagation();
});

