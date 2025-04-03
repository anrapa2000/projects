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

function extractNeetCodeProblems() {
  const results = {};
  
  // Select all the accordion containers (one for each topic)
  const accordionContainers = document.querySelectorAll('.accordion-container');

  accordionContainers.forEach(container => {
      // Get the topic title
      const topicTitleElement = container.querySelector('.accordion p');
      const topicTitle = topicTitleElement ? topicTitleElement.textContent.trim() : 'Unknown Topic';

      // Initialize the array for this topic if it doesn't exist
      if (!results[topicTitle]) {
          results[topicTitle] = [];
      }

      // Find all the problems in the current accordion
      const rows = container.querySelectorAll('tr.ng-star-inserted');
      rows.forEach(row => {
          // Extract the title, href, and difficulty
          const titleLink = row.querySelector('a.table-text');
          const diffButton = row.querySelector('button.table-button');
          if (titleLink && diffButton) {
              const title = titleLink.textContent.trim();
              const href = titleLink.getAttribute('href').trim();
              const difficulty = diffButton.textContent.trim();

              // Push the extracted info into the corresponding topic category
              results[topicTitle].push({
                  title: title,
                  href: href,
                  difficulty: difficulty
              });
          }
      });
  });

  return results;
}

// Example usage: Call this function to get categorized problems
const categorizedProblems = extractNeetCodeProblems();
console.log(categorizedProblems);
