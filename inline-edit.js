// Inline editing functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add edit mode toggle button to the config panel
    const configPanel = document.getElementById('config-panel');
    if (!configPanel) return;

    const editButton = document.createElement('button');
    editButton.id = 'edit-mode-toggle';
    editButton.innerHTML = '✏️ Edit Mode';
    editButton.style.cssText = `
        display: block;
        width: 100%;
        margin-top: 10px;
        padding: 8px 12px;
        background: var(--accent, #00ffee);
        color: #111;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    configPanel.appendChild(editButton);

    let editMode = false;
    let editableElements = new Set();

    // Add save feedback function at the top level
    function showSaveFeedback(element) {
        const feedback = document.createElement('div');
        feedback.textContent = '✓ Saved';
        feedback.style.cssText = `
            position: absolute;
            top: -25px;
            right: -10px;
            background: var(--accent, #00ffee);
            color: #111;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            z-index: 10000;
        `;
        element.style.position = 'relative';
        element.appendChild(feedback);

        // Trigger animation
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        });

        // Remove feedback after animation
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(10px)';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    // Function to make elements editable
    function makeElementsEditable(elements) {
        elements.forEach(el => {
            if (editMode) {
                el.classList.add('editable');
                editableElements.add(el);
            } else {
                el.classList.remove('editable');
                editableElements.delete(el);
            }
        });
    }

    // Function to update modal content editability
    function updateModalEditability() {
        const modal = document.getElementById('projectModal');
        if (modal && modal.classList.contains('active')) {
            makeElementsEditable(modal.querySelectorAll('h2, h3, h4, p, li, .tech-stack span'));
        }
    }

    // Toggle edit mode
    editButton.addEventListener('click', () => {
        editMode = !editMode;
        editButton.style.background = editMode ? '#ff4444' : 'var(--accent, #00ffee)';
        editButton.innerHTML = editMode ? '✏️ Exit Edit Mode' : '✏️ Edit Mode';
        
        // Make regular content editable
        makeElementsEditable(document.querySelectorAll('h1, h2, h3, h4, p, li, .moon-content h4, .moon-content p, .blog-title, .blog-excerpt'));
        
        // Update modal content editability
        updateModalEditability();
    });

    // Handle moon interactions
    document.addEventListener('contextmenu', (e) => {
        const moon = e.target.closest('.moon');
        if (!moon || !editMode) return;

        // Prevent default context menu
        e.preventDefault();

        // Handle moon content editing
        const moonContent = moon.querySelector('.moon-content');
        if (moonContent) {
            // Get the specific element that was clicked
            const clickedElement = e.target.closest('h4, p');
            if (clickedElement && editableElements.has(clickedElement)) {
                editElement(clickedElement);
            } else {
                // If clicked on moon content but not a specific element, show a menu
                const rect = moonContent.getBoundingClientRect();
                const menu = document.createElement('div');
                menu.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    background: rgba(0, 0, 0, 0.9);
                    border: 1px solid var(--accent, #00ffee);
                    border-radius: 4px;
                    padding: 8px 0;
                    z-index: 10000;
                    min-width: 150px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                `;

                const heading = moonContent.querySelector('h4');
                const subheading = moonContent.querySelector('p');

                if (heading && editableElements.has(heading)) {
                    const headingOption = document.createElement('div');
                    headingOption.textContent = 'Edit Title';
                    headingOption.style.cssText = `
                        padding: 8px 12px;
                        cursor: pointer;
                        color: #fff;
                        transition: background 0.2s;
                    `;
                    headingOption.onmouseover = () => headingOption.style.background = 'rgba(0, 255, 238, 0.1)';
                    headingOption.onmouseout = () => headingOption.style.background = '';
                    headingOption.onclick = () => {
                        editElement(heading);
                        menu.remove();
                    };
                    menu.appendChild(headingOption);
                }

                if (subheading && editableElements.has(subheading)) {
                    const subheadingOption = document.createElement('div');
                    subheadingOption.textContent = 'Edit Description';
                    subheadingOption.style.cssText = `
                        padding: 8px 12px;
                        cursor: pointer;
                        color: #fff;
                        transition: background 0.2s;
                    `;
                    subheadingOption.onmouseover = () => subheadingOption.style.background = 'rgba(0, 255, 238, 0.1)';
                    subheadingOption.onmouseout = () => subheadingOption.style.background = '';
                    subheadingOption.onclick = () => {
                        editElement(subheading);
                        menu.remove();
                    };
                    menu.appendChild(subheadingOption);
                }

                // Close menu when clicking outside
                const closeMenu = (e) => {
                    if (!menu.contains(e.target)) {
                        menu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                };
                document.addEventListener('click', closeMenu);

                document.body.appendChild(menu);
            }
        }
    });

    // Handle regular moon clicks (for modal)
    document.addEventListener('click', (e) => {
        const moon = e.target.closest('.moon');
        if (!moon || editMode) return; // Skip if in edit mode

        const projectId = moon.getAttribute('data-project');
        if (projectId) {
            showProjectModal(projectId);
        }
    });

    // Handle double-click to edit for non-moon elements
    document.addEventListener('dblclick', (e) => {
        if (!editMode) return;
        
        const target = e.target;
        if (!editableElements.has(target)) return;

        // Skip if it's a moon (handled by contextmenu)
        if (target.closest('.moon')) return;

        editElement(target);
    });

    // Function to handle element editing
    function editElement(target) {
        // Create input element
        const input = document.createElement('textarea');
        input.value = target.textContent;
        input.style.cssText = `
            width: 100%;
            min-height: 100px;
            padding: 8px;
            margin: 0;
            border: 2px solid var(--accent, #00ffee);
            border-radius: 4px;
            background: rgba(0,0,0,0.8);
            color: #fff;
            font-family: inherit;
            font-size: inherit;
            resize: vertical;
            z-index: 10000;
        `;

        // Replace element with input
        const originalContent = target.textContent;
        target.textContent = '';
        target.appendChild(input);
        input.focus();

        function saveEdit() {
            const newContent = input.value.trim();
            if (newContent && newContent !== originalContent) {
                target.textContent = newContent;
                // Save to localStorage with a more specific key
                const key = `content_${target.id || target.className}_${Array.from(target.classList).join('_')}_${target.closest('.modal-content') ? 'modal' : 'page'}`;
                localStorage.setItem(key, newContent);
                // Show save feedback
                showSaveFeedback(target);
            } else {
                target.textContent = originalContent;
            }
        }

        // Save on blur or Enter key
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                input.blur();
            }
        });
    }

    // Add loadSavedContent function
    function loadSavedContent() {
        // Load regular content
        document.querySelectorAll('h1, h2, h3, h4, p, li, .moon-content h4, .moon-content p, .blog-title, .blog-excerpt')
            .forEach(el => {
                const key = `content_${el.id || el.className}_${Array.from(el.classList).join('_')}_${el.closest('.modal-content') ? 'modal' : 'page'}`;
                const savedContent = localStorage.getItem(key);
                if (savedContent) {
                    el.textContent = savedContent;
                }
            });

        // Load modal content when modal opens
        const modal = document.getElementById('projectModal');
        if (modal) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class' && modal.classList.contains('active')) {
                        modal.querySelectorAll('h2, h3, h4, p, li, .tech-stack span')
                            .forEach(el => {
                                const key = `content_${el.id || el.className}_${Array.from(el.classList).join('_')}_modal`;
                                const savedContent = localStorage.getItem(key);
                                if (savedContent) {
                                    el.textContent = savedContent;
                                }
                            });
                    }
                });
            });
            observer.observe(modal, { attributes: true });
        }
    }

    // Call loadSavedContent on page load and visibility change
    loadSavedContent();
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            loadSavedContent();
        }
    });
}); 