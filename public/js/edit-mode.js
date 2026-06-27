(function() {
  console.log('✏️ Visual Edit Mode activated.');

  // Inject CSS styles for the edit mode toolbar
  const style = document.createElement('style');
  style.innerHTML = `
    .edit-mode-toolbar {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 16px 20px;
      color: #fff;
      font-family: 'Inter', -apple-system, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      width: 320px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .edit-mode-toolbar h3 {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #ff3344;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .edit-mode-toolbar p {
      font-size: 11px;
      color: #aaa;
      margin: 0;
      line-height: 1.4;
    }
    .edit-mode-toolbar select, .edit-mode-toolbar input {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      color: #fff;
      padding: 6px 10px;
      font-size: 12px;
      outline: none;
      width: 100%;
    }
    .edit-mode-toolbar select:focus, .edit-mode-toolbar input:focus {
      border-color: #ff3344;
    }
    .edit-mode-btn {
      background: #ff3344;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 10px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s ease, transform 0.1s ease;
    }
    .edit-mode-btn:hover {
      background: #ff5566;
    }
    .edit-mode-btn:active {
      transform: scale(0.98);
    }
    .edit-mode-field-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #888;
      margin-bottom: 2px;
    }
    [contenteditable="true"]:focus {
      outline: 2px solid #ff3344 !important;
      background: rgba(255, 51, 68, 0.05);
    }
  `;
  document.head.appendChild(style);

  // Render floating toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'edit-mode-toolbar';
  


  toolbar.innerHTML = `
    <h3>✏️ Visual Edit Mode</h3>
    <p>All translation blocks are outlined. Click any block directly to type and edit. Use the controls below to edit general details and save.</p>
    


    <div>
      <div class="edit-mode-field-label">Contact Email</div>
      <input type="text" id="edit-email-field" value="${window.__SETTINGS.email || ''}">
    </div>

    <div>
      <div class="edit-mode-field-label">LinkedIn URL</div>
      <input type="text" id="edit-linkedin-field" value="${window.__SETTINGS.linkedin_url || ''}">
    </div>

    <div>
      <div class="edit-mode-field-label">GitHub URL</div>
      <input type="text" id="edit-github-field" value="${window.__SETTINGS.github_url || ''}">
    </div>

    <button id="edit-save-btn" class="edit-mode-btn">Save Changes</button>
  `;

  document.body.appendChild(toolbar);



  // Handle Save
  document.getElementById('edit-save-btn').addEventListener('click', async function() {
    const saveBtn = this;
    saveBtn.innerText = 'Saving...';
    saveBtn.disabled = true;

    try {
      const email = document.getElementById('edit-email-field').value.trim();
      const linkedin_url = document.getElementById('edit-linkedin-field').value.trim();
      const github_url = document.getElementById('edit-github-field').value.trim();

      // Scrape translations from page
      const currentLangMap = window.__SETTINGS.translations['en'] || {};

      document.querySelectorAll('[data-edit-key]').forEach(el => {
        const key = el.getAttribute('data-edit-key');
        // Retrieve text content safely
        currentLangMap[key] = el.innerHTML;
      });

      // Update global configuration
      window.__SETTINGS.email = email;
      window.__SETTINGS.linkedin_url = linkedin_url;
      window.__SETTINGS.github_url = github_url;
      window.__SETTINGS.translations['en'] = currentLangMap;

      // POST to Express API
      const res = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.__SETTINGS)
      });

      if (res.ok) {
        saveBtn.innerText = 'Saved! Refreshing...';
        setTimeout(() => {
          // Refresh page with edit mode enabled
          window.location.reload();
        }, 1000);
      } else {
        throw new Error('Failed to post changes to server');
      }

    } catch (err) {
      console.error(err);
      alert('Error saving changes: ' + err.message);
      saveBtn.innerText = 'Save Changes';
      saveBtn.disabled = false;
    }
  });

})();
