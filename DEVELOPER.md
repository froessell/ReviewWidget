# Developer Documentation

## Figma Reusable Checklist Widget

This document provides technical details for developers working on the Figma Reusable Checklist Widget.

### Code Structure

The widget is built using the Figma Widget API and TypeScript. The main components include:

1. **Data Model**
   - `Section`: Contains a title and array of checklist items
   - `ChecklistItem`: Represents each checkable item with a label and done state

2. **State Management**
   - Uses `useSyncedState` for persistence across Figma sessions
   - Maintains checkbox state per widget instance

3. **UI Components**
   - Header with title and progress bar
   - Section titles with collapsible items
   - Checkbox items with toggle behavior
   - Add item buttons for each section

### Key Functions

- `toggleItem`: Toggles the done state of a checkbox
- `addItem`: Adds a new item to a specific section
- `resetChecklist`: Resets all checkboxes to unchecked state
- `getTotalProgress`: Calculates overall progress percentage

### Property Menu

The widget exposes a "Reset all" action in the property menu, which allows users to clear all checkmarks at once.

### SVG Assets

The widget uses SVG strings for visual elements:
- Unchecked checkbox
- Checked checkbox 
- Add item button

### Developer Workflow

1. Make changes to `widget-src/code.tsx`
2. Run `npm run build` to compile
3. Test in Figma by loading the widget

### Performance Considerations

- Minimize SVG complexity to ensure fast rendering
- Avoid unnecessary re-renders when toggling items
- Keep bundle size under 200 kB

### Future Improvements

Potential enhancements for future versions:
- Drag-and-drop reordering of items
- Custom section creation
- Color theming options
- Export/import of checklist data

---

For more information on Figma widget development, see the [Figma Widget API documentation](https://www.figma.com/widget-docs/). 