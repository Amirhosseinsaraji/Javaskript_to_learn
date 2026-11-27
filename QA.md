# Calculator QA

## Automated keyboard checks

Run `node tests/keyboard.cjs` from the project directory. The checks simulate keyboard events and cover addition, multiplication, decimal input, deletion, reset and division by zero. These checks do not replace a real-browser accessibility test.

## Browser checks still required

- At viewport widths of 320px, 375px and 1440px, check the page does not scroll horizontally. Enter at least 16 digits and verify the display can be scrolled and read.
- Navigate all controls with Tab and Shift+Tab. Check that focus is visible and Enter or Space activates a focused button only once. Check that the theme radio buttons still work with arrow keys.
- Use the physical keyboard for digits, decimal point, all operators, Enter, Backspace and Escape. Check the behavior matches clicking the corresponding buttons.
- Compare the page at 375px and 1440px with the images in `design/`. The current CSS defines theme background variables but does not yet apply the main, display or keypad background colors; visual work remains.
- Check `12 + 7 = 19`, `3 × 4 = 12`, `8 / 0 = Error`, then enter `7` and verify a new calculation works.

Headless Chrome could be started outside the sandbox; an initial mobile screenshot confirms that the current page differs visibly from the supplied design. Exact viewport rendering at 320px, 375px and 1440px, actual focus visibility and overflow with a long number still need a real-browser check. Headless Chrome and Edge failed to start inside the sandbox because their GPU processes failed.
