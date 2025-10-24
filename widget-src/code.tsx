// Figma Reusable Checklist Widget
// Based on PRD requirements

// Define types for our data model
interface ChecklistItem {
  label: string;
  done: boolean;
}

interface Section {
  title: string;
  items: ChecklistItem[];
}

// Initial data structure based on the comprehensive design review checklist
const initialSections: Section[] = [
  {
    title: "Preparation",
    items: [
      { label: "Clearly define the component's purpose and intended use within the design system", done: false },
      { label: "Ensure the component solves a specific problem or need in the design", done: false },
      { label: "Verify that the component follows Boost's visual guidelines (colors, typography, and spacing)", done: false },
      { label: "Ensure consistency with existing components, ensuring consistent visual style (buttons, forms, icons, etc.)", done: false },
      { label: "Ensure the component is designed to be platform-agnostic (usable across web, iOS, Android) where possible", done: false }
    ]
  },
  {
    title: "Structure",
    items: [
      { label: "Organize layers logically and use descriptive names for easy navigation", done: false },
      { label: "Use proper naming conventions for frames, groups, and instances (e.g., Header/Primary/Default)", done: false },
      { label: "Ensure Auto-Layout and any default frames as 'Frame-XX'", done: false },
      { label: "Component variants are grouped logically (e.g., different states like hover, disabled, active)", done: false },
      { label: "Apply Auto Layout to create responsive components that adapt to content flexibly", done: false },
      { label: "Ensure padding, spacing, and alignment settings are consistent across all states", done: false },
      { label: "Test the component's behavior across different screen sizes and aspect ratios using Figma's resizing settings", done: false },
      { label: "Set resizing constraints (Fill, Hug, Fixed) to allow component to resize efficiently (top, right, center, bottom, left)", done: false },
      { label: "Ensure that content like text, buttons, and images resize or remain fixed in the correct places based on the design's requirements", done: false },
      { label: "Check the component for edge case behavior (e.g., long titles, missing content)", done: false }
    ]
  },
  {
    title: "Variables",
    items: [
      { label: "Use the correct, consistent text styles from the Figma document (e.g., headers, body text, captions)", done: false },
      { label: "Ensure font sizes, line heights, and font weights are in line with Boost's design guide lines", done: false },
      { label: "Use global color variables from the design system to ensure consistency and remove any hardcoded colors in the component", done: false },
      { label: "Use global spacing variables to correctly set padding, margin and gaps where necessary. If a component is set to fixed height, don't set vertical spacing to Auto", done: false },
      { label: "Ensure that component modes are working (i.e. Boost/Lift, Dark, etc.)", done: false }
    ]
  },
  {
    title: "Accessibility",
    items: [
      { label: "Provide alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols, or simpler language", done: false },
      { label: "Provide alternatives for time-based media: Audio, video, captions, pre-recorded", done: false },
      { label: "Do UI elements adhere to at least 3:1 contrast?", done: false },
      { label: "Provide content that users can navigate, understand, and operate without visual information or structure", done: false },
      { label: "Make it easier for users to see and hear content including separating foreground from background (i.e. Contrast, Resize Text 200%, Don't use only color to rely information)", done: false },
      { label: "Is truncation safe? (hint: for good a11y, it's rarely acceptable)", done: false },
      { label: "Are errors clear, descriptive, and not color-dependent?", done: false },
      { label: "Do buttons and links have meaningful labels (e.g., avoid 'Click here')?", done: false },
      { label: "Provide users enough time to read and use content", done: false },
      { label: "Do not design content in a way that is known to cause seizures or physical reactions", done: false },
      { label: "Provide ways to help users navigate, find content, and determine where they are. (Providing link text that describes the purpose of a link)", done: false },
      { label: "Make it easier for users to operate functionality through various inputs beyond keyboard", done: false },
      { label: "Do not use dragging gestures unless essential", done: false },
      { label: "Target size area is 44px on iOS and 24 on desktop", done: false },
      { label: "Is it clear that text won't overlap when resized?", done: false }
    ]
  },
  {
    title: "Documentation",
    items: [
      { label: "Add developer annotations to verify", done: false },
      { label: "Note or comments in Figma explaining usage, guidelines, and best practices", done: false },
      { label: "Use Figma's description fields to include detailed explanations, or link to external documentation if necessary", done: false },
      { label: "Make Web pages appear and operate in predictable ways. ie. Don't make unpredictable or confusing interactions with component", done: false },
      { label: "Help users avoid and correct mistakes", done: false }
    ]
  },
  {
    title: "Approval and Completion",
    items: [
      { label: "Ensure all necessary design tokens (color, spacing, typography) are clearly defined for developers", done: false },
      { label: "Check usage guidelines and restrictions", done: false },
      { label: "Add updates to the changelog", done: false },
      { label: "Add update tag to the component and set 'Ready for Dev'", done: false },
      { label: "Document the changes in the design system (component?) and publish", done: false }
    ]
  }
]

// SVG icons for checkbox states
const CHECKBOX_UNCHECKED = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" stroke="#E6E6E6"/>
</svg>`

const CHECKBOX_CHECKED = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="6" fill="#2F80ED"/>
  <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="white"/>
</svg>`

const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG } = widget

function Widget() {
  const [sections, setSections] = useSyncedState<Section[]>('sections', initialSections)
  const [activeTabIndex, setActiveTabIndex] = useSyncedState<number>('activeTabIndex', 0)
  const [darkMode, setDarkMode] = useSyncedState<boolean>('darkMode', true) // Default to dark mode
  
  // Color theme based on mode
  const theme = {
    background: darkMode ? "#1E1E1E" : "#FFFFFF",
    cardBackground: darkMode ? "#2D2D2D" : "#FFFFFF",
    stroke: darkMode ? "#444444" : "#E6E6E6",
    text: {
      primary: darkMode ? "#FFFFFF" : "#333333",
      secondary: darkMode ? "#AAAAAA" : "#666666",
      completed: darkMode ? "#888888" : "#999999"
    },
    progress: {
      completed: darkMode ? "#45A0F5" : "#2F80ED", // Brighter blue for dark mode
      remaining: darkMode ? "#3D3D3D" : "#E6E6E6"
    },
    tabs: {
      active: darkMode ? "#45A0F5" : "#2F80ED",
      inactive: darkMode ? "#3D3D3D" : "#F5F5F5",
      completed: darkMode ? "#37864C" : "#4CAF50", // Adjusted green for dark mode
      inactiveText: darkMode ? "#AAAAAA" : "#666666",
      activeText: "#FFFFFF",
      completedText: "#FFFFFF"
    },
    checkbox: {
      checked: darkMode ? "#45A0F5" : "#2F80ED",
      unchecked: darkMode ? "#444444" : "#E6E6E6"
    }
  }

  // Updated SVG icons with theme colors
  const CHECKBOX_UNCHECKED = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" stroke="${theme.checkbox.unchecked}"/>
  </svg>`

  const CHECKBOX_CHECKED = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="${theme.checkbox.checked}"/>
    <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="white"/>
  </svg>`

  // Toggle checkbox state
  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].items[itemIndex].done = !newSections[sectionIndex].items[itemIndex].done
    setSections(newSections)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Edit item text
  const editItemText = (sectionIndex: number, itemIndex: number) => {
    const currentText = sections[sectionIndex].items[itemIndex].label
    
    // Use Figma notification to inform user
    figma.notify("Click on text to edit (feature in development)", {timeout: 2000})
    
    // In a real implementation, we would show a proper input dialog
    // For now, this is a placeholder to demonstrate the feature intention
  }

  // Check if all items in a section are completed
  const isSectionComplete = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex]
    return section.items.length > 0 && section.items.every(item => item.done)
  }

  // Get tab color based on section status
  const getTabColor = (sectionIndex: number): string => {
    if (isSectionComplete(sectionIndex)) {
      return theme.tabs.completed // Green for complete
    }
    return activeTabIndex === sectionIndex ? theme.tabs.active : theme.tabs.inactive // Blue for active, gray for inactive
  }

  // Get tab text color based on section status
  const getTabTextColor = (sectionIndex: number): string => {
    if (isSectionComplete(sectionIndex)) {
      return theme.tabs.completedText // White text for completed (green) tabs
    }
    return activeTabIndex === sectionIndex ? theme.tabs.activeText : theme.tabs.inactiveText // White for active, dark gray for inactive
  }
  
  // Reset all checkboxes
  const resetChecklist = () => {
    const newSections = sections.map((section: Section) => ({
      ...section,
      items: section.items.map((item: ChecklistItem) => ({ ...item, done: false }))
    }))
    setSections(newSections)
    figma.notify("Checklist reset")
  }

  // Setup property menu with reset option and dark mode toggle
  usePropertyMenu(
    [
      {
        itemType: 'action',
        propertyName: 'reset',
        tooltip: 'Reset all',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="white"/>
        </svg>`,
      },
      {
        itemType: 'action',
        propertyName: 'toggleTheme',
        tooltip: darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        icon: darkMode 
          ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="white"/>
              <path d="M12 3V5M12 19V21M5 12H3M21 12H19M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36M18.36 18.36L16.95 16.95M7.05 7.05L5.64 5.64" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>`
          : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z" fill="white"/>
              <path d="M12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5V19Z" fill="white"/>
            </svg>`,
      },
    ],
    ({ propertyName }: { propertyName: string }) => {
      if (propertyName === 'reset') {
        resetChecklist()
      } else if (propertyName === 'toggleTheme') {
        toggleDarkMode()
      }
    }
  )

  // Calculate progress for styling
  const getTotalProgress = () => {
    let total = 0
    let completed = 0
    
    sections.forEach((section: Section) => {
      section.items.forEach((item: ChecklistItem) => {
        total++
        if (item.done) completed++
      })
    })
    
    return { total, completed, percentage: total > 0 ? (completed / total) * 100 : 0 }
  }

  const progress = getTotalProgress()

  return (
    <AutoLayout
      direction="vertical"
      spacing={16}
      padding={24}
      width={400}
      fill={theme.cardBackground}
      cornerRadius={8}
      stroke={theme.stroke}
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: darkMode ? 0.5 : 0.1 },
        offset: { x: 0, y: 2 },
        blur: 4
      }}
    >
      {/* Header - outside tabs */}
      <AutoLayout direction="vertical" spacing={8} width="fill-parent">
        <Text fontSize={18} fontWeight="bold" fill={theme.text.primary}>Component Review Checklist</Text>
        <AutoLayout width="fill-parent" spacing={0} verticalAlignItems="center">
          {progress.percentage > 0 && (
            <AutoLayout
              width={Math.round(progress.percentage * 3)}
              height={8}
              fill={theme.progress.completed}
              cornerRadius={4}
            />
          )}
          {progress.percentage < 100 && (
            <AutoLayout
              width={Math.round((100 - progress.percentage) * 3)}
              height={8}
              fill={theme.progress.remaining}
              cornerRadius={4}
            />
          )}
        </AutoLayout>
        <Text fontSize={14} fontWeight="semi-bold" fill={theme.text.secondary}>
          {progress.completed} of {progress.total} complete
        </Text>
      </AutoLayout>

      {/* Tabs navigation - two rows */}
      <AutoLayout 
        width="fill-parent" 
        direction="vertical"
        spacing={4}
      >
        {/* First row of tabs */}
        <AutoLayout 
          width="fill-parent" 
          spacing={2} 
          verticalAlignItems="center"
          horizontalAlignItems="start"
        >
          {sections.slice(0, 3).map((section: Section, index: number) => (
            <AutoLayout
              key={index}
              fill={getTabColor(index)}
              padding={{vertical: 6, horizontal: 8}}
              cornerRadius={4}
              onClick={() => setActiveTabIndex(index)}
              width="hug-contents"
            >
              <Text 
                fontSize={12} 
                fontWeight={activeTabIndex === index ? "bold" : "normal"}
                fill={getTabTextColor(index)}
              >
                {section.title}
                {isSectionComplete(index) ? " ✓" : ""}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
        
        {/* Second row of tabs */}
        <AutoLayout 
          width="fill-parent" 
          spacing={2} 
          verticalAlignItems="center"
          horizontalAlignItems="start"
        >
          {sections.slice(3).map((section: Section, index: number) => (
            <AutoLayout
              key={index + 3}
              fill={getTabColor(index + 3)}
              padding={{vertical: 6, horizontal: 8}}
              cornerRadius={4}
              onClick={() => setActiveTabIndex(index + 3)}
              width="hug-contents"
            >
              <Text 
                fontSize={12} 
                fontWeight={activeTabIndex === index + 3 ? "bold" : "normal"}
                fill={getTabTextColor(index + 3)}
              >
                {section.title}
                {isSectionComplete(index + 3) ? " ✓" : ""}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>

      {/* Active section content */}
      <AutoLayout 
        direction="vertical" 
        spacing={8} 
        width="fill-parent"
        padding={16}
        fill={darkMode ? "#252525" : "#FAFAFA"}
        cornerRadius={4}
        stroke={theme.stroke}
      >
        <AutoLayout direction="vertical" spacing={8} width="fill-parent">
          <Text fontSize={16} fontWeight="bold" fill={theme.text.primary}>{sections[activeTabIndex].title}</Text>
          
          {/* Items for active tab */}
          {sections[activeTabIndex].items.map((item: ChecklistItem, itemIndex: number) => (
            <AutoLayout 
              key={itemIndex} 
              spacing={8} 
              width="fill-parent" 
              verticalAlignItems="center"
              padding={{vertical: 4}}
            >
              <SVG
                src={item.done ? CHECKBOX_CHECKED : CHECKBOX_UNCHECKED}
                width={24}
                height={24}
                onClick={() => toggleItem(activeTabIndex, itemIndex)}
              />
              <Text 
                fontSize={14} 
                width="fill-parent"
                fill={item.done ? theme.text.completed : theme.text.primary}
                textDecoration={item.done ? "strikethrough" : "none"}
                onClick={() => editItemText(activeTabIndex, itemIndex)}
              >
                {item.label}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Widget)
