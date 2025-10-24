# Figma Reusable Checklist Widget

An interactive checklist widget for Figma that allows designers to track progress directly within their design files.

## Features

- **Interactive Checkboxes**: Check off items directly in the Figma canvas
- **Persistent State**: Checklist state is saved per file/instance
- **Progress Tracking**: Visual progress bar shows completion status
- **Customizable**: Add new items to any section
- **Reset Function**: Clear all checkmarks with one click
- **Visual Styling**: Follows Figma's design system

## Sections

1. Design Review
2. Usability
3. Documentation
4. Implementation
5. QA
6. Ready for Launch

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Build the widget:
   ```
   npm run build
   ```

3. To develop with auto-rebuilding:
   ```
   npm run watch
   ```

## Development Notes

This widget uses:
- TypeScript for type safety
- Figma Widget API for UI components
- `useSyncedState` for persistence
- SVG icons for visual elements

## Technical Requirements

- Bundle size < 200 kB
- Render time < 50 ms
- No external network calls

---

Built according to PRD specifications, April 2025.
