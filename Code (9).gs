/**
 * AOS ERP System — Apps Script backend (FULL VERSION)
 * ------------------------------------------------------------------
 * Paste this whole file into your Google Sheet's Apps Script project
 * (Extensions > Apps Script), REPLACING everything that's currently
 * there, then Deploy > Manage deployments > Edit (pencil icon) > New
 * version > Deploy. Make sure "Who has access" is set to "Anyone".
 * The existing /exec URL keeps working — you do NOT need to change
 * APPS_SCRIPT_URL in the HTML file.
 * ------------------------------------------------------------------
 * CHANGE IN THIS VERSION (2): this project can now HOST the app's
 * front end too, not just its data. doGet() serves the "Index" HTML
 * project file whenever the URL is opened with no ?action= param —
 * see INDEX_HTML_FILE_NAME below for setup. That means the app no
 * longer needs to be a .html file emailed/shared to every employee:
 * everyone opens the same one link, and any future design/tab/code
 * change just needs Deploy > Manage deployments > New version here —
 * no file to resend. The AppSettings sheet from the previous version
 * (below) still covers the separate case of pure DATA that should
 * update live without even a redeploy — admin password, edit-voucher
 * password, cash-count denominations, and now also company branding
 * (name/tagline/website/logo) and a couple of warning-day thresholds.
 * New actions (all present since the previous version, untouched):
 *   GET  ?action=appSettings        -> { ok:true, data:{...} }
 *   POST {action:'saveAppSettings', data:{...}}
 * Every other action/sheet/column from the previous version is
 * completely untouched.
 * CHANGE IN THIS VERSION (3): the site list (Tripoli/Benghazi/Other)
 * is now DYNAMIC, stored in a new "Sites" sheet — see readSites_()/
 * saveSites() and the SITE_SEED comment below for exactly what's
 * configurable and what's deliberately locked (site codes can't change
 * once vouchers exist under them; sites are deactivated, never deleted,
 * so history and printed serials are never orphaned). New actions:
 *   GET  ?action=sites             -> { ok:true, sites:[...] }
 *   POST {action:'saveSites', sites:[...]}
 * Every other action/sheet/column from the previous version is
 * completely untouched.
 * ------------------------------------------------------------------
 * CHANGE IN THIS VERSION (4): the "Other" site was removed from the
 * seed list — new installs seed only Tripoli and Benghazi (see
 * SITE_SEED below). Also added: "Custom Lists", a generic tracking
 * list an admin can define from Settings without any code change —
 * a name plus a few fields (text/number/date/dropdown). Each list's
 * definition lives in one shared "CustomListDefs" blob; each list's
 * records live in their own sheet, auto-created on first save
 * (see customListSheetName_() below). New actions:
 *   GET  ?action=customListDefs           -> { ok:true, data:{...} }
 *   GET  ?action=customListData&listId=x  -> { ok:true, rows:[...] }
 *   POST {action:'saveCustomListDefs', data:{...}}
 *   POST {action:'customListDataSaveAll', listId:'x', rows:[...]}
 *   POST {action:'customListDeleteAll', listId:'x'}
 * Every other action/sheet/column from the previous version is
 * completely untouched.
 * ------------------------------------------------------------------
 * CHANGE IN THIS VERSION (5): added LOGIN HISTORY (Settings > Login
 * history, admin only). Every successful sign-in sends one new
 * action, using the same concurrency-safe single-row-append pattern
 * as {action:'issue'} for vouchers (LockService), so two people
 * signing in on different devices at the same instant never overwrite
 * each other's row. Stored in a new "Login History" sheet tab —
 * Name | Role | Site | Job Number | Date | Time | Timestamp. New
 * actions:
 *   GET  ?action=loginHistory -> { ok:true, rows:[
 *       { name, role, site, jobNumber, date, time, timestamp }, ...
 *     ] } — every row ever logged, across every site/device. The
 *   client filters by date range / staff member itself, same as the
 *   Monthly Log/Search screens filter 'log' client-side, so this just
 *   returns everything in the sheet.
 *   POST {action:'logLogin', name, role, site, jobNumber, date, time,
 *         timestamp} -> append one row. role is "admin" or "user".
 *         date is "YYYY-MM-DD", time is "HH:MM:SS" (both in the
 *         signed-in device's local time), timestamp is a full ISO
 *         string of the same moment, kept alongside for reference.
 * Every other action/sheet/column from the previous version is
 * completely untouched.
 * ------------------------------------------------------------------
 * CHANGE IN THIS VERSION (6): fixed a bug where setting a staff
 * member's account type to Admin in Settings > Staff appeared to not
 * save (it silently reverted to End User on reload). Cause: the Staff
 * sheet had no column to store the role, so it was dropped on every
 * save. Added a Role column to STAFF_HEADERS, wired it through
 * readStaff()/writeStaff(), and added ensureStaffRoleColumn_() which
 * automatically adds the missing column header to an existing Staff
 * sheet the first time it's read or written — no manual spreadsheet
 * edits needed, and no existing staff rows/passwords are touched.
 * Every other action/sheet/column from the previous version is
 * completely untouched.
 * ------------------------------------------------------------------
 */

// ---------------------------------------------------------------
// Site configuration — now DYNAMIC, stored in the "Sites" sheet
// (readSites_()/saveSites() further down), not hardcoded here.
// SITE_SEED below is only the one-time seed used the very first time
// that sheet is created, so existing installs keep behaving EXACTLY
// as before until an admin actually changes something in
// Settings > "Manage sites". Keep in sync with the seed the HTML
// file's SITE_OPTIONS bootstrap uses before its first successful load.
//
// Fields per site:
//   key              stable internal id, never shown, never changes
//                     once set (generated from the name the first time
//                     a site is created) — everything below is keyed
//                     off this, NOT the display name, so renaming a
//                     site is always safe.
//   displayName      editable label shown everywhere in the UI.
//   code             2-4 letter code embedded in printed voucher serials
//                     (e.g. AOS-TRP-...). LOCKED once any voucher exists
//                     for that site — see saveSites() — because changing
//                     it would break parsing of already-issued serials.
//   sheetName        the actual Google Sheet tab this site's vouchers
//                     live in. Set once at creation, never changes —
//                     renaming displayName must never move/rename
//                     historical data.
//   active           false = hidden from new-voucher/new-staff dropdowns,
//                     but every past voucher/report still shows it.
//                     Sites are never deleted from here, only deactivated,
//                     so historical data and serials are never orphaned.
//   treasuryBoxTypes which Treasury cash-box types this site has
//                     ('main', or 'main,sub'). Tripoli is the one site
//                     with a "sub" box today; new sites default to just
//                     'main' unless you add 'sub' too.
//   extraTabs        tab keys granted ONLY to staff whose site is this
//                     one (comma list, e.g. 'passports,dpmanual,residence').
//                     Empty for a site with no site-specific tabs.
var SITES_SHEET_NAME = 'Sites';
var SITES_HEADERS = ['Key', 'DisplayName', 'Code', 'Active', 'SheetName', 'TreasuryBoxTypes', 'ExtraTabs'];
var SITE_SEED = [
  { key: 'tripoli', displayName: 'Tripoli', code: 'TRP', active: true, sheetName: 'Tripoli', treasuryBoxTypes: ['main', 'sub'], extraTabs: ['passports', 'dpmanual', 'residence'] },
  { key: 'benghazi', displayName: 'Benghazi', code: 'BEN', active: true, sheetName: 'Benghazi', treasuryBoxTypes: ['main'], extraTabs: [] }
];

// 4 new columns appended at the end (Currency / LydEquivalent /
// VoucherRateUsed / VoucherRateType) — see the version note above.
var VOUCHER_HEADERS = ['Serial', 'Date', 'Type', 'Object', 'Cheque', 'PayTo', 'LinesJSON', 'Total', 'Words', 'IssuedAt', 'IssuedBy', 'Site', 'JobNumber', 'Currency', 'LydEquivalent', 'VoucherRateUsed', 'VoucherRateType'];
var RANGES_SHEET_NAME = 'Ranges';
var RANGES_HEADERS = ['Key', 'Start', 'End', 'Current'];
var STAFF_SHEET_NAME = 'Staff';
var STAFF_HEADERS = ['Name', 'Password', 'Site', 'JobNumber', 'Tabs', 'Role'];
var TREASURY_SHEET_NAME = 'Treasury';
var PDF_FOLDER_NAME = 'AOS Voucher PDFs';

// Single-JSON-blob sheet for app-wide settings (admin password,
// edit-voucher password, cash-count denominations). Same pattern as
// TREASURY_SHEET_NAME above — one JSON object stored in cell A2.
var APP_SETTINGS_SHEET_NAME = 'AppSettings';

// Login History — one row per successful sign-in (see version note
// above and logLogin_()/readLoginHistory_() further down).
var LOGIN_HISTORY_SHEET_NAME = 'Login History';
var LOGIN_HISTORY_HEADERS = ['Name', 'Role', 'Site', 'Job Number', 'Date', 'Time', 'Timestamp'];

// ---------------------------------------------------------------
// Hosting the app itself from this same Apps Script project.
// ---------------------------------------------------------------
// Name of the HTML file (Apps Script project file, NOT a Drive file)
// that holds the whole app's front end. Create it via the Apps Script
// editor: the "+" next to Files > HTML > name it exactly "Index"
// (Apps Script always shows/stores it as "Index.html"). Paste the
// app's full HTML into it. From then on, opening the deployment's
// /exec URL with no parameters (e.g. a bookmark, or a link shared
// with staff) serves that file directly — one URL, one always-current
// copy. Every future design/tab/code change: edit "Index" in the
// script editor, then Deploy > Manage deployments > Edit > New
// version > Deploy. Nobody needs a new file sent to them again.
var INDEX_HTML_FILE_NAME = 'Index';

// Prefix used for Desert Pass serial ranges in the same "Ranges" sheet
// vouchers already use. Always distinct from every voucher range key
// (those are always <SITE_CODE>_<YYYY-MM>, e.g. "TRP_2026-07" — site
// codes are only TRP/BEN/OTH, never "DP"), so there is no collision
// risk between the two numbering schemes sharing one sheet.
var DP_RANGE_PREFIX = 'DP_';

// ---------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------
function doGet(e) {
  // No ?action= param means this is a plain visit to the web app URL
  // (someone opening the link in a browser, or bookmarking it) rather
  // than an API call from the app's own JavaScript. In that case serve
  // the app's HTML page itself, straight out of this same project, so
  // there is exactly one always-current copy everyone opens — instead
  // of a .html file that has to be re-sent to every employee whenever
  // it changes. See INDEX_HTML_FILE_NAME below for the file this reads.
  if (!e || !e.parameter || !e.parameter.action) {
    return HtmlService.createHtmlOutputFromFile(INDEX_HTML_FILE_NAME)
      .setTitle('AOS ERP System')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  try {
    var action = e.parameter.action;
    switch (action) {
      case 'log':                 return jsonOut({ ok: true, log: readAllVouchers() });
      case 'ranges':               return jsonOut({ ok: true, ranges: readRanges() });
      case 'staff':                return jsonOut({ ok: true, staff: readStaff() });
      case 'treasury':             return jsonOut({ ok: true, data: readTreasury() });
      case 'appSettings':          return jsonOut({ ok: true, data: readAppSettings() });
      case 'sites':                return jsonOut({ ok: true, sites: readSites_() });

      case 'foodCost':             return jsonOut({ ok: true, data: readBlob_('FoodCost') });
      case 'foodCostLog':          return jsonOut({ ok: true, rows: readJsonRows_('FoodCostLog') });

      case 'foodStockList':        return jsonOut({ ok: true, rows: readFoodStock_() });
      case 'foodStockMoveLog':     return jsonOut({ ok: true, log: readFoodStockMoves_() });

      case 'stockSiteList':        return jsonOut({ ok: true, rows: readStockSite_() });
      case 'stockSiteMoveLog':     return jsonOut({ ok: true, log: readStockSiteMoves_() });

      case 'passportList':         return jsonOut({ ok: true, rows: readJsonRows_('Passports') });
      case 'dpLog':                return jsonOut({ ok: true, log: readJsonRows_('DesertPass') });

      case 'residenceList':        return jsonOut({ ok: true, rows: readJsonRows_('Residence') });

      case 'dpManualList':         return jsonOut({ ok: true, rows: readJsonRows_('DpManual') });
      case 'dpManualMovesList':    return jsonOut({ ok: true, rows: readJsonRows_('DpManualMoves') });

      case 'opsMgmtRoster':        return jsonOut({ ok: true, data: readBlob_('OpsRoster') });
      case 'opsMgmtDaily':         return jsonOut({ ok: true, data: readBlob_('OpsDaily') });

      // ---- Custom Lists (generic admin-defined tracking lists) ----
      case 'customListDefs':       return jsonOut({ ok: true, data: readBlob_('CustomListDefs') });
      case 'customListData':       return jsonOut({ ok: true, rows: readJsonRows_(customListSheetName_(e.parameter.listId)) });

      // ---- Login history (Settings > Login history, admin only) ----
      case 'loginHistory':         return jsonOut({ ok: true, rows: readLoginHistory_() });

      default:
        return jsonOut({ ok: false, error: 'Unknown or missing action: ' + action });
    }
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    switch (payload.action) {
      // ---- existing (vouchers / staff / ranges / treasury) ----
      case 'issue':                 return jsonOut(issueVoucher(payload));
      case 'saveRange':             return jsonOut(saveRange(payload));
      case 'clearLog':              clearAllVouchers(); return jsonOut({ ok: true });
      case 'saveStaff':             writeStaff(payload.staff || {}); return jsonOut({ ok: true });
      case 'updateVoucher':         return jsonOut(updateVoucher(payload));
      case 'deleteVoucher':         return jsonOut(deleteVoucher(payload));
      case 'saveTreasury':          writeTreasury(payload.data || {}); return jsonOut({ ok: true });
      case 'uploadPdf':             return jsonOut(uploadPdf(payload));

      // ---- App-wide settings (admin password / edit-voucher
      // password / cash-count denominations) ----
      case 'saveAppSettings':       writeAppSettings(payload.data || {}); return jsonOut({ ok: true });

      // ---- Dynamic site list (add/deactivate/relabel sites) ----
      case 'saveSites':             return jsonOut(saveSites(payload.sites || []));

      // ---- Desert Pass serial (atomic, shared) ----
      case 'nextDpSerial':          return jsonOut(nextDesertPassSerial(payload));

      // ---- Food Cost ----
      case 'saveFoodCost':          writeBlob_('FoodCost', payload.data || {}); return jsonOut({ ok: true });
      case 'saveFoodCostLog':       writeJsonRows_('FoodCostLog', payload.rows || []); return jsonOut({ ok: true });

      // ---- Food Stock ----
      case 'foodStockSaveAll':      writeFoodStock_(payload.rows || []); return jsonOut({ ok: true });
      case 'foodStockMoveSave':     appendFoodStockMove_(payload.move || {}); return jsonOut({ ok: true });
      case 'foodStockMoveDelete':   deleteFoodStockMove_(payload.site, payload.id); return jsonOut({ ok: true });
      case 'foodStockClearMoveLog': clearSheetRows_('FoodStockMoves'); return jsonOut({ ok: true });

      // ---- Stock by site (Food + Clothes) ----
      case 'stockSiteSaveAll':      writeStockSite_(payload.rows || []); return jsonOut({ ok: true });
      case 'stockSiteMoveSave':     appendStockSiteMove_(payload.category, payload.site, payload.move || {}); return jsonOut({ ok: true });
      case 'stockSiteMoveDelete':   deleteStockSiteMove_(payload.category, payload.site, payload.id); return jsonOut({ ok: true });
      case 'stockSiteClearMoveLog': clearStockSiteMovesForCategory_(payload.category); return jsonOut({ ok: true });

      // ---- Passports ----
      case 'passportSaveAll':       writeJsonRows_('Passports', payload.rows || []); return jsonOut({ ok: true });

      // ---- Desert Pass (generator log) ----
      case 'dpSave':                appendJsonRow_('DesertPass', payload.pass || {}); return jsonOut({ ok: true });

      // ---- Residence ----
      case 'residenceSaveAll':      writeJsonRows_('Residence', payload.rows || []); return jsonOut({ ok: true });

      // ---- Desert Pass manual log ----
      case 'dpManualSaveAll':       writeJsonRows_('DpManual', payload.rows || []); return jsonOut({ ok: true });
      case 'dpManualMovesSaveAll':  writeJsonRows_('DpManualMoves', payload.rows || []); return jsonOut({ ok: true });

      // ---- Operation Management ----
      case 'opsMgmtSaveRoster':     writeBlob_('OpsRoster', payload.data || {}); return jsonOut({ ok: true });
      case 'opsMgmtSaveDaily':      writeBlob_('OpsDaily', payload.data || {}); return jsonOut({ ok: true });

      // ---- Custom Lists (generic admin-defined tracking lists) ----
      case 'saveCustomListDefs':    writeBlob_('CustomListDefs', payload.data || {}); return jsonOut({ ok: true });
      case 'customListDataSaveAll': writeJsonRows_(customListSheetName_(payload.listId), payload.rows || []); return jsonOut({ ok: true });
      case 'customListDeleteAll':   clearSheetRows_(customListSheetName_(payload.listId)); return jsonOut({ ok: true });

      // ---- Login history (Settings > Login history, admin only) ----
      case 'logLogin':              return jsonOut(logLogin_(payload));

      default:
        return jsonOut({ ok: false, error: 'Unknown action: ' + payload.action });
    }
  } catch (err) {
    return jsonOut({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------
// Generic sheet helpers (used by the new modules below)
// ---------------------------------------------------------------
function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }

function getOrCreateSheet_(name, headers) {
  var sh = ss_().getSheetByName(name);
  if (!sh) {
    sh = ss_().insertSheet(name);
    sh.appendRow(headers || ['Data']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function clearSheetRows_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh) return;
  var lastRow = sh.getLastRow();
  if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
}

// ---- "Blob" pattern (one JSON object per sheet, e.g. Treasury) ----
function readBlob_(sheetName) {
  var sh = getOrCreateSheet_(sheetName, ['Data']);
  var raw = sh.getRange(2, 1).getValue();
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (e) { return {}; }
}
function writeBlob_(sheetName, dataObj) {
  var sh = getOrCreateSheet_(sheetName, ['Data']);
  sh.getRange(2, 1).setValue(JSON.stringify(dataObj));
}

// ---- "JSON rows" pattern (one JSON object per ROW, generic shape) ----
function readJsonRows_(sheetName) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    try { out.push(JSON.parse(data[r][0])); } catch (e) { /* skip bad row */ }
  }
  return out;
}
function writeJsonRows_(sheetName, rows) {
  var sh = getOrCreateSheet_(sheetName, ['Record (JSON)', 'Preview']);
  clearSheetRows_(sheetName);
  if (!rows.length) return;
  var out = rows.map(function (r) { return [JSON.stringify(r), previewOf_(r)]; });
  sh.getRange(2, 1, out.length, 2).setValues(out);
}
function appendJsonRow_(sheetName, row) {
  var sh = getOrCreateSheet_(sheetName, ['Record (JSON)', 'Preview']);
  sh.appendRow([JSON.stringify(row), previewOf_(row)]);
}
function previewOf_(r) {
  if (!r || typeof r !== 'object') return String(r);
  var bits = [];
  ['name', 'serial', 'passport', 'empId', 'idx', 'date', 'site'].forEach(function (k) {
    if (r[k] !== undefined && r[k] !== '') bits.push(r[k]);
  });
  return bits.join(' — ');
}

// ---------------------------------------------------------------
// Sites (dynamic list — add/deactivate/relabel from Settings)
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Custom Lists — generic admin-defined tracking lists (Settings >
// "Custom Lists"). One CustomListDefs blob holds every list's
// definition (name + fields); each list's actual records live in
// their own dedicated sheet ("CL_" + listId), written/read exactly
// like Passports/Residence/DpManual above (writeJsonRows_/
// readJsonRows_, full-array overwrite per save) — no schema changes
// here are ever needed when someone adds a new list from the UI.
// ---------------------------------------------------------------
function customListSheetName_(listId) {
  return 'CL_' + slugify_(String(listId || 'list'));
}

function slugify_(name) {
  var s = String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return s || 'site';
}
function readSites_() {
  var sh = ss_().getSheetByName(SITES_SHEET_NAME);
  if (!sh) {
    sh = ss_().insertSheet(SITES_SHEET_NAME);
    sh.appendRow(SITES_HEADERS);
    sh.setFrozenRows(1);
    var seedRows = SITE_SEED.map(function (s) {
      return [s.key, s.displayName, s.code, true, s.sheetName, s.treasuryBoxTypes.join(','), s.extraTabs.join(',')];
    });
    sh.getRange(2, 1, seedRows.length, SITES_HEADERS.length).setValues(seedRows);
  }
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      key: data[r][0],
      displayName: data[r][1] || data[r][0],
      code: data[r][2] || 'GEN',
      active: data[r][3] === true || String(data[r][3]).toUpperCase() === 'TRUE',
      sheetName: data[r][4] || data[r][1] || data[r][0],
      treasuryBoxTypes: String(data[r][5] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      extraTabs: String(data[r][6] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean)
    });
  }
  return out;
}
// Every voucher-carrying sheet, past and present, for a given site — used
// by readAllVouchers()/clearAllVouchers() so a DEACTIVATED site's history
// still shows up in the log/reports; only new-entry dropdowns hide it.
function allSiteSheetNames_() {
  return readSites_().map(function (s) { return s.sheetName; });
}
function siteByDisplayName_(displayName) {
  var sites = readSites_();
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].displayName === displayName || sites[i].key === displayName) return sites[i];
  }
  return null;
}
function saveSites(sitesPayload) {
  if (!Array.isArray(sitesPayload) || !sitesPayload.length) {
    return { ok: false, error: 'At least one site is required.' };
  }
  var existing = readSites_();
  var existingByKey = {};
  existing.forEach(function (s) { existingByKey[s.key] = s; });

  // ---- validate before writing anything ----
  var seenCodes = {};
  var rowsOut = [];
  for (var i = 0; i < sitesPayload.length; i++) {
    var incoming = sitesPayload[i] || {};
    var displayName = String(incoming.displayName || '').trim();
    var code = String(incoming.code || '').trim().toUpperCase();
    if (!displayName) return { ok: false, error: 'Every site needs a name.' };
    if (!/^[A-Z]{2,4}$/.test(code)) return { ok: false, error: 'Site "' + displayName + '": code must be 2-4 letters (e.g. TRP).' };
    if (code === 'DP') return { ok: false, error: 'Site "' + displayName + '": the code "DP" is reserved for Desert Pass serials — pick another.' };
    if (seenCodes[code]) return { ok: false, error: 'Site code "' + code + '" is used more than once — codes must be unique.' };
    seenCodes[code] = true;

    var key = incoming.key && existingByKey[incoming.key] ? incoming.key : null;
    var prior = key ? existingByKey[key] : null;

    if (prior && prior.code !== code) {
      // Changing a site's code after it has issued vouchers would break
      // parsing of every serial already printed/handed out under the old
      // code, so this is locked rather than silently allowed.
      var siteSheet = ss_().getSheetByName(prior.sheetName);
      var hasVouchers = siteSheet && siteSheet.getLastRow() > 1;
      var hasRanges = false;
      var rangesSheet = ss_().getSheetByName(RANGES_SHEET_NAME);
      if (rangesSheet) {
        var rangesData = rangesSheet.getDataRange().getValues();
        for (var rr = 1; rr < rangesData.length; rr++) {
          if (String(rangesData[rr][0] || '').indexOf(prior.code + '_') === 0) { hasRanges = true; break; }
        }
      }
      if (hasVouchers || hasRanges) {
        return { ok: false, error: 'Site "' + displayName + '": its code ("' + prior.code + '") can\'t be changed anymore — vouchers already exist under it. Deactivate it and add a new site instead if you need a different code.' };
      }
    }

    var newKey = key || slugify_(displayName);
    // Guard against a slugified-name collision with a different existing key.
    if (!key) {
      var suffix = 1;
      while (existingByKey[newKey] && existingByKey[newKey].displayName !== displayName) {
        newKey = slugify_(displayName) + '_' + (++suffix);
      }
    }
    var sheetName = prior ? prior.sheetName : displayName;
    var treasuryBoxTypes = Array.isArray(incoming.treasuryBoxTypes) ? incoming.treasuryBoxTypes.filter(function (t) { return t === 'main' || t === 'sub'; }) : [];
    var extraTabs = Array.isArray(incoming.extraTabs) ? incoming.extraTabs.map(String) : [];

    rowsOut.push([newKey, displayName, code, incoming.active !== false, sheetName, treasuryBoxTypes.join(','), extraTabs.join(',')]);
  }

  var sh = getOrCreateSheet_(SITES_SHEET_NAME, SITES_HEADERS);
  var lastRow = sh.getLastRow();
  if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
  sh.getRange(2, 1, rowsOut.length, SITES_HEADERS.length).setValues(rowsOut);
  return { ok: true, sites: readSites_() };
}

// ---------------------------------------------------------------
// Vouchers (issue / read / update / delete / clear)
// ---------------------------------------------------------------
function siteCodeFor_(site) {
  var s = siteByDisplayName_(site);
  return s ? s.code : 'GEN';
}
function sheetNameForSite_(site) {
  var s = siteByDisplayName_(site);
  return s ? s.sheetName : 'Other';
}
function findVoucherRow_(serial) {
  var m = /^AOS-([A-Za-z]+)-/.exec(serial);
  var sites = readSites_();
  var candidateSheets = sites.map(function (s) { return s.sheetName; });
  if (m) {
    var preferredSite = sites.filter(function (s) { return s.code === m[1]; })[0];
    if (preferredSite) {
      candidateSheets = [preferredSite.sheetName].concat(candidateSheets.filter(function (s) { return s !== preferredSite.sheetName; }));
    }
  }
  for (var i = 0; i < candidateSheets.length; i++) {
    var sh = getOrCreateSheet_(candidateSheets[i], VOUCHER_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (data[r][0] === serial) return { sheet: sh, rowIndex: r + 1, row: data[r] };
    }
  }
  return null;
}
function pad_(n, len) {
  var s = String(n);
  while (s.length < len) s = '0' + s;
  return s;
}
// row indices: 0 Serial,1 Date,2 Type,3 Object,4 Cheque,5 PayTo,6 LinesJSON,
// 7 Total,8 Words,9 IssuedAt,10 IssuedBy,11 Site,12 JobNumber,
// 13 Currency,14 LydEquivalent,15 VoucherRateUsed,16 VoucherRateType
function rowToVoucher_(row, siteSheetName) {
  var lines = [];
  try { lines = JSON.parse(row[6] || '[]'); } catch (e) { lines = []; }
  return {
    serial: row[0], date: row[1], type: row[2], object: row[3], cheque: row[4], payto: row[5],
    lines: lines, total: Number(row[7]) || 0, words: row[8], issuedAt: row[9], issuedBy: row[10],
    issuedBySite: row[11] || siteSheetName, issuedByJobNumber: row[12],
    // Blank on older rows saved before this column existed — the app
    // already treats a missing/blank currency as LYD, so this keeps
    // old vouchers behaving exactly as before.
    currency: row[13] || 'LYD',
    lydEquivalent: (row[14] !== undefined && row[14] !== '') ? Number(row[14]) : null,
    voucherRateUsed: (row[15] !== undefined && row[15] !== '') ? Number(row[15]) : null,
    voucherRateType: row[16] || null
  };
}
function readAllVouchers() {
  var all = [];
  allSiteSheetNames_().forEach(function (siteName) {
    var sh = getOrCreateSheet_(siteName, VOUCHER_HEADERS);
    var data = sh.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (!data[r][0]) continue;
      all.push(rowToVoucher_(data[r], siteName));
    }
  });
  return all;
}
function clearAllVouchers() {
  allSiteSheetNames_().forEach(function (siteName) {
    var sh = getOrCreateSheet_(siteName, VOUCHER_HEADERS);
    var lastRow = sh.getLastRow();
    if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
  });
}
function issueVoucher(payload) {
  var required = ['date', 'object', 'payto', 'type', 'lines', 'total', 'words'];
  for (var i = 0; i < required.length; i++) {
    if (payload[required[i]] === undefined || payload[required[i]] === null) {
      return { ok: false, error: 'Missing field: ' + required[i] };
    }
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var site = payload.issuedBySite || '';
    var siteRecord = siteByDisplayName_(site);
    if (siteRecord && !siteRecord.active) {
      return { ok: false, error: 'Site "' + site + '" is deactivated — reactivate it in Settings > "Manage sites" before issuing vouchers under it.' };
    }
    var siteCode = siteCodeFor_(site);
    var sheetName = sheetNameForSite_(site);
    var mKey = String(payload.date).slice(0, 7);
    var rangeKey = siteCode + '_' + mKey;
    var rangesSheet = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var rangesData = rangesSheet.getDataRange().getValues();
    var rangeRowIndex = -1;
    var start = 1, end = 99999, current = 1;
    for (var r = 1; r < rangesData.length; r++) {
      if (rangesData[r][0] === rangeKey) {
        rangeRowIndex = r + 1;
        start = Number(rangesData[r][1]) || 1;
        end = Number(rangesData[r][2]) || 99999;
        current = Number(rangesData[r][3]) || start;
        break;
      }
    }
    var seq = current;
    if (seq > end) {
      return { ok: false, error: 'Sequence range exhausted for ' + site + ' (' + mKey + '). Extend it in Serial Settings.' };
    }
    var d = String(payload.date);
    var ddmmyy = d.slice(8, 10) + d.slice(5, 7) + d.slice(2, 4);
    var serial = 'AOS-' + siteCode + '-' + ddmmyy + '-' + pad_(seq, 5);
    var voucherSheet = getOrCreateSheet_(sheetName, VOUCHER_HEADERS);
    voucherSheet.appendRow([
      serial, payload.date, payload.type, payload.object, payload.cheque || '', payload.payto,
      JSON.stringify(payload.lines || []), payload.total, payload.words, new Date().toISOString(),
      payload.issuedBy || '', site, payload.issuedByJobNumber || '',
      payload.currency || 'LYD',
      (payload.lydEquivalent !== undefined && payload.lydEquivalent !== null) ? payload.lydEquivalent : '',
      (payload.voucherRateUsed !== undefined && payload.voucherRateUsed !== null) ? payload.voucherRateUsed : '',
      payload.voucherRateType || ''
    ]);
    if (rangeRowIndex === -1) {
      rangesSheet.appendRow([rangeKey, start, end, seq + 1]);
    } else {
      rangesSheet.getRange(rangeRowIndex, 4).setValue(seq + 1);
    }
    return { ok: true, serial: serial };
  } finally {
    lock.releaseLock();
  }
}
function updateVoucher(payload) {
  var found = findVoucherRow_(payload.serial);
  if (!found) return { ok: false, error: 'Voucher not found: ' + payload.serial };
  var sh = found.sheet;
  var rowIndex = found.rowIndex;
  var existing = found.row;
  // Currency/LydEquivalent/VoucherRateUsed/VoucherRateType (13-16) are
  // never sent by the "edit voucher" screen — a voucher's currency
  // isn't editable after issuing — so they're always carried over
  // unchanged from the existing row here, same as Site/JobNumber.
  sh.getRange(rowIndex, 1, 1, VOUCHER_HEADERS.length).setValues([[
    existing[0],
    payload.date !== undefined ? payload.date : existing[1],
    payload.type !== undefined ? payload.type : existing[2],
    payload.object !== undefined ? payload.object : existing[3],
    payload.cheque !== undefined ? payload.cheque : existing[4],
    payload.payto !== undefined ? payload.payto : existing[5],
    payload.lines !== undefined ? JSON.stringify(payload.lines) : existing[6],
    payload.total !== undefined ? payload.total : existing[7],
    payload.words !== undefined ? payload.words : existing[8],
    existing[9], existing[10], existing[11], existing[12],
    existing[13], existing[14], existing[15], existing[16]
  ]]);
  var updatedRow = sh.getRange(rowIndex, 1, 1, VOUCHER_HEADERS.length).getValues()[0];
  return { ok: true, voucher: rowToVoucher_(updatedRow, sh.getName()) };
}
function deleteVoucher(payload) {
  var found = findVoucherRow_(payload.serial);
  if (!found) return { ok: false, error: 'Voucher not found: ' + payload.serial };
  found.sheet.deleteRow(found.rowIndex);
  return { ok: true };
}

// ---------------------------------------------------------------
// Sequence ranges (per site + month)
// ---------------------------------------------------------------
function readRanges() {
  var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
  var data = sh.getDataRange().getValues();
  var out = {};
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out[data[r][0]] = { start: Number(data[r][1]) || 1, end: Number(data[r][2]) || 99999, current: Number(data[r][3]) || 1 };
  }
  return out;
}
function saveRange(payload) {
  var site = payload.site || '';
  var siteCode = siteCodeFor_(site);
  var key = siteCode + '_' + payload.month;
  var start = Number(payload.start) || 1;
  var end = Number(payload.end) || 99999;
  var sh = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
  var data = sh.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (data[r][0] === key) {
      sh.getRange(r + 1, 2, 1, 3).setValues([[start, end, start]]);
      return { ok: true };
    }
  }
  sh.appendRow([key, start, end, start]);
  return { ok: true };
}

// ---------------------------------------------------------------
// Desert Pass serial numbers — atomic, shared
// ---------------------------------------------------------------
// Same range-sheet + script-lock mechanism as issueVoucher() above, so
// two people generating a Desert Pass at the same moment from two
// different computers can never receive the same serial number. Keeps
// the exact same visible format the app already used locally:
// AOS-DP-DDMMYY-XXXX (4-digit sequence, resets at the start of a new
// range if you ever choose to reset it — by default it just keeps
// counting up forever, same as the old local counter did).
function nextDesertPassSerial(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var d = String(payload.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
    var mKey = d.slice(0, 7); // "YYYY-MM"
    var rangeKey = DP_RANGE_PREFIX + mKey;
    var rangesSheet = getOrCreateSheet_(RANGES_SHEET_NAME, RANGES_HEADERS);
    var rangesData = rangesSheet.getDataRange().getValues();
    var rangeRowIndex = -1;
    var start = 1, end = 999999, current = 1;
    for (var r = 1; r < rangesData.length; r++) {
      if (rangesData[r][0] === rangeKey) {
        rangeRowIndex = r + 1;
        start = Number(rangesData[r][1]) || 1;
        end = Number(rangesData[r][2]) || 999999;
        current = Number(rangesData[r][3]) || start;
        break;
      }
    }
    var seq = current;
    if (seq > end) {
      return { ok: false, error: 'Desert Pass sequence range exhausted for ' + mKey + '.' };
    }
    var ddmmyy = d.slice(8, 10) + d.slice(5, 7) + d.slice(2, 4);
    var serial = 'AOS-DP-' + ddmmyy + '-' + pad_(seq, 4);
    if (rangeRowIndex === -1) {
      rangesSheet.appendRow([rangeKey, start, end, seq + 1]);
    } else {
      rangesSheet.getRange(rangeRowIndex, 4).setValue(seq + 1);
    }
    return { ok: true, serial: serial };
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------
// Staff accounts
// ---------------------------------------------------------------
// Older spreadsheets had a Staff sheet created before the Role column
// existed (Name|Password|Site|JobNumber|Tabs only), so getOrCreateSheet_
// never adds it — that sheet already exists, headers are only written
// once at creation. This tops up the header row in place so the Role
// column appears without disturbing any existing staff rows/passwords;
// any row without a Role value simply reads as 'user', same as before.
function ensureStaffRoleColumn_(sh) {
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers[STAFF_HEADERS.length - 1] !== 'Role') {
    sh.getRange(1, STAFF_HEADERS.length).setValue('Role');
  }
}
function readStaff() {
  var sh = getOrCreateSheet_(STAFF_SHEET_NAME, STAFF_HEADERS);
  ensureStaffRoleColumn_(sh);
  var data = sh.getDataRange().getValues();
  var out = {};
  for (var r = 1; r < data.length; r++) {
    var name = data[r][0];
    if (!name) continue;
    var tabs = String(data[r][4] || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    out[name] = {
      pass: data[r][1] || '', site: data[r][2] || '', jobNumber: data[r][3] || '',
      tabs: tabs.length ? tabs : ['new', 'log', 'search', 'cashflow', 'treasury', 'settings'],
      role: data[r][5] === 'admin' ? 'admin' : 'user'
    };
  }
  return out;
}
function writeStaff(staffObj) {
  var sh = getOrCreateSheet_(STAFF_SHEET_NAME, STAFF_HEADERS);
  ensureStaffRoleColumn_(sh);
  var lastRow = sh.getLastRow();
  if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
  var rows = Object.keys(staffObj).map(function (name) {
    var entry = staffObj[name];
    return [name, entry.pass || '', entry.site || '', entry.jobNumber || '', (entry.tabs || []).join(','), entry.role === 'admin' ? 'admin' : 'user'];
  });
  if (rows.length) sh.getRange(2, 1, rows.length, STAFF_HEADERS.length).setValues(rows);
}

// ---------------------------------------------------------------
// Treasury (single JSON blob)
// ---------------------------------------------------------------
function readTreasury() { return readBlob_(TREASURY_SHEET_NAME); }
function writeTreasury(dataObj) { writeBlob_(TREASURY_SHEET_NAME, dataObj); }

// ---------------------------------------------------------------
// App-wide settings (single JSON blob) — admin password, edit-voucher
// password, cash-count denominations. Same "bootstrap fallback in the
// HTML file, sheet is the real source once saved" pattern as
// STAFF_USERS: readAppSettings() returns {} until someone opens
// Settings > "App settings" in the app and saves once, after which
// the sheet becomes the source of truth for every device.
// ---------------------------------------------------------------
function readAppSettings() { return readBlob_(APP_SETTINGS_SHEET_NAME); }
function writeAppSettings(dataObj) { writeBlob_(APP_SETTINGS_SHEET_NAME, dataObj); }

// ---------------------------------------------------------------
// Login History (Settings > Login history, admin only) — one row per
// successful sign-in. Uses the same LockService pattern as
// issueVoucher()/nextDesertPassSerial() above so two people signing in
// on different devices at the same instant never clobber each other's
// row (appendRow is generally safe on its own, but the lock keeps this
// consistent with every other "one shared row per event" action).
// ---------------------------------------------------------------
function readLoginHistory_() {
  var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      name: String(data[r][0] || ''),
      role: String(data[r][1] || 'user'),
      site: String(data[r][2] || ''),
      jobNumber: String(data[r][3] || ''),
      date: String(data[r][4] || ''),
      time: String(data[r][5] || ''),
      timestamp: String(data[r][6] || '')
    });
  }
  return out;
}
function logLogin_(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
    sh.appendRow([
      payload.name || '',
      payload.role || 'user',
      payload.site || '',
      payload.jobNumber || '',
      payload.date || '',
      payload.time || '',
      payload.timestamp || new Date().toISOString()
    ]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------
// PDF upload
// ---------------------------------------------------------------
function uploadPdf(payload) {
  var folders = DriveApp.getFoldersByName(PDF_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PDF_FOLDER_NAME);
  var base64 = String(payload.base64 || '').replace(/^data:application\/pdf;base64,/, '');
  var bytes = Utilities.base64Decode(base64);
  var blob = Utilities.newBlob(bytes, 'application/pdf', (payload.filename || 'voucher') + '.pdf');
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, viewUrl: file.getUrl() };
}

// ---------------------------------------------------------------
// Food Stock (explicit columns — full snapshot + move log)
// ---------------------------------------------------------------
var FOOD_STOCK_HEADERS = ['Site', 'ItemId', 'Name', 'Unit', 'Qty', 'Reorder'];
var FOOD_STOCK_MOVES_HEADERS = ['Id', 'Site', 'Date', 'ItemId', 'ItemName', 'QtyIn', 'QtyOut', 'Notes'];

function readFoodStock_() {
  var sh = ss_().getSheetByName('FoodStock');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0] && !data[r][1]) continue;
    out.push({ site: data[r][0], itemId: data[r][1], name: data[r][2], unit: data[r][3], qty: data[r][4], reorder: data[r][5] });
  }
  return out;
}
function writeFoodStock_(rows) {
  var sh = getOrCreateSheet_('FoodStock', FOOD_STOCK_HEADERS);
  clearSheetRows_('FoodStock');
  if (!rows.length) return;
  var out = rows.map(function (r) { return [r.site || '', r.itemId || '', r.name || '', r.unit || '', r.qty || 0, r.reorder || 0]; });
  sh.getRange(2, 1, out.length, FOOD_STOCK_HEADERS.length).setValues(out);
}
function readFoodStockMoves_() {
  var sh = ss_().getSheetByName('FoodStockMoves');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({ id: data[r][0], site: data[r][1], date: data[r][2], itemId: data[r][3], itemName: data[r][4], qtyIn: data[r][5], qtyOut: data[r][6], notes: data[r][7] });
  }
  return out;
}
function appendFoodStockMove_(move) {
  var sh = getOrCreateSheet_('FoodStockMoves', FOOD_STOCK_MOVES_HEADERS);
  sh.appendRow([move.id || '', move.site || '', move.date || '', move.itemId || '', move.itemName || '', move.qtyIn || 0, move.qtyOut || 0, move.notes || '']);
}
function deleteFoodStockMove_(site, id) {
  var sh = ss_().getSheetByName('FoodStockMoves');
  if (!sh) return;
  var data = sh.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    if (data[r][0] === id && data[r][1] === site) { sh.deleteRow(r + 1); break; }
  }
}

// ---------------------------------------------------------------
// Stock by site — Food + Clothes (explicit columns)
// ---------------------------------------------------------------
var STOCK_SITE_HEADERS = ['Category', 'Site', 'ItemId', 'Name', 'Colour', 'Size', 'Package', 'PriceBasis', 'BasisLabel', 'Unit', 'Qty', 'Price', 'Reorder'];
var STOCK_SITE_MOVES_HEADERS = ['Category', 'Site', 'Id', 'Date', 'ItemId', 'Content', 'QtyIn', 'QtyOut', 'Notes'];

function readStockSite_() {
  var sh = ss_().getSheetByName('StockSite');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0] && !data[r][2]) continue;
    out.push({
      category: data[r][0], site: data[r][1], itemId: data[r][2], name: data[r][3], colour: data[r][4],
      size: data[r][5], package: data[r][6], priceBasis: data[r][7], basisLabel: data[r][8],
      unit: data[r][9], qty: data[r][10], price: data[r][11], reorder: data[r][12]
    });
  }
  return out;
}
function writeStockSite_(rows) {
  var sh = getOrCreateSheet_('StockSite', STOCK_SITE_HEADERS);
  clearSheetRows_('StockSite');
  if (!rows.length) return;
  var out = rows.map(function (r) {
    return [r.category || '', r.site || '', r.itemId || '', r.name || '', r.colour || '', r.size || '',
      r.package || '', r.priceBasis || '', r.basisLabel || '', r.unit || '', r.qty || 0, r.price || 0, r.reorder || 0];
  });
  sh.getRange(2, 1, out.length, STOCK_SITE_HEADERS.length).setValues(out);
}
function readStockSiteMoves_() {
  var sh = ss_().getSheetByName('StockSiteMoves');
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][2]) continue;
    out.push({ category: data[r][0], site: data[r][1], id: data[r][2], date: data[r][3], itemId: data[r][4], content: data[r][5], qtyIn: data[r][6], qtyOut: data[r][7], notes: data[r][8] });
  }
  return out;
}
function appendStockSiteMove_(category, site, move) {
  var sh = getOrCreateSheet_('StockSiteMoves', STOCK_SITE_MOVES_HEADERS);
  sh.appendRow([category || '', site || '', move.id || '', move.date || '', move.itemId || '', move.content || '', move.qtyIn || 0, move.qtyOut || 0, move.notes || '']);
}
function deleteStockSiteMove_(category, site, id) {
  var sh = ss_().getSheetByName('StockSiteMoves');
  if (!sh) return;
  var data = sh.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    if (data[r][2] === id && data[r][0] === category && data[r][1] === site) { sh.deleteRow(r + 1); break; }
  }
}
function clearStockSiteMovesForCategory_(category) {
  var sh = ss_().getSheetByName('StockSiteMoves');
  if (!sh) return;
  var data = sh.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    if (!category || data[r][0] === category) sh.deleteRow(r + 1);
  }
}
