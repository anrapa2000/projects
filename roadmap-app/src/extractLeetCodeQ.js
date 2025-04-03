function extractLeetCodeProblems() {
  // Select all the rows of problems
  const problemRows = document.querySelectorAll('div[role="row"]');
  const problems = []; // Array to store the results

  problemRows.forEach((row) => {
    const problemData = {};

    // Title and Link
    const titleAnchor = row.querySelector(
      'div[role="cell"] a[href^="/problems/"]'
    );
    if (titleAnchor) {
      problemData.title = titleAnchor.textContent.trim(); // Extract the problem's title
      problemData.link = `https://leetcode.com${titleAnchor.getAttribute(
        "href"
      )}`; // Extract the full URL
    }

    // Frequency (percentage calculation based on progress bar width)
    const frequencyBar = row.querySelector(
      'div[role="cell"] div[data-state="closed"] div[style*="width"]'
    );
    if (frequencyBar) {
      const widthStyle = frequencyBar.style.width; // e.g., "87.01%"
      problemData.frequency = parseFloat(widthStyle).toFixed(2) + "%"; // Extract and format as a percentage
    } else {
      problemData.frequency = "N/A"; // Handle cases where the frequency bar is missing
    }

    // Difficulty
    const difficultySpan = row.querySelector(
      'div[role="cell"] span.text-pink, div[role="cell"] span.text-yellow, div[role="cell"] span.text-green, div[role="cell"] span.text-olive, div[role="cell"] span.dark\\:text-dark-olive'
    );
    if (difficultySpan) {
      problemData.difficulty = difficultySpan.textContent.trim(); // Extract difficulty level (e.g., Easy/Medium/Hard)
    } else {
      problemData.difficulty = "N/A"; // Handle cases where difficulty is missing
    }

    // Only add the problem if it has a title (ignore empty rows)
    if (problemData.title) {
      problems.push(problemData);
    }
  });

  return problems;
}

// Use the function
const problems = extractLeetCodeProblems();
console.log(problems);
