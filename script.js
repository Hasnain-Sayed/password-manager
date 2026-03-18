let siteInput = document.getElementById('siteInput');
let passInput = document.getElementById('passInput');
let entryForm = document.getElementById('entryForm');
let vaultList = document.getElementById('vaultList');
let toggleInput = document.getElementById('toggleInput');
let vaultCount = document.getElementById('countDisplay');

let sites = []

function saveSites() {
    localStorage.setItem('websites', JSON.stringify(sites))
}


function listEntries() {
    sites = JSON.parse(localStorage.getItem('websites')) || [];
    if (sites.length === 0) {
        vaultList.innerHTML = `<li class="empty-state"><span class="empty-icon">🗝️</span>No entries yet. Add Your First Entry!</li>`;
        vaultCount.textContent = '0';
        return;
    }

    vaultCount.textContent = sites.length;

   let listItems = sites.map((site) => {
        return `
        <li id="${site.id}" class="list-item">
            <div class="list-item-info">
                <div class="list-field">
                    <span class="list-label">Website</span>
                    <span class="list-value">${site.value}</span>
                </div>
                <div class="list-field">
                    <span class="list-label">Password</span>
                    <span class="list-value password-text" id="pass-${site.id}">${'•'.repeat(site.password.length)}</span>
                </div>
            </div>
            <div class="list-actions">
                <button type="button" class="toggle-pass-btn" onclick="togglePass('${site.id}', '${site.password}', this)">👁</button>
                <button onclick="deleteSite('${site.id}')">Delete</button>
            </div>
        </li>`;
    });

    vaultList.innerHTML = listItems.join('');
}

function togglePass(id, password, btn) {
    let passSpan = document.getElementById(`pass-${id}`);
    if (passSpan.textContent === '•'.repeat(password.length)) {
        passSpan.textContent = password;
        btn.textContent = '🙈';
    } else {
        passSpan.textContent = '•'.repeat(password.length);
        btn.textContent = '👁';
    }
}

function toggleInputPass(){
    
    if(passInput.type === 'password'){
        passInput.type = 'text';
        toggleInput.textContent = '🙈';
    }else{
        passInput.type = 'password';
        toggleInput.textContent = '👁';
    }   
}

function deleteSite(id) {
    console.log('Deleting site with ID: ', id);
    confirm('Are you sure you want to delete this entry?') && (sites = sites.filter(site => site.id !== id));
    saveSites();
    console.log('Updated sites after deletion: ', sites);
    listEntries();
}

function existingCheck(){
    let site = siteInput.value.trim();
    let password = passInput.value.trim();
    console.log('Checking for existing entries...');
    
    if (sites.length === 0) {
        console.log('2 hoye')
        addSite();
    }
    else{
        const duplicate = sites.some(entry => entry.value === site && entry.password === password);
            console.log('hoye')
            if (duplicate){
                alert('This site and password combination already exists in your vault!');
                console.log('Duplicate found: ', entry);
                return;
            }else{
                console.log('Not a duplicate, adding site...');
                addSite();
            }
    }
}

function addSite() {
    try {
        let site = siteInput.value.trim();
        let pass = passInput.value.trim();
        if (site.length <= 3 || typeof (site) !== 'string') {
            alert('Please enter a valid site name');
        } else if (pass.length <= 3 || pass.length > 14) {
            alert('Password must be between 3 and 14 characters');
        } else{
        if (site && pass) {
            console.log(`Site: ${site}, Password: ${pass}`);
            let uniqueId = Date.now() + Date.now() * Math.random();
            uniqueId = uniqueId.toString().slice(0, 5);
            console.log('Unique ID: ', uniqueId);
            
            sites.unshift({
                id: uniqueId,
                value: site,
                password: pass
            })
            
            saveSites()
            listEntries()
            siteInput.value = ''
            passInput.value = ''
        }
        }
    } catch (error) {
        console.error(error)
        
    }
}
listEntries()
entryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');
    existingCheck();

})


function github(){
    window.open('https://github.com/Hasnain-Sayed/password-manager.git', '_blank');
}