# Three-page QA audit and fixes

Date: 25 October 2026 (Asia/Calcutta)
Scope: /option-1, /option-2, /option-3. Next.js 16.4.3, React, CSS Modules and Framer Motion.

## Result and release limits

The confirmed source issues below were fixed. Two browser QA passes were performed, with screenshots at all nine requested widths. This is not a claim that every requested manual/device/performance check passed. Remaining verification is listed explicitly below. No enquiry/email was sent and no public deployment or external security scan was performed.

Read before implementation: AGENTS.md, the previous QA-AUDIT.md, installed Next.js Image, headers and CSP documentation. Approved screenshots were treated as design context; the current three design identities and red heading fill were preserved. Only Georgia and Arial are used as named font families.

## Changes and evidence

| Finding | Action / verification | Status |
|---|---|---|
| Tablet typography | Bare container-based font-size declarations now have minimums. Desktop navigation has a 14px minimum. Existing compact/mobile page layouts extend through 1100px, avoiding tiny tablet navigation and cramped columns. | Fixed; responsive geometry checked. |
| Option 2 reference crops | Early Years uses creative-play; portrait uses hero-main; campus uses campus; visit uses teamwork. No live Option 2 photo references remain in /images/option-2. Images use native captions/actions and responsive Image delivery. | Fixed. |
| Adult activity photo | Inspected school contact sheet and source photos. discovery shows two adults at a yellow outdoor table. Option 1 gallery is Community, Option 2 slideshow/carousel says adults/Community, Option 3 gallery says Community. Option 3 learning accordion uses the classroom image instead. Removed unsupported sports-day naming from changed alt text. | Fixed. |
| Enquiry | No API handler, configured form service or environment setup was found in this project. Kept a local email-draft flow, clearly described before entering information. Button says Prepare visit email; status explicitly says nothing sent. Phone requires permitted telephone characters and 7–15 digits. Editing clears the old draft. | Fixed honesty/validation; real submission requires backend setup. |
| Headers | CSP, frame-ancestors none, X-Frame-Options DENY, nosniff, strict-origin-when-cross-origin and camera/microphone/geolocation denial added. x-powered-by disabled. Production responses checked on all three routes, HTTP 200. | Verified locally; hosting/CDN still unknown. |
| CSP tradeoff | Local-only sources, no objects, no external frames, self form actions. Static Next hydration and Framer style properties retain unsafe-inline for scripts/styles; unsafe-eval only in development. This is defense in depth, not a strict nonce CSP. | Explicit limitation. |
| HSTS | Not added to local HTTP. No production HTTPS deployment configuration was present to verify. | Deployment responsibility. |
| Option 2 slideshow | Removed unoptimized. First image alone preloads. Next slide warms using Next getImageProps srcset/sizes; scheduled transitions wait for readiness. Manual selection keeps the current image until the pending image loads. | Implemented; slow-network emulation unavailable. |
| Option 1 hero | CSS poster download replaced with preloaded responsive Image; the full-width photo remains visible. Video activates after poster load plus 1.8s. Existing muted/playsInline, reduced-motion/save-data checks and viewport/tab pause remain. | Implemented; see animation verification limits. |
| Touch targets | Slideshow, carousel arrows, Option 1 stage links, Option 3 gallery arrows, dialog controls and all menu summaries have minimum 44px hit areas. | Fixed for affected controls; not a claim about every text link. |
| Option 3 stepper | Each destination step is observed separately; connectors begin only after that step intersects. A sequential queue preserves 01→02→03→04. Lines remain scaled to zero beforehand. Large numbered discs retained. | Implemented; full slow-scroll timing certification remains. |
| Option 3 hero motion | Infinite orbit and badge loops changed to one 4-second introduction. Reduced-motion override retained. | Fixed continuous-motion issue. |
| Dialogs | Option 1 has accessible name, explicit opening-element focus return and initial close-button focus. All dialogs keep Escape and arrow controls where applicable. Shared Tab/Shift+Tab boundary guard added, including the single-button Option 2 dialog. | Tested focus entry/return/Escape; Option 2 trap failure found and fixed/retested. |
| Logo | Existing official-source raster is 180×156 (other available logo variant 180×180). No higher-resolution/vector original was established from the official homepage/source. Footer display capped at 180px in Options 2/3; no redraw or artificial upscale. | High-DPI sharpness still limited by source. |
| Red hero heading | Red fill preserved; a fine light stroke creates a stable local edge over changing footage. Removed black text shadow after screenshot review showed it interfering with the animated fill. Full-width media and dark shade retained; no white background fade restored. | Visually improved; frame-by-frame contrast certification not performed. |
| Curved carousel | Stable photo keys retained. Side cards remain vertically centered. A wrapping side card and its category fade across the back instead of sweeping through the center. Rapid updates are guarded during the 820ms transition. Arrow keys supported on focused cards; reduced-motion switches immediately. Polygon fallback and shape() enhancement retained. | Chromium interaction/settled alignment checked; Safari/Firefox pending. |
| Menus | Shared anchor/Escape closing, dynamic accessible labels, native expanded state, 44px summary and animated hamburger→cross on all three pages. | All three tested at actual 390px width. |
| Option 2 semantics | One H1; philosophy changed to H2. Tabs have roving tabindex and Left/Right/Home/End behavior. Active panel remains labelled and keyboard focusable. | Arrow selection/focus and tabindex [-1,0,-1] verified. |
| Duplicate journal strip | Removed duplicate Every day holds a new story controls; original category controls/photos retained. | Fixed. |
| CSS/reveals | Adjusted declarations in place; consolidated shared menu/dialog behavior and affected carousel rules. Removed content-visibility section deferral after fast-scroll screenshot risks. Added a passive scroll/pageshow fallback that reveals passed content. Existing slow reveal transitions retained. | Affected cleanup only; broader historical CSS duplication remains. |

## Browser QA passes and coverage

Browser: Codex in-app Chromium, desktop host, viewport emulation. Heights mostly 900px; focused mobile interaction checks at 390×844. No device hardware, Safari or Firefox was used.

Widths: **360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560px**, all three pages.

Pass 1: 27 route/width combinations, full-page screenshots, H1 count, internal hash target existence and document horizontal geometry. All returned one H1, no missing targets and no document overflow. Screenshots initially contain unrevealed offscreen sections; these are initial-state evidence, not finished-page images.

Pass 2: repeated viewport checks after scrolling through the document and returning to the top, with full-page screenshots. Final recorded checks have zero broken loaded images, zero horizontal overflow and zero remaining unrevealed targets. Representative mobile/tablet/desktop screenshots were visually inspected. A viewport-control issue after creating an additional tab was detected by reading actual innerWidth; mobile regression was repeated in a fresh tab with actualWidth recorded as 360/390/430. Incorrect intermediate mobile screenshots were overwritten. Large-desktop screenshots retain the intentional 1920px page cap.

Additional interaction runs:
- All menus: open, Escape, focus return to summary and close after selecting a section anchor.
- Option 1 gallery: opening focus on Close album, Right arrow, Escape and return to View All Albums.
- Options 2/3 dialogs: Escape and opening-control focus return. Option 2 single-control focus trap initially failed, then passed after fix.
- Option 2 tabs: keyboard next stage and correct single tabbable active tab.
- Option 2 carousel: full forward cycle Sport→Community→Performing Arts→Sport, reverse action, repeated rapid clicks. Settled side and center card vertical centers matched (321.79px in the measured 390px case); image identity stayed stable.
- Option 1 form: alphabetic phone rejected without draft; valid phone produced only a local draft; editing removed stale draft. Mail link was never opened/sent.
- Fast scroll and anchor traversal: reveal fallback checked. Footer/email layouts and crops reviewed in representative saved screenshots.
- Final production browser regression and screenshots captured at 390px; console warning/error query returned no entries during the inspected sessions.

Evidence folder: `saved/qa-2026-10-25/`
- `pass1-option{1|2|3}-{width}.jpg`, `pass1.json`
- `pass2-option{1|2|3}-{width}.jpg`, `pass2.json`
- `final-option{1|2|3}-390.jpg` (production build)
- `carousel-community.jpg`
- `production-headers.json`, `asset-sizes.json`

A full-page screenshot alone is not proof of every interaction, all animation frames or every device. No pixel-perfect/all-devices claim is made.

## Performance

Production build: **passed** (Next 16.4.3). The Windows sandbox initially produced EPERM while generating route output; the requested build succeeded outside that sandbox. Separate `.next-qa` and `.next-final` build output directories avoid the running development output. `AUDIT_DIST_DIR` is optional; ordinary builds still use `.next`.

Production tested on local loopback ports 3101/3102, with no CPU/network throttling. Responsive matrix used the reachable dev server on port 3000. Dev timing is not reported as production performance.

Measured local production HTTP response body sizes, width 640 / quality 75 image endpoint, all HTTP 200:

| Asset | Bytes |
|---|---:|
| Original sports.webp | 674,008 |
| Responsive sports candidate | 49,453 |
| Responsive hero-main candidate | 19,733 |
| Hero MP4 | 1,001,047 |

The sports candidate is approximately 92.7% smaller than its full source. Actual production DOM at 390px selected the optimized `/_next/image?...w=640&q=75` hero URL. These are asset response sizes, not a whole-page transfer total or network-throttled benchmark.

**No Lighthouse score, LCP, CLS, INP or TBT number is available.** Lighthouse is not installed and the provided browser read-only execution scope does not expose `performance.getEntriesByType` (performance was undefined). First and repeat-load navigation were exercised, but no trustworthy cold-cache, throttled or repeat-load timing series was obtained. No score is inferred from build/server speed.

## Security checks

- `npm audit --omit=dev --json`: **0 known vulnerabilities**. Registry was initially inaccessible from the sandbox; official registry query succeeded with network access. This is not proof that the whole site is secure.
- Actual local production header evidence saved for each route; all HTTP 200.
- target=_blank links inspected: noopener noreferrer present.
- No dangerouslySetInnerHTML, client credential/service keys, form network submission or unnecessary third-party embedded requests found in app/components source. No environment files/configured enquiry provider found.
- Production build disables development indicators; production browser console query returned no warnings/errors during inspected sessions.
- HTTP image/video requests measured above returned 200. This is not a complete HAR/network-failure audit.
- CSP allows inline hydration/style behavior intentionally; nonce hardening would require a rendering/caching decision.
- No external penetration testing, destructive scan, public deploy or real message sending.

## Remaining work / blockers

1. Real enquiry submission requires a chosen service/backend endpoint, credentials in server-only configuration, server validation, abuse protection and an approved receiving/storage policy. Current form honestly prepares a local email draft.
2. Obtain official vector or larger original logo for high-DPI footer sharpness.
3. Lighthouse/Core Web Vitals, main-thread/INP analysis, true cold-cache/repeat benchmarks, full transfer/404 tracing and throttled slow-network blank-flash tests remain unmeasured with these browser tools.
4. Reduced-motion, save-data and inactive-tab handling reviewed in source; browser preference/network emulation is not exposed here. Full live preference changes and video/tab/offscreen lifecycle testing remain incomplete. Option 3 no longer has continuous decorative hero motion.
5. Safari/Firefox shape() fallback, real touch swipes, 200% browser zoom, browser-back/scrolled-refresh restoration and exhaustive slow-scroll connector timing remain manual release checks. Responsive viewport emulation is not a substitute for them.
6. Red heading edge treatment was reviewed in screenshots; every video frame/background contrast was not measured. Tiny decorative eyebrow/footer text and every touch target have not been individually WCAG-certified.
7. Historical CSS duplication outside affected rules remains. No unrelated redesign was undertaken.
8. HTTPS/CDN deployment headers and HSTS must be verified on the actual hosting environment.

Overall: fixes and two responsive browser passes completed within the recorded coverage; the remaining performance, cross-browser and deployment checks above are **not** marked complete.

## Demo-only follow-up (25 October 2026)

The user clarified that these three options are a client demo. Enquiry backend/service integration is explicitly out of scope for this demo; the honest local email-draft behavior remains. No real enquiry or test email was sent. No public deployment was requested or performed.

Additional official-logo research:
- Official coat-of-arms page: https://sherringwood.com/about-us/school-coat-of-arms/
- Official brochure: https://sherringwood.com/wp-content/uploads/2022/06/Sherringwood-World-School.pdf
- Downloaded originals/review evidence: tmp/logo-review/.
- The coat-of-arms page's linked 2.jpg is a 584×539 explanatory diagram with labels, not a clean complete logo. Its school-coat-of-arms-2.jpg URL currently returns a stage photograph. Brochure image inspection found photographic/decorative crest artwork, not a verified complete higher-resolution replacement for the existing wordmark+crest. None was substituted or presented as an official high-resolution complete logo. The original logo remains in place.

Live QA blocker in this follow-up:
- Browser inventory and direct local-tab creation both returned `Local browser use is disabled in Work settings`, including a retry after the user reported enabling it.
- The available browser capabilities list only visibility and viewport. No network throttling, browser engine selection, reduced-motion emulation or zoom control is advertised.
- No alternative browser automation was used to bypass this access restriction.
- Therefore slow-network browser measurements, Safari/Firefox, actual 200% browser zoom and full live reduced-motion/tab-lifecycle checks are still NOT verified in this follow-up. Earlier screenshots and completed QA remain evidence for their stated scope only.

Brochure render follow-up: pages 1 and 16 were rendered and visually inspected (`tmp/logo-review/render-page1.png`, `render-page16.png`). Page 1 contains the full logo as part of the designed brochure spread, on a striped background; page 16 contains reviews, not a standalone logo. A clean standalone logo asset was not established. The brochure artwork was not cropped into the live demo or redrawn. Browser access remained disabled on the final direct tab-creation attempt.

## Focused remaining-check follow-up (25 October 2026, current chat)

Scope was restricted to the four requested remaining checks. No application source, dependencies, design, enquiry integration or security configuration changed. No full responsive matrix, build or dependency audit was repeated.

### Production identity

The pre-existing `.next-final/BUILD_ID` is `yqk-zo42fQA5HxoPOTIDa` (07:15:11 local file time); the latest files under app/components/public are dated 07:13:13. Older `.next-qa` and `.next` IDs are `fLFxufBObnyRJs84eitqQ` and `VUZEueSR-CEzoGROH0F1U`. This is chronological evidence, not a reproducible source-hash attestation. Installed Next deployment guide was read. The existing final build was started with AUDIT_DIST_DIR=.next-final using next start on port 3103; its /option-1 HTTP response returned 200 and contained the exact final build ID. All browser observations below used http://localhost:3103, production mode. Initial 3102 attempts returned connection refused/timeouts; a sandbox server occupied that port. Existing ports were not certified as current builds. Local socket inspection was restricted; this was resolved for the new production endpoint using an approved outside-sandbox process. No browser access restrictions were bypassed.

### Current browser capability check

Browser access is now enabled. Inventory contains only ChatGPT in-app browser and MCP Apps, with no Safari/WebKit or Firefox engine. Native apps are disabled in this session. In-app browser advertises only visibility and viewport capabilities. No documented network/CPU throttling, cache control, reduced-motion/save-data emulation, browser zoom or foreground/background-tab activation controls are available. Read-only page scope returned `typeof performance === 'undefined'` and `typeof PerformanceObserver === 'undefined'`. Consequently LCP, CLS, main-thread work/long tasks, INP/TBT, actual transfer totals, duplicate-download tracing and complete request/404 coverage remain unmeasured. No performance score is reported. No unsupported CDP/Playwright or alternate browser automation was used.

### Limited live observations (not substitutes for blocked checks)

Conditions: in-app Chromium, production, desktop 1280x720 CSS viewport, normal zoom (not independently measured), unthrottled network/CPU, browser-managed cache of unknown state. One navigation per option; one additional reload each for options 1 and 2. These are ordinary reload observations, not controlled cold-cache/repeat benchmarks. document.visibilityState returned visible throughout; no background lifecycle test was performed.

- Option 1: responsive hero image loaded, video readyState 4 and playing. Clicking Visit Sherringwood scrolled to admissions (scrollY approximately 3851); the immediate sample still played, then a subsequent settled sample showed paused=true. Returning via Back to top resumed playback. Manual Pause changed the accessible label to Play background video. These verify normal-mode offscreen pause/resume and the manual-pause label only; dynamic preferences, save-data, tab inactivity and manual preference preservation across lifecycle remain unverified. Poster-before-video timing/slow-network blank flashes were not certified.
- Option 2: initial optimized hero image and logo loaded. Pause changed control state to Play slideshow. Selecting photo 2 retained the loaded current hero image in the immediate sample. This is evidence of retaining the current image at that sample, not proof the requested photo finished loading or that every transition is flash-free. Slow-network/manual/automatic transition certification and simultaneous preload/download analysis remain pending.
- Option 3: page loaded, eager images loaded at the observed sample. Slow mobile stepper timing and reduced-motion intro suppression remain pending.
- Browser console warn/error queries returned [] in the inspected sessions on all three routes. This does not establish complete request success/zero 404s or exhaustive console coverage.

### Status of the four requested groups

1. Slow-network/performance: blocked by missing trustworthy metrics, throttling and cache/network tracing controls. Limited normal-load observations above only.
2. Safari/Firefox: NOT TESTED; neither actual engine is exposed. UA substitution was not used. shape()/polygon, rapid cycles, centering, keyboard/reduced-motion and engine-specific hero/reveal/dialog checks remain pending in those engines.
3. Actual 200% zoom: NOT TESTED; no browser chrome/native input/zoom capability is exposed. Viewport halving and CSS zoom were not used as substitutes. No zoom change was made, so no restoration was needed.
4. Preferences/lifecycle: PARTIAL normal-mode Option 1 offscreen check; all actual reduced-motion/save-data changes and foreground/background visibility checks remain NOT TESTED. No visibility-state mutation was used. Option 2 lifecycle, Option 3 slow stepper, reduced-motion content, fast-scroll/scrolled-refresh/back restoration remain pending in this focused follow-up.

These are tool capability blockers, not passes. Application fixes were not inferred from absent measurements. Existing evidence retains its earlier stated scope. The client demo's local draft-only enquiry behavior remains unchanged.

## Final capability retry and agreed skips (25 October 2026)

User requested one final attempt, then to skip unavailable checks for now. Browser inventory was retried: only in-app Chromium and MCP Apps, no native apps or actual Safari/Firefox. Capabilities remain visibility and viewport only; no supported browser zoom, throttling, cache control, preference emulation or foreground/background activation. Read-only performance remains undefined. Therefore slow-network/performance/blank-flash certification, actual Safari/Firefox, actual 200% zoom, reduced-motion/save-data and tab lifecycle are **SKIPPED FOR NOW per user instruction**, not passed. Prior normal-mode Option 1 offscreen evidence remains valid for its limited scope.

Option 3 mobile stepper now has an additional live focused check on the same current production build at localhost:3103, Chromium 390x844, unthrottled, default motion, cache uncontrolled, one fresh top-to-bottom incremental pass after a reset. Supported browser scrolling used 0.1–0.3 viewport increments, with read-only DOM/computed pseudo-element observations between increments. An initial PageDown overshot the stepper and was discarded; the recorded pass began from scrollY=0 after returning to top and reloading.

Recorded pass:
- y=0: destination 02 top=1041.86; all three connector ::after transforms have scaleY=0, all data-connected=false.
- y=253.33: destination 02 top=788.53, first connector still zero; destinations 03/04 below viewport.
- y=337.33: destination 02 top=704.53; connector 01→02 begins (scaleY=.133362). Later connectors remain zero.
- y=506.67: first connector completed (scaleY=1); destination 03 top=800.19 and second connector still zero.
- y=590.67: destination 03 top=716.19; connector 02→03 begins (scaleY=.149948). Third remains zero.
- y=759.33: first two completed; destination 04 top=812.51 and third connector still zero.
- y=844: destination 04 top=727.84; connector 03→04 begins (scaleY=.016644).
- Subsequent settled observation: all three connectors scaleY=1; exactly one numbered disc per step.

Result: PASS for the observed normal-motion mobile sequence and destination-gated connector starts; no connector completed before its destination entered this viewport. Hidden initial lines and sequence 01→02, 02→03, 03→04 were observed. This is not a reduced-motion, real touch-device or all-frame certification. Viewport override was reset afterward. No actual browser zoom was changed. No application source/dependencies were changed and no full matrix was repeated. Remaining unsupported checks are intentionally deferred; no further retries are needed in this demo scope.
