<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ProReadMe Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              mono: ['Fira Code', 'monospace'],
            },
            colors: {
              github: {
                dark: '#0d1117',
                panel: '#161b22',
                border: '#30363d',
                text: '#c9d1d9',
                blue: '#58a6ff',
                green: '#238636',
              }
            }
          }
        }
      }
    </script>
    <style>
      body {
        background-color: #0d1117;
        color: #c9d1d9;
      }
      /* Custom scrollbar for code blocks */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #0d1117;
      }
      ::-webkit-scrollbar-thumb {
        background: #30363d;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #58a6ff;
      }
    </style>
  <script type="importmap">
{
  "imports": {
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.30.0",
    "lucide-react": "https://aistudiocdn.com/lucide-react@^0.554.0",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/"
  }
}
</script>
</head>
  <body>
    <div id="root"></div>
  </body>
</html>