# Workspace Management Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

Workspace Management provides customizable layout management for the trading interface, allowing users to create, save, and switch between different workspace configurations.

---

## Component: Workspace Panel (`workspace-panel.tsx`)

```typescript
interface WorkspacePanelProps {
  currentWorkspace: Workspace;
  onWorkspaceChange: (workspace: Workspace) => void;
  showTemplates?: boolean;
}
```

---

## Workspace Structure

```typescript
interface Workspace {
  id: string;
  name: string;
  description?: string;
  
  // Layout Configuration
  layout: WorkspaceLayout;
  
  // Panels
  panels: PanelConfig[];
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isDefault?: boolean;
  isTemplate?: boolean;
  
  // Permissions
  isShared?: boolean;
  sharedWith?: string[];
}
```

---

## Panel Configuration

### Panel Types

```typescript
type PanelType = 
  | 'chart'
  | 'orderbook'
  | 'positions'
  | 'trades'
  | 'signals'
  | 'bots'
  | 'risk'
  | 'ml'
  | 'news'
  | 'journal'
  | 'analytics'
  | 'chat';
```

### Panel Config

```typescript
interface PanelConfig {
  id: string;
  type: PanelType;
  
  // Position
  x: number;
  y: number;
  width: number;
  height: number;
  
  // State
  isCollapsed: boolean;
  isFloating: boolean;
  
  // Content
  symbol?: string;
  exchange?: string;
  customConfig?: Record<string, any>;
  
  // Appearance
  title?: string;
  showHeader?: boolean;
}
```

---

## Layout Types

### Grid Layout

```typescript
interface GridLayout {
  type: 'grid';
  columns: number;
  rows: number;
  gap: number;
}
```

### Flexible Layout

```typescript
interface FlexibleLayout {
  type: 'flexible';
  direction: 'horizontal' | 'vertical';
  sizes: number[]; // Percentage sizes
}
```

### Tabbed Layout

```typescript
interface TabbedLayout {
  type: 'tabbed';
  tabs: {
    id: string;
    label: string;
    panels: string[]; // Panel IDs
  }[];
}
```

---

## Pre-defined Templates

### 1. Trading Template

```typescript
const tradingTemplate: Workspace = {
  name: 'Trading',
  layout: { type: 'grid', columns: 3, rows: 2, gap: 8 },
  panels: [
    { type: 'chart', x: 0, y: 0, width: 2, height: 2 },
    { type: 'positions', x: 2, y: 0, width: 1, height: 1 },
    { type: 'orderbook', x: 2, y: 1, width: 1, height: 1 }
  ]
};
```

### 2. Bot Management Template

```typescript
const botManagementTemplate: Workspace = {
  name: 'Bot Management',
  layout: { type: 'grid', columns: 2, rows: 2, gap: 8 },
  panels: [
    { type: 'bots', x: 0, y: 0, width: 1, height: 2 },
    { type: 'chart', x: 1, y: 0, width: 1, height: 1 },
    { type: 'analytics', x: 1, y: 1, width: 1, height: 1 }
  ]
};
```

### 3. Analysis Template

```typescript
const analysisTemplate: Workspace = {
  name: 'Analysis',
  layout: { type: 'grid', columns: 2, rows: 2, gap: 8 },
  panels: [
    { type: 'chart', x: 0, y: 0, width: 1, height: 2 },
    { type: 'ml', x: 1, y: 0, width: 1, height: 1 },
    { type: 'analytics', x: 1, y: 1, width: 1, height: 1 }
  ]
};
```

---

## Features

### 1. Panel Management

```typescript
// Add panel
const addPanel = (panel: Omit<PanelConfig, 'id'>) => {
  dispatch({
    type: 'WORKSPACE_ADD_PANEL',
    payload: { ...panel, id: generateId() }
  });
};

// Remove panel
const removePanel = (panelId: string) => {
  dispatch({
    type: 'WORKSPACE_REMOVE_PANEL',
    payload: panelId
  });
};

// Resize panel
const resizePanel = (panelId: string, size: { width: number; height: number }) => {
  dispatch({
    type: 'WORKSPACE_RESIZE_PANEL',
    payload: { panelId, size }
  });
};
```

### 2. Layout Switching

```typescript
// Quick layout switch
const layouts = {
  single: () => setLayout({ type: 'single' }),
  splitHorizontal: () => setLayout({ type: 'split', direction: 'horizontal' }),
  splitVertical: () => setLayout({ type: 'split', direction: 'vertical' }),
  grid: () => setLayout({ type: 'grid', columns: 2, rows: 2 }),
  triple: () => setLayout({ type: 'triple' })
};
```

### 3. Workspace Persistence

```typescript
// Save workspace
const saveWorkspace = async (workspace: Workspace) => {
  await fetch('/api/workspace', {
    method: 'POST',
    body: JSON.stringify(workspace)
  });
};

// Load workspace
const loadWorkspace = async (workspaceId: string) => {
  const response = await fetch(`/api/workspace/${workspaceId}`);
  return response.json();
};
```

### 4. Panel Synchronization

```typescript
// Sync symbol across panels
const syncSymbol = (symbol: string, panelIds?: string[]) => {
  const panelsToUpdate = panelIds || getVisibleChartPanels();
  
  panelsToUpdate.forEach(panelId => {
    dispatch({
      type: 'PANEL_SET_SYMBOL',
      payload: { panelId, symbol }
    });
  });
};
```

---

## State Management

### Workspace Store

```typescript
interface WorkspaceStore {
  // State
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  templates: Workspace[];
  
  // Actions
  loadWorkspace: (id: string) => Promise<void>;
  saveWorkspace: (workspace: Workspace) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  
  // Panel Actions
  addPanel: (panel: PanelConfig) => void;
  removePanel: (id: string) => void;
  updatePanel: (id: string, updates: Partial<PanelConfig>) => void;
  
  // Layout Actions
  setLayout: (layout: WorkspaceLayout) => void;
  
  // Sync Actions
  syncSymbol: (symbol: string, panelIds?: string[]) => void;
  syncTimeframe: (timeframe: string, panelIds?: string[]) => void;
}
```

---

## UI Components

### Workspace Selector

```tsx
<WorkspaceSelector
  workspaces={workspaces}
  currentWorkspace={currentWorkspace}
  onSelect={handleWorkspaceSelect}
  onCreateNew={handleCreateNew}
/>
```

### Panel Container

```tsx
<PanelContainer
  panel={panel}
  onResize={handleResize}
  onMove={handleMove}
  onClose={handleClose}
  onCollapse={handleCollapse}
>
  <ChartPanel {...panelConfig} />
</PanelContainer>
```

### Layout Presets

```tsx
<LayoutPresets
  presets={layoutPresets}
  currentLayout={currentLayout}
  onSelect={handleLayoutSelect}
/>
```

---

## API Endpoints

### Workspace CRUD

```
GET    /api/workspace          # List workspaces
GET    /api/workspace/[id]     # Get workspace
POST   /api/workspace          # Create workspace
PUT    /api/workspace/[id]     # Update workspace
DELETE /api/workspace/[id]     # Delete workspace
```

### Templates

```
GET /api/workspace/templates   # Get templates
POST /api/workspace/template   # Create template
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + 1-9` | Switch to workspace 1-9 |
| `Ctrl + S` | Save current workspace |
| `Ctrl + N` | New panel |
| `Ctrl + W` | Close current panel |
| `Ctrl + Tab` | Switch between panels |
| `F11` | Toggle fullscreen panel |

---

## Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  mobile: { maxWidth: 768 },
  tablet: { minWidth: 769, maxWidth: 1024 },
  desktop: { minWidth: 1025 }
};
```

### Mobile Layout

```typescript
// Auto-switch to mobile layout
const adaptLayoutForMobile = (workspace: Workspace): Workspace => {
  return {
    ...workspace,
    layout: { type: 'single' },
    panels: [workspace.panels[0]] // Only first panel
  };
};
```

---

## Sharing & Collaboration

### Share Workspace

```typescript
const shareWorkspace = async (
  workspaceId: string,
  userIds: string[]
) => {
  await fetch(`/api/workspace/${workspaceId}/share`, {
    method: 'POST',
    body: JSON.stringify({ userIds })
  });
};
```

### Import/Export

```typescript
// Export workspace
const exportWorkspace = (workspace: Workspace) => {
  const json = JSON.stringify(workspace, null, 2);
  downloadFile(json, `${workspace.name}.json`);
};

// Import workspace
const importWorkspace = async (file: File) => {
  const text = await file.text();
  const workspace = JSON.parse(text);
  await saveWorkspace(workspace);
};
```

---

## Performance Considerations

1. **Lazy Loading:** Panels loaded on-demand
2. **Virtual DOM:** Efficient re-renders
3. **State Persistence:** Debounced saves
4. **Memory Management:** Cleanup on panel close

---

*Documentation for CITARION Algorithmic Trading Platform*
