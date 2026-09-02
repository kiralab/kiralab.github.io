(() => {
  const labBadges = [
    ["Machine", "Is There Anybody Out There?", "Owned 5 machines", "◉"],
    ["Machine", "Just Another Brick in the Wall", "Owned 10 machines", "▦"],
    ["Machine", "Comfortably Numb", "Owned 20 machines", "♠"],
    ["Fortress", "Respected by Jet", "Completed the Jet Fortress", "♜"],
    ["Fortress", "Respected by Akerva", "Completed the Akerva Fortress", "♜"],
    ["Fortress", "Respected by Context", "Completed the Context Fortress", "⌾"],
    ["Rank", "Script Kiddie", "Has reached the Script Kiddie rank.", "◆"],
    ["Rank", "Hacker", "Has reached the Hacker rank.", "◆"],
    ["Challenge", "Memory Scavenger", "Owned the Hunting challenge.", "⌁"],
  ].map(([category, title, description, symbol]) => ({ platform: "Labs", category, title, description, symbol }));

  const academyBadges = [
    ["Module", "Academician", "Introduction to Academy module completed", "9a9808ae5d82.png"],
    ["Module", "Hacking in the wild", "Hacking WordPress module completed", "0ab3ef3787a3.png"],
    ["Module", "The eye that sees all", "Network Enumeration with Nmap module completed", "23f8f403cc90.png"],
    ["Module", "Every road leads back to root", "File Inclusion module completed", "4a408caa2da9.png"],
    ["Module", "DROP your weapon", "SQL Injection Fundamentals module completed", "3cbbe70f0b39.png"],
    ["Module", "Your request is my demand", "Web Requests module completed", "a9a9a4bc7771.png"],
    ["Module", "Playing with the mess", "JavaScript Deobfuscation module completed", "bee6f373c5ff.png"],
    ["Module", "Fuzzing is power", "Attacking Web Applications with Ffuf module completed", "83464e70a61e.png"],
    ["Module", "Crude but effective", "Login Brute Forcing module completed", "0e029ff0c417.png"],
    ["Module", "JOIN the adventure", "SQLMap Essentials module completed", "4b5f792cd169.png"],
    ["Module", "Developer", "Introduction to Web Applications module completed", "2b8afa6eaeac.png"],
    ["Module", "Your first battle", "Getting Started module completed", "eb232953edca.png"],
    ["Module", "Just a small crack, and you 're in", "Broken Authentication module completed", "6a580e5ec2c7.png"],
    ["Module", "Tactical", "Penetration Testing Process module completed", "84a4dd7f2e70.png"],
    ["Module", "Included in every report", "Cross-Site Scripting (XSS) module completed", "554d562846d9.png"],
    ["Module", "Inject with caution", "Command Injections module completed", "99acf0ef509b.png"],
    ["Module", "Dive into requests", "Using Web Proxies module completed", "094ae6e33fea.png"],
    ["Module", "Arachnoid", "Web Attacks module completed", "731de93750a8.png"],
    ["Module", "Prepare your payload and up you go", "File Upload Attacks module completed", "699fe830858a.png"],
    ["Module", "Information is not knowledge, or is it?", "Information Gathering - Web Edition module completed", "ae3c2bb992e2.png"],
    ["Module", "Straight to the server", "Server-side Attacks module completed", "60af14d0aa4c.png"],
    ["Module", "Passwords are not the only way forward", "Session Security module completed", "43eb1b16fdc6.png"],
    ["Module", "You shall not (by)pass", "Web Service & API Attacks module completed", "d002fd2e8267.png"],
    ["Module", "Hunt the bug", "Bug Bounty Hunting Process module completed", "436a4c961f6c.png"],
    ["Custom", "Unwavering User", "Awarded for the first weekly streak", "62682b521243.png"],
    ["Custom", "Constant Champion", "Awarded for 4 weekly streaks in a row", "063f1c73d6c8.png"],
    ["Custom", "Cyber Rookie 365", "Awarded after one year of learning", "f5747d581ed2.png"],
    ["Custom", "Binary Duo Explorer", "Awarded after two years of learning", "0f6502ad5d87.png"],
    ["Path", "Ready to hunt bugs for fun and profit", "Web Penetration Tester path completed", "598f4ad32ef6.png"],
    ["Path", "The hunt is on", "Cracking into Hack the Box path completed", "4ba2e0f8015a.png"],
    ["Certification", "HTB Certified Web Exploitation Specialist", "HTB CWES certification obtained", "de0e1e597647.png"],
  ].map(([category, title, description, image]) => ({
    platform: "Academy", category, title, description, image: `/assets/htb-badges/${image}`,
  }));

  const badges = [...labBadges, ...academyBadges];

  function card(badge) {
    const visual = badge.image
      ? `<img src="${badge.image}" alt="${badge.title} badge" loading="lazy">`
      : `<span class="htb-lab-mark" aria-hidden="true"><b>${badge.symbol}</b></span>`;
    return `<article class="htb-badge-item" title="${badge.title} — ${badge.description}">
      <div class="htb-badge-visual">${visual}</div>
      <h3>${badge.title}</h3>
    </article>`;
  }

  function mount() {
    const section = document.querySelector("#skill");
    if (!section || section.dataset.htbBadgesMounted) return false;
    section.dataset.htbBadgesMounted = "true";
    section.className = "htb-skills-section";
    section.innerHTML = `<div class="htb-skills-shell">
      <h2>Skills</h2>
      <div class="htb-badge-grid">${badges.map(card).join("")}</div>
    </div>`;
    return true;
  }

  if (!mount()) {
    const observer = new MutationObserver(() => mount() && observer.disconnect());
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function updateCwesAward() {
    const heading = [...document.querySelectorAll("h2")].find(
      (item) => item.textContent.trim() === "Certified Associate Penetration Tester (CAPT)"
    );
    if (!heading) return false;
    heading.textContent = "HTB Certified Web Exploitation Specialist certification";
    const awardImage = heading.closest("div[class*='flex']")?.querySelector("img")
      || [...document.querySelectorAll("img")].find((image) => image.getAttribute("src") === "/capt.jpg");
    if (awardImage) {
      awardImage.src = "/cwes.png";
      awardImage.alt = "HTB CWES certification";
    }
    const description = heading.parentElement?.querySelector("p");
    if (description) {
      description.textContent = "Successfully passed the HTB Certified Web Exploitation Specialist (HTB CWES) certification, demonstrating practical skills in identifying, exploiting, and understanding real-world web application vulnerabilities. The certification validates hands-on experience with web penetration testing techniques, vulnerability analysis, exploitation, and security assessment in realistic environments.";
    }
    return true;
  }

  if (!updateCwesAward()) {
    const awardObserver = new MutationObserver(() => updateCwesAward() && awardObserver.disconnect());
    awardObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  function updateCrtomAward() {
    const heading = [...document.querySelectorAll("h2")].find(
      (item) => item.textContent.trim() === "Cybersecurity Training, Thinkcyber-India"
    );
    if (!heading) return false;
    heading.textContent = "Certified Red Team Operations Management (CRTOM)";
    const awardImage = heading.closest("div[class*='flex']")?.querySelector("img")
      || [...document.querySelectorAll("img")].find((image) => image.getAttribute("src") === "/pisa-thinkcyber.jpg");
    if (awardImage) {
      awardImage.src = "/redteam.png";
      awardImage.alt = "Certified Red Team Operations Management (CRTOM)";
    }
    const description = heading.parentElement?.querySelector("p");
    if (description) {
      description.textContent = "Successfully achieved the Certified Red Team Operations Management (CRTOM) certification, demonstrating knowledge and practical understanding of planning, managing, and coordinating red team operations. The certification highlights skills in red team engagement strategy, operational security, team coordination, attack lifecycle management, risk assessment, reporting, and aligning offensive security activities with organizational security objectives.";
    }
    return true;
  }

  if (!updateCrtomAward()) {
    const crtomObserver = new MutationObserver(() => updateCrtomAward() && crtomObserver.disconnect());
    crtomObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  function updatePmpaAward() {
    const heading = [...document.querySelectorAll("h2")].find(
      (item) => item.textContent.trim() === "Cybersecurity Upskilling, TUX Global Institute"
    );
    if (!heading) return false;
    heading.textContent = "Practical Mobile Pentest Associate (PMPA)";
    const awardImage = heading.closest("div[class*='flex']")?.querySelector("img")
      || [...document.querySelectorAll("img")].find((image) => image.getAttribute("src") === "/tgi.jpg");
    if (awardImage) {
      awardImage.src = "/PMPA.png";
      awardImage.alt = "Practical Mobile Pentest Associate (PMPA)";
    }
    const description = heading.parentElement?.querySelector("p");
    if (description) {
      description.textContent = "Successfully achieved the Practical Mobile Pentest Associate (PMPA) by TCM Security, demonstrating hands-on skills in assessing the security of mobile applications. The certification covers practical techniques for identifying vulnerabilities, analyzing application behavior, testing authentication and data storage, inspecting network communication, and performing security assessments on mobile environments using real-world penetration testing methodologies.";
    }
    return true;
  }

  if (!updatePmpaAward()) {
    const pmpaObserver = new MutationObserver(() => updatePmpaAward() && pmpaObserver.disconnect());
    pmpaObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  function updateMi6Award() {
    const heading = [...document.querySelectorAll("h2")].find(
      (item) => item.textContent.trim() === "Pathway to Digital Carreer, IT STEP Computer Academy"
    );
    if (!heading) return false;
    heading.textContent = "Digital Forensic Training With MI6 UK";
    const awardImage = heading.closest("div[class*='flex']")?.querySelector("img")
      || [...document.querySelectorAll("img")].find((image) => image.getAttribute("src") === "/image.png");
    if (awardImage) {
      awardImage.src = "/MI6.png";
      awardImage.alt = "Digital Forensic Training With MI6 UK";
    }
    const description = heading.parentElement?.querySelector("p");
    if (description) {
      description.innerHTML = "Successfully completed <strong>Digital Forensics Training with MI6 UK</strong>, gaining practical knowledge in digital evidence handling, forensic investigation methodologies, data acquisition and analysis, incident investigation, and maintaining evidence integrity throughout the forensic process. The training strengthened hands-on capabilities in investigating digital devices and supporting cyber incident response and forensic investigations.";
    }
    return true;
  }

  if (!updateMi6Award()) {
    const mi6Observer = new MutationObserver(() => updateMi6Award() && mi6Observer.disconnect());
    mi6Observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
