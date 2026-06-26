document.addEventListener('DOMContentLoaded', () => {
    // Upgraded base data arrays with foundational course concepts preloaded
    let masterDatabase = [
        {
            title: "VON NEUMANN ARCHITECTURE",
            course: "System Architecture",
            details: "[MANUAL CONTENT]: Core concept where data and instruction signals share the same structural memory bus infrastructure, creating an execution delay bottleneck.\n\n[WEB SOURCE INSIGHTS]: The Von Neumann architecture is a design framework for an electronic digital computer with subsystems consisting of a processing unit, a control unit, memory, mass storage, and I/O mechanisms."
        },
        {
            title: "BOOLEAN ALGEBRA",
            course: "Digital Logic Design",
            details: "[MANUAL CONTENT]: Fictional logic systems managing standard 0 and 1 digital logic structures.\n\n[WEB SOURCE INSIGHTS]: Boolean algebra is the branch of algebra in which the values of the variables are the truth values true and false, usually denoted 1 and 0 respectively."
        }
    ];

    const searchInput = document.getElementById('searchInput');
    const resultsEngine = document.getElementById('resultsEngine');
    const manualInput = document.getElementById('manualInput');
    const parseBtn = document.getElementById('parseBtn');

    // UI Rendering Engine
    function runSearch(queryText) {
        resultsEngine.innerHTML = '';
        const cleanQuery = queryText.toLowerCase().trim();

        if (cleanQuery === '') {
            resultsEngine.innerHTML = `<p style="text-align:center; color:#4b5563; margin-top:20px;">Ready for system query execution...</p>`;
            return;
        }

        const matches = masterDatabase.filter(item => 
            item.title.toLowerCase().includes(cleanQuery) ||
            item.details.toLowerCase().includes(cleanQuery)
        );

        if (matches.length > 0) {
            matches.forEach(item => {
                const card = document.createElement('div');
                card.className = 'academic-card';
                card.innerHTML = `
                    <h3 class="card-title" style="color:#00ffcc;">${item.title}</h3>
                    <div class="card-meta">${item.course}</div>
                    <p class="card-body">${item.details}</p>
                `;
                resultsEngine.appendChild(card);
            });
        } else {
            // Fallback UI generation
            const fallbackDiv = document.createElement('div');
            fallbackDiv.innerHTML = `
                <p style="text-align:center; color:#94a3b8; font-size:0.9rem; margin-bottom:10px;">
                    "${queryText}" wasn't found in your offline manual notes.
                </p>
                <button class="google-fallback-btn" id="goGoogleBtn">
                    🔍 Ask Google for "${queryText}"
                </button>
            `;
            resultsEngine.appendChild(fallbackDiv);

            document.getElementById('goGoogleBtn').addEventListener('click', () => {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(queryText + " computer science definition function")}`;
                window.open(searchUrl, '_blank');
            });
        }
    }

    // Advanced Local Parser + Web Sourcing Engine
    parseBtn.addEventListener('click', async () => {
        const rawText = manualInput.value.trim();
        if (!rawText) return;

        parseBtn.innerText = "Processing & Sourcing Web Points...";
        parseBtn.disabled = true;

        const sentences = rawText.split(/[.!?]+/);
        let topicsFound = [];

        // 1. Scan text fields for parsing parameters
        sentences.forEach(sentence => {
            const cleanSentence = sentence.trim();
            if (cleanSentence.length < 20) return;

            const words = cleanSentence.split(' ');
            const lowSentence = cleanSentence.toLowerCase();
            
            if (
                lowSentence.includes("is defined as") || 
                lowSentence.includes("refers to") || 
                lowSentence.includes("means") || 
                lowSentence.includes("crucial") ||
                lowSentence.includes("architecture") ||
                lowSentence.includes("consists of")
            ) {
                const topicSubject = words.slice(0, 2).join(' '); 
                topicsFound.push({
                    term: topicSubject,
                    localContext: cleanSentence + "."
                });
            }
        });

        // 2. Structural Fallback
        if (topicsFound.length === 0 && sentences.length > 0) {
            const fallbackTerm = sentences[0].split(' ').slice(0, 3).join(' ');
            topicsFound.push({ term: fallbackTerm, localContext: rawText });
        }

        // 3. Asynchronous loop tracking endpoints
        for (let item of topicsFound) {
            let webInsights = "No additional open-source web definitions found for this keyword spectrum.";
            
            try {
                const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(item.term)}&format=json&no_html=1&skip_disambig=1`);
                const data = await response.json();
                
                if (data.AbstractText) {
                    webInsights = data.AbstractText;
                }
            } catch (err) {
                console.log("Web connection skipped or offline.", err);
            }

            // 4. Combine dataset directly into memory array
            masterDatabase.unshift({
                title: item.term.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, ""),
                course: "AI-Web Enhanced Note",
                details: `[MANUAL CONTENT]: ${item.localContext}\n\n[WEB SOURCE INSIGHTS]: ${webInsights}`
            });
        }

        alert(`Successfully generated web-enhanced notes! Try searching for your topic keywords below.`);
        parseBtn.innerText = "Extract & Web-Source Summary";
        parseBtn.disabled = false;
        manualInput.value = '';
        
        runSearch('');
    });

    searchInput.addEventListener('input', (e) => {
        runSearch(e.target.value);
    });

    runSearch('');
});
