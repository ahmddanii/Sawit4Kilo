import re

file_path = r'f:\LOMBA\KIDECO\GITHUUB\Sawit4Kilo\README.md'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix edge label quotes: -->|"text"| to -->|text|
content = content.replace('-->|"', '-->|')
content = content.replace('"|', '|')

# Fix state transitions: : "text" to : text
lines = content.split('\n')
new_lines = []
in_state_diagram = False
for line in lines:
    if line.strip() == 'stateDiagram-v2':
        in_state_diagram = True
    elif line.startswith('```'):
        in_state_diagram = False
        
    if in_state_diagram and '-->' in line and ': "' in line:
        line = line.replace(': "', ': ').replace('"', '')
        
    new_lines.append(line)

content = '\n'.join(new_lines)

# Fix Diagram 2 subgraph connections
replacements = {
    'provider --> sensorContext': 'provider --> liveState',
    'dashboard --> dashboardComponents': 'dashboard --> metricCard',
    'analytics --> analyticsComponents': 'analytics --> stats',
    'sensorContext --> socketClient': 'liveState --> socketClient',
    'sensorContext --> restClient': 'liveState --> restClient',
    'sensorContext --> localStorageClient': 'liveState --> localStorageClient',
    'sensorContext --> audioClient': 'liveState --> audioClient',
    'dashboardComponents --> groqClient': 'metricCard --> groqClient',
    'analyticsComponents --> groqClient': 'stats --> groqClient',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Mermaid diagrams fixed.')
