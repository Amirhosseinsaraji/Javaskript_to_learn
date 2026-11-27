# Calculator QA

## Automated keyboard checks

Run `node tests/keyboard.cjs` from the project directory. The checks simulate keyboard events and cover addition, multiplication, decimal input, deletion, reset and division by zero. These checks do not replace a real-browser accessibility test.

## Manual browser checks passed

- At 375px, a long number remained readable and the calculator layout stayed intact. In a later mobile test, the user confirmed that the display could be scrolled to see the remaining digits without scrolling the page horizontally; the exact viewport width needs confirmation.
- On a laptop keyboard, `12 + 7` followed by Enter displayed `19`; Escape reset the display to `0`; typing `12` followed by Backspace displayed `1`. The user clicked the empty page before the Enter test; Enter on a focused button uses that button's native action.

## Browser checks still required

- At 320px, 375px and 1440px, verify horizontal page overflow and test scrolling a number wider than the display.
- Navigate all controls with Tab and Shift+Tab. Check that focus is visible and Enter or Space activates a focused button only once. Check that the theme radio buttons still work with arrow keys.
- Use the physical keyboard for digits, decimal point, all operators, Enter, Backspace and Escape. Check the behavior matches clicking the corresponding buttons.
- Compare the page at 375px and 1440px with the images in `design/`. The current CSS defines theme background variables but does not yet apply the main, display or keypad background colors; visual work remains.
- Check `12 + 7 = 19`, `3 × 4 = 12`, `8 / 0 = Error`, then enter `7` and verify a new calculation works.

Headless Chrome could be started outside the sandbox; an initial mobile screenshot confirms that the current page differs visibly from the supplied design. Actual focus visibility and full comparison with the reference designs still need a real-browser check. Headless Chrome and Edge failed to start inside the sandbox because their GPU processes failed.
