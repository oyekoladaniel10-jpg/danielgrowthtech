# Convert Client References to a portrait carousel

## Scope
- Change only the testimonial card layout on the Client References page.
- Preserve all existing content, order, colours, typography, card surfaces, controls, page sections, and branding.

## Implementation
- Replace the current stacked grid with a horizontal, touch-swipeable, scroll-snapping row.
- Size each card so mobile shows one complete primary card plus a visible portion of the next card; use wider multi-card viewing on larger screens.
- Change only the testimonial media frame to a consistent 9:16 portrait ratio.
- Keep posters proportional with `object-contain` so they are not distorted or unnecessarily cropped, and retain the centered play control.
- Keep each card's industry, name, country, and project description directly beneath its video.
- Preserve the existing lightbox behavior and testimonial order.

## Verification
- Check mobile widths 320, 360, 375, 390, and 412px for the full-card/next-card preview, correct 9:16 media, swiping, and no page overflow.
- Check desktop layout, card styling, content order, video opening, and runtime errors.
