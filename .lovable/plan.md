# Standardise testimonial video framing

## Scope
- Change only how testimonial video media is fitted inside the existing 9:16 frames.
- Preserve the carousel, cards, content, order, playback, controls, styling, and every other page element.

## Implementation
- Keep one fixed 9:16 container size and `object-cover` for every testimonial.
- Add a per-video focal position so landscape and unusually tall sources crop around each speaker rather than using one blind centre crop.
- Apply the same focal framing to each video's poster and playing media, avoiding website-created black bars without stretching.

## Verification
- Inspect all six cards individually before and during playback.
- Check mobile and desktop for equal frame heights, visible faces and upper bodies, no container bars, no overflow, and unchanged carousel behaviour.
