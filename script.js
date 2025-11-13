// Function to parse CSV data
function parseCSV(text) {
    const lines = text.trim().split('\n');
    // Skip the header row (first line)
    const urls = lines.slice(1).map(line => line.trim()).filter(line => line.length > 0);
    return urls;
}

// Function to extract domain name from URL for display
function getDomainName(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch (e) {
        return url;
    }
}

// Function to create a button element
function createLinkButton(url) {
    const button = document.createElement('a');
    button.className = 'link-button';
    button.href = url;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';

    const textSpan = document.createElement('span');
    textSpan.className = 'link-text';
    textSpan.textContent = getDomainName(url);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'link-icon';
    iconSpan.textContent = '→';

    button.appendChild(textSpan);
    button.appendChild(iconSpan);

    return button;
}

// Function to load and display links
async function loadLinks() {
    const loadingDiv = document.getElementById('loading');
    const container = document.getElementById('links-container');

    try {
        const response = await fetch('urls.csv');
        if (!response.ok) {
            throw new Error('Failed to load URLs');
        }

        const csvText = await response.text();
        const urls = parseCSV(csvText);

        // Hide loading message
        loadingDiv.style.display = 'none';

        // Create and append buttons for each URL
        urls.forEach(url => {
            const button = createLinkButton(url);
            container.appendChild(button);
        });

        // If no URLs found
        if (urls.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 40px;">No URLs found in the CSV file.</p>';
        }
    } catch (error) {
        loadingDiv.textContent = 'Error loading links: ' + error.message;
        console.error('Error:', error);
    }
}

// Load links when the page loads
document.addEventListener('DOMContentLoaded', loadLinks);
