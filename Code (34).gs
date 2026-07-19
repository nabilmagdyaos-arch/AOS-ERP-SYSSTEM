var SITES_SHEET_NAME = 'Sites';
var SITES_HEADERS = ['Key', 'DisplayName', 'Code', 'Active', 'SheetName', 'TreasuryBoxTypes', 'ExtraTabs'];
var SITE_SEED = [
  { key: 'tripoli', displayName: 'Tripoli', code: 'TRP', active: true, sheetName: 'Tripoli', treasuryBoxTypes: ['main', 'sub'], extraTabs: ['passports', 'dpmanual', 'residence'] },
  { key: 'benghazi', displayName: 'Benghazi', code: 'BEN', active: true, sheetName: 'Benghazi', treasuryBoxTypes: ['main'], extraTabs: [] }
];

var VOUCHER_HEADERS = ['Serial', 'Date', 'Type', 'Object', 'Cheque', 'PayTo', 'LinesJSON', 'Total', 'Words', 'IssuedAt', 'IssuedBy', 'Site', 'JobNumber', 'Currency', 'LydEquivalent', 'VoucherRateUsed', 'VoucherRateType', 'Account', 'ContraAccount'];
var RANGES_SHEET_NAME = 'Ranges';
var RANGES_HEADERS = ['Key', 'Start', 'End', 'Current'];
var STAFF_SHEET_NAME = 'Staff';
var STAFF_HEADERS = ['Name', 'Password', 'Site', 'JobNumber', 'Tabs', 'Role'];
var TREASURY_SHEET_NAME = 'Treasury';
var PDF_FOLDER_NAME = 'AOS Voucher PDFs';

var APP_SETTINGS_SHEET_NAME = 'AppSettings';

var LOGIN_HISTORY_SHEET_NAME = 'Login History';
// 'Type' (login/logout) was added after this sheet was first used in production —
// ensureLoginHistoryTypeColumn_() migrates any sheet created before this column existed.
var LOGIN_HISTORY_HEADERS = ['Name', 'Role', 'Site', 'Job Number', 'Date', 'Time', 'Timestamp', 'Type'];

var CHART_OF_ACCOUNTS_SHEET_NAME = 'Chart Of Accounts';
var CHART_OF_ACCOUNTS_HEADERS = ['Code', 'Name', 'Type', 'Active'];
var CHART_OF_ACCOUNTS_SEED = [
  { code: '1010', name: 'Cash - Main Box',                    type: 'Asset' },
  { code: '1020', name: 'Cash - Sub Box',                      type: 'Asset' },
  { code: '1030', name: 'Bank Account',                        type: 'Asset' },
  { code: '1100', name: 'Accounts Receivable',                 type: 'Asset' },
  { code: '1150', name: 'Employee Advances',                   type: 'Asset' },
  { code: '1200', name: 'Prepaid Expenses',                    type: 'Asset' },
  { code: '1300', name: 'Food & Supplies Inventory',           type: 'Asset' },
  { code: '1310', name: 'Clothing & Uniform Stock',            type: 'Asset' },
  { code: '1500', name: 'Fixed Assets',                        type: 'Asset' },
  { code: '1510', name: 'Vehicles',                            type: 'Asset' },
  { code: '1520', name: 'Equipment & Machinery',                type: 'Asset' },
  { code: '1530', name: 'Furniture & Office Equipment',        type: 'Asset' },
  { code: '1540', name: 'Buildings & Leasehold Improvements',  type: 'Asset' },
  { code: '1580', name: 'Accumulated Depreciation',            type: 'Asset' },
  { code: '1900', name: 'Other Assets',                        type: 'Asset' },
  { code: '2010', name: 'Accounts Payable',                    type: 'Liability' },
  { code: '2020', name: 'Payroll Payable',                     type: 'Liability' },
  { code: '2030', name: 'Taxes Payable',                       type: 'Liability' },
  { code: '2040', name: 'Social Security Payable',             type: 'Liability' },
  { code: '2100', name: 'Accrued Expenses',                    type: 'Liability' },
  { code: '2200', name: 'Loans Payable',                       type: 'Liability' },
  { code: '2900', name: 'Other Liabilities',                   type: 'Liability' },
  { code: '3010', name: "Owner's Capital",                     type: 'Equity' },
  { code: '3020', name: "Owner's Drawings",                    type: 'Equity' },
  { code: '3900', name: 'Retained Earnings',                   type: 'Equity' },
  { code: '4010', name: 'Cash Receipts - Main',                type: 'Revenue' },
  { code: '4020', name: 'Cash Receipts - Sub',                 type: 'Revenue' },
  { code: '4030', name: 'Bank Receipts',                       type: 'Revenue' },
  { code: '4040', name: 'Contract Revenue',                    type: 'Revenue' },
  { code: '4100', name: 'Interest Income',                     type: 'Revenue' },
  { code: '4110', name: 'Foreign Exchange Gain',               type: 'Revenue' },
  { code: '4900', name: 'Other Income',                        type: 'Revenue' },
  { code: '5010', name: 'Cash Payments',                       type: 'Expense' },
  { code: '5020', name: 'Bank Payments',                       type: 'Expense' },
  { code: '5030', name: 'Petty Cash Expenses',                 type: 'Expense' },
  { code: '5040', name: 'Payroll / Pay Slips',                 type: 'Expense' },
  { code: '5050', name: 'Advance Payments',                    type: 'Expense' },
  { code: '5060', name: 'Settlements',                         type: 'Expense' },
  { code: '5070', name: 'Refunds',                             type: 'Expense' },
  { code: '5100', name: 'Rent Expense',                        type: 'Expense' },
  { code: '5110', name: 'Utilities Expense',                   type: 'Expense' },
  { code: '5120', name: 'Communication & Internet Expense',    type: 'Expense' },
  { code: '5130', name: 'Fuel & Transportation Expense',       type: 'Expense' },
  { code: '5140', name: 'Vehicle Maintenance & Repairs',       type: 'Expense' },
  { code: '5150', name: 'Office Supplies & Stationery',        type: 'Expense' },
  { code: '5160', name: 'Food & Catering Expense',             type: 'Expense' },
  { code: '5170', name: 'Uniforms & Clothing Expense',         type: 'Expense' },
  { code: '5180', name: 'Medical & Insurance Expense',         type: 'Expense' },
  { code: '5190', name: 'Professional & Legal Fees',           type: 'Expense' },
  { code: '5200', name: 'Bank Charges & Fees',                 type: 'Expense' },
  { code: '5210', name: 'Foreign Exchange Loss',               type: 'Expense' },
  { code: '5220', name: 'Depreciation Expense',                type: 'Expense' },
  { code: '5230', name: 'Desert Pass & Travel Permit Expense', type: 'Expense' },
  { code: '5240', name: 'Passport & Visa Processing Expense',  type: 'Expense' },
  { code: '5900', name: 'Other Expenses',                      type: 'Expense' }
];

var INDEX_HTML_FILE_NAME = 'Index';
var DP_RANGE_PREFIX = 'DP_';

function doGet(e) {
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

      case 'customListDefs':       return jsonOut({ ok: true, data: readBlob_('CustomListDefs') });
      case 'customListData':       return jsonOut({ ok: true, rows: readJsonRows_(customListSheetName_(e.parameter.listId)) });

      case 'loginHistory':         return jsonOut({ ok: true, rows: readLoginHistory_() });

      case 'chartOfAccounts':      return jsonOut({ ok: true, accounts: readChartOfAccounts_() });

      case 'payrollTypesList':     return jsonOut({ ok: true, rows: readJsonRows_('PayrollTypes') });
      case 'payrollEmployeesList': return jsonOut({ ok: true, rows: readJsonRows_('PayrollEmployees') });
      case 'payrollRunsList':      return jsonOut({ ok: true, rows: readJsonRows_('PayrollRuns') });

      case 'siteMoveSitesList':    return jsonOut({ ok: true, rows: readJsonRows_('SiteMoveSites') });
      case 'siteMoveLogList':      return jsonOut({ ok: true, rows: readJsonRows_('SiteMoveLog') });
      case 'siteMoveOpening':      return jsonOut({ ok: true, data: readBlob_('SiteMoveOpening') });

      case 'accommodation':        return jsonOut({ ok: true, data: readBlob_('Accommodation') });

      case 'library':              return jsonOut({ ok: true, data: readBlob_('Library') });

      case 'overtimeSettingsGet':   return jsonOut({ ok: true, settings: readBlob_('OvertimeSettings') });
      case 'overtimeEmpConfigGet':  return jsonOut({ ok: true, config: readBlob_('OvertimeEmpConfig') });
      case 'overtimeEntriesList':   return jsonOut({ ok: true, rows: readJsonRows_('OvertimeEntries') });

      case 'hrLeaveList':           return jsonOut({ ok: true, rows: readJsonRows_('HRLeave') });

      case 'outlookContactsList':   return jsonOut({ ok: true, rows: readJsonRows_('OutlookContacts') });
      case 'outlookDraftsList':     return jsonOut({ ok: true, rows: readJsonRows_('OutlookDrafts') });

      case 'diagAuth': {
        var key = PropertiesService.getScriptProperties().getProperty('OCR_SPACE_API_KEY');
        return jsonOut({
          ok: true,
          keyIsSet: !!key,
          keyPreview: key ? (key.substring(0, 4) + '...' + key.substring(key.length - 4)) : null,
          scriptId: ScriptApp.getScriptId()
        });
      }

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
      case 'issue':                 return jsonOut(issueVoucher(payload));
      case 'saveRange':             return jsonOut(saveRange(payload));
      case 'clearLog':              clearAllVouchers(); return jsonOut({ ok: true });
      case 'clearLoginHistory':     clearSheetRows_(LOGIN_HISTORY_SHEET_NAME); return jsonOut({ ok: true });
      case 'clearDesertPassLog':    clearSheetRows_('DesertPass'); return jsonOut({ ok: true });
      case 'saveStaff':             writeStaff(payload.staff || {}); return jsonOut({ ok: true });
      case 'updateVoucher':         return jsonOut(updateVoucher(payload));
      case 'deleteVoucher':         return jsonOut(deleteVoucher(payload));
      case 'saveTreasury':          writeTreasury(payload.data || {}); return jsonOut({ ok: true });
      case 'clearTreasury':         writeTreasury({}); return jsonOut({ ok: true });
      case 'uploadPdf':             return jsonOut(uploadPdf(payload));

      case 'saveAppSettings':       writeAppSettings(payload.data || {}); return jsonOut({ ok: true });

      case 'saveSites':             return jsonOut(saveSites(payload.sites || []));

      case 'saveChartOfAccounts':   return jsonOut(saveChartOfAccounts(payload.accounts || []));

      case 'payrollTypesSaveAll':     writeJsonRows_('PayrollTypes', payload.rows || []); return jsonOut({ ok: true });
      case 'payrollEmployeesSaveAll': writeJsonRows_('PayrollEmployees', payload.rows || []); return jsonOut({ ok: true });
      case 'payrollRunsSaveAll':      writeJsonRows_('PayrollRuns', payload.rows || []); return jsonOut({ ok: true });

      case 'siteMoveSitesSaveAll':    writeJsonRows_('SiteMoveSites', payload.rows || []); return jsonOut({ ok: true });
      case 'siteMoveLogSaveAll':      writeJsonRows_('SiteMoveLog', payload.rows || []); return jsonOut({ ok: true });
      case 'siteMoveOpeningSaveAll':  writeBlob_('SiteMoveOpening', payload.data || {}); return jsonOut({ ok: true });

      case 'accommodationSaveAll':    writeBlob_('Accommodation', payload.data || {}); return jsonOut({ ok: true });

      case 'saveLibrary':             writeBlob_('Library', payload.data || {}); return jsonOut({ ok: true });

      case 'overtimeSettingsSave':    writeBlob_('OvertimeSettings', payload.settings || {}); return jsonOut({ ok: true });
      case 'overtimeEmpConfigSave':   writeBlob_('OvertimeEmpConfig', payload.config || {}); return jsonOut({ ok: true });
      case 'overtimeEntriesSaveAll':  writeJsonRows_('OvertimeEntries', payload.rows || []); return jsonOut({ ok: true });

      case 'hrLeaveSaveAll':          writeJsonRows_('HRLeave', payload.rows || []); return jsonOut({ ok: true });

      case 'outlookContactsSaveAll':  writeJsonRows_('OutlookContacts', payload.rows || []); return jsonOut({ ok: true });
      case 'outlookDraftsSaveAll':    writeJsonRows_('OutlookDrafts', payload.rows || []); return jsonOut({ ok: true });

      case 'nextDpSerial':          return jsonOut(nextDesertPassSerial(payload));

      case 'saveFoodCost':          writeBlob_('FoodCost', payload.data || {}); return jsonOut({ ok: true });
      case 'saveFoodCostLog':       writeJsonRows_('FoodCostLog', payload.rows || []); return jsonOut({ ok: true });

      case 'scanReceipt':           return jsonOut(handleScanReceipt_(payload));

      case 'foodStockSaveAll':      writeFoodStock_(payload.rows || []); return jsonOut({ ok: true });
      case 'foodStockMoveSave':     appendFoodStockMove_(payload.move || {}); return jsonOut({ ok: true });
      case 'foodStockMoveDelete':   deleteFoodStockMove_(payload.site, payload.id); return jsonOut({ ok: true });
      case 'foodStockClearMoveLog': clearSheetRows_('FoodStockMoves'); return jsonOut({ ok: true });

      case 'stockSiteSaveAll':      writeStockSite_(payload.rows || []); return jsonOut({ ok: true });
      case 'stockSiteMoveSave':     appendStockSiteMove_(payload.category, payload.site, payload.move || {}); return jsonOut({ ok: true });
      case 'stockSiteMoveDelete':   deleteStockSiteMove_(payload.category, payload.site, payload.id); return jsonOut({ ok: true });
      case 'stockSiteClearMoveLog': clearStockSiteMovesForCategory_(payload.category); return jsonOut({ ok: true });

      case 'passportSaveAll':       writeJsonRows_('Passports', payload.rows || []); return jsonOut({ ok: true });

      case 'dpSave':                appendJsonRow_('DesertPass', payload.pass || {}); return jsonOut({ ok: true });

      case 'residenceSaveAll':      writeJsonRows_('Residence', payload.rows || []); return jsonOut({ ok: true });

      case 'dpManualSaveAll':       writeJsonRows_('DpManual', payload.rows || []); return jsonOut({ ok: true });
      case 'dpManualMovesSaveAll':  writeJsonRows_('DpManualMoves', payload.rows || []); return jsonOut({ ok: true });

      case 'opsMgmtSaveRoster':     writeBlob_('OpsRoster', payload.data || {}); return jsonOut({ ok: true });
      case 'opsMgmtSaveDaily':      writeBlob_('OpsDaily', payload.data || {}); return jsonOut({ ok: true });

      case 'saveCustomListDefs':    writeBlob_('CustomListDefs', payload.data || {}); return jsonOut({ ok: true });
      case 'customListDataSaveAll': writeJsonRows_(customListSheetName_(payload.listId), payload.rows || []); return jsonOut({ ok: true });
      case 'customListDeleteAll':   clearSheetRows_(customListSheetName_(payload.listId)); return jsonOut({ ok: true });

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

function nowIsoLocal_() {
  return Utilities.formatDate(new Date(), 'Africa/Tripoli', "yyyy-MM-dd'T'HH:mm:ss");
}

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

// Temporarily unfreezes rows (if any) before deleting data rows, then restores
// the freeze afterward. Google Sheets refuses deleteRows() when the result
// would leave only frozen rows behind, which was throwing:
// "Sorry, it is not possible to delete all non-frozen rows." This wraps every
// row-clearing call site so that error can no longer occur.
function clearSheetRows_(name) {
  var sh = ss_().getSheetByName(name);
  if (!sh) return;
  var lastRow = sh.getLastRow();
  if (lastRow <= 1) return;
  var frozen = sh.getFrozenRows();
  if (frozen > 0) sh.setFrozenRows(0);
  sh.deleteRows(2, lastRow - 1);
  if (frozen > 0) sh.setFrozenRows(frozen);
}

// Blob pattern (one JSON object per sheet). Chunked across as many rows as
// needed so a single value never exceeds a Sheets cell's ~50,000 character
// limit — safe for anything from a small settings object up to a Library
// full of imported Word/Excel/PDF files. Old sheets written before chunking
// (a single row) still read back correctly, since concatenating one row is
// the same as reading it directly.
var BLOB_CHUNK_SIZE_ = 45000;
function readBlob_(sheetName) {
  var sh = getOrCreateSheet_(sheetName, ['Data']);
  var lastRow = sh.getLastRow();
  if (lastRow < 2) return {};
  var values = sh.getRange(2, 1, lastRow - 1, 1).getValues();
  var json = values.map(function (row) { return row[0] || ''; }).join('');
  if (!json) return {};
  try { return JSON.parse(json); } catch (e) { return {}; }
}
function writeBlob_(sheetName, dataObj) {
  var sh = getOrCreateSheet_(sheetName, ['Data']);
  var json = JSON.stringify(dataObj);
  var chunks = [];
  for (var i = 0; i < json.length; i += BLOB_CHUNK_SIZE_) chunks.push(json.slice(i, i + BLOB_CHUNK_SIZE_));
  if (!chunks.length) chunks = [''];
  var lastRow = sh.getLastRow();
  if (lastRow > 1) {
    var frozen = sh.getFrozenRows();
    if (frozen > 0) sh.setFrozenRows(0);
    sh.deleteRows(2, lastRow - 1);
    if (frozen > 0) sh.setFrozenRows(frozen);
  }
  var rows = chunks.map(function (c) { return [c]; });
  sh.getRange(2, 1, rows.length, 1).setValues(rows);
}

function readJsonRows_(sheetName) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return [];
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    try { out.push(JSON.parse(data[r][0])); } catch (e) { }
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
function rowToVoucher_(row, siteSheetName) {
  var lines = [];
  try { lines = JSON.parse(row[6] || '[]'); } catch (e) { lines = []; }
  return {
    serial: row[0], date: cellAsFormattedString_(row[1], 'yyyy-MM-dd'), type: row[2], object: row[3], cheque: row[4], payto: row[5],
    lines: lines, total: Number(row[7]) || 0, words: row[8], issuedAt: row[9], issuedBy: row[10],
    issuedBySite: row[11] || siteSheetName, issuedByJobNumber: row[12],
    currency: row[13] || 'LYD',
    lydEquivalent: (row[14] !== undefined && row[14] !== '') ? Number(row[14]) : null,
    voucherRateUsed: (row[15] !== undefined && row[15] !== '') ? Number(row[15]) : null,
    voucherRateType: row[16] || null,
    account: row[17] || '',
    contraAccount: row[18] || ''
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
      JSON.stringify(payload.lines || []), payload.total, payload.words, nowIsoLocal_(),
      payload.issuedBy || '', site, payload.issuedByJobNumber || '',
      payload.currency || 'LYD',
      (payload.lydEquivalent !== undefined && payload.lydEquivalent !== null) ? payload.lydEquivalent : '',
      (payload.voucherRateUsed !== undefined && payload.voucherRateUsed !== null) ? payload.voucherRateUsed : '',
      payload.voucherRateType || '',
      payload.account || '',
      payload.contraAccount || ''
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
    existing[13], existing[14], existing[15], existing[16],
    payload.account !== undefined ? payload.account : existing[17],
    payload.contraAccount !== undefined ? payload.contraAccount : existing[18]
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

function nextDesertPassSerial(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var d = String(payload.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
    var mKey = d.slice(0, 7);
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

function readTreasury() { return readBlob_(TREASURY_SHEET_NAME); }
function writeTreasury(dataObj) { writeBlob_(TREASURY_SHEET_NAME, dataObj); }

function readAppSettings() { return readBlob_(APP_SETTINGS_SHEET_NAME); }
function writeAppSettings(dataObj) { writeBlob_(APP_SETTINGS_SHEET_NAME, dataObj); }

function cellAsFormattedString_(v, pattern) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Africa/Tripoli', pattern);
  return String(v || '');
}

// 'Type' (login/logout) was added after this sheet had already been used in
// production. Older sheets were created with just the first 7 headers, so
// this migrates any sheet that's missing the 'Type' header — same pattern
// as ensureStaffRoleColumn_ above for the Staff sheet's Role column.
function ensureLoginHistoryTypeColumn_(sh) {
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers[LOGIN_HISTORY_HEADERS.length - 1] !== 'Type') {
    sh.getRange(1, LOGIN_HISTORY_HEADERS.length).setValue('Type');
  }
}

function readLoginHistory_() {
  var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
  ensureLoginHistoryTypeColumn_(sh);
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      name: String(data[r][0] || ''),
      role: String(data[r][1] || 'user'),
      site: String(data[r][2] || ''),
      jobNumber: String(data[r][3] || ''),
      date: cellAsFormattedString_(data[r][4], 'yyyy-MM-dd'),
      time: cellAsFormattedString_(data[r][5], 'HH:mm:ss'),
      timestamp: String(data[r][6] || ''),
      // Rows recorded before this column existed have nothing here and are
      // treated as 'login' for backward compatibility (they can't have been
      // anything else, since 'logout' events didn't get recorded at all yet).
      type: (String(data[r][7] || '').toLowerCase() === 'logout') ? 'logout' : 'login'
    });
  }
  return out;
}

function readChartOfAccounts_() {
  var sh = ss_().getSheetByName(CHART_OF_ACCOUNTS_SHEET_NAME);
  if (!sh) {
    sh = ss_().insertSheet(CHART_OF_ACCOUNTS_SHEET_NAME);
    sh.appendRow(CHART_OF_ACCOUNTS_HEADERS);
    sh.setFrozenRows(1);
    var seedRows = CHART_OF_ACCOUNTS_SEED.map(function (a) {
      return [a.code, a.name, a.type, true];
    });
    sh.getRange(2, 1, seedRows.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(seedRows);
  } else {
    var existingData = sh.getDataRange().getValues();
    var existingCodes = {};
    for (var er = 1; er < existingData.length; er++) {
      if (existingData[er][0]) existingCodes[String(existingData[er][0])] = true;
    }
    var missingRows = CHART_OF_ACCOUNTS_SEED
      .filter(function (a) { return !existingCodes[a.code]; })
      .map(function (a) { return [a.code, a.name, a.type, true]; });
    if (missingRows.length) {
      sh.getRange(sh.getLastRow() + 1, 1, missingRows.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(missingRows);
    }
  }
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    out.push({
      code: String(data[r][0]),
      name: String(data[r][1] || ''),
      type: String(data[r][2] || 'Expense'),
      active: data[r][3] === true || String(data[r][3]).toUpperCase() === 'TRUE' || data[r][3] === ''
    });
  }
  return out;
}
function saveChartOfAccounts(accountsPayload) {
  if (!Array.isArray(accountsPayload) || !accountsPayload.length) {
    return { ok: false, error: 'At least one account is required.' };
  }
  var validTypes = { Asset: 1, Liability: 1, Equity: 1, Revenue: 1, Expense: 1 };
  var seenCodes = {};
  var rowsOut = [];
  for (var i = 0; i < accountsPayload.length; i++) {
    var a = accountsPayload[i] || {};
    var code = String(a.code || '').trim();
    var name = String(a.name || '').trim();
    var type = String(a.type || '').trim();
    if (!code || !name) return { ok: false, error: 'Every account needs a code and a name.' };
    if (!validTypes[type]) return { ok: false, error: 'Account "' + name + '": type must be Asset, Liability, Equity, Revenue or Expense.' };
    if (seenCodes[code]) return { ok: false, error: 'Account code "' + code + '" is used more than once — codes must be unique.' };
    seenCodes[code] = true;
    rowsOut.push([code, name, type, a.active !== false]);
  }
  var sh = getOrCreateSheet_(CHART_OF_ACCOUNTS_SHEET_NAME, CHART_OF_ACCOUNTS_HEADERS);
  var lastRow = sh.getLastRow();
  if (lastRow > 1) sh.deleteRows(2, lastRow - 1);
  sh.getRange(2, 1, rowsOut.length, CHART_OF_ACCOUNTS_HEADERS.length).setValues(rowsOut);
  return { ok: true, accounts: readChartOfAccounts_() };
}
function logLogin_(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sh = getOrCreateSheet_(LOGIN_HISTORY_SHEET_NAME, LOGIN_HISTORY_HEADERS);
    ensureLoginHistoryTypeColumn_(sh);
    sh.appendRow([
      payload.name || '',
      payload.role || 'user',
      payload.site || '',
      payload.jobNumber || '',
      payload.date || '',
      payload.time || '',
      payload.timestamp || nowIsoLocal_(),
      payload.type === 'logout' ? 'logout' : 'login'
    ]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function handleScanReceipt_(payload) {
  var props = PropertiesService.getScriptProperties();
  var apiKey = props.getProperty('OCR_SPACE_API_KEY');
  if (!apiKey) {
    return { ok: false, error: 'OCR.space API key not set on the server. In the Apps Script editor: Project Settings > Script Properties > Add property, name OCR_SPACE_API_KEY, value = your OCR.space API key (get a free one at ocr.space/ocrapi).' };
  }
  if (!payload || !payload.imageBase64) {
    return { ok: false, error: 'No image data received.' };
  }
  var mimeType = payload.mimeType || 'image/jpeg';
  var engine = props.getProperty('OCR_SPACE_ENGINE') || '3';
  var language = props.getProperty('OCR_SPACE_LANGUAGE') || 'auto';
  var dataUri = 'data:' + mimeType + ';base64,' + payload.imageBase64;

  var resp;
  try {
    resp = UrlFetchApp.fetch('https://api.ocr.space/parse/image', {
      method: 'post',
      muteHttpExceptions: true,
      payload: {
        apikey: apiKey,
        base64Image: dataUri,
        language: language,
        OCREngine: engine,
        scale: 'true',
        detectOrientation: 'true',
        isOverlayRequired: 'false'
      }
    });
  } catch (err) {
    return { ok: false, error: 'Could not reach OCR.space: ' + err.message };
  }

  var json;
  try {
    json = JSON.parse(resp.getContentText());
  } catch (e) {
    return { ok: false, error: 'OCR.space returned an unreadable response (HTTP ' + resp.getResponseCode() + ').' };
  }

  if (json.IsErroredOnProcessing) {
    var msg = json.ErrorMessage
      ? (Array.isArray(json.ErrorMessage) ? json.ErrorMessage.join(' ') : json.ErrorMessage)
      : (json.ErrorDetails || 'Unknown OCR.space error.');
    return { ok: false, error: 'OCR.space error: ' + msg };
  }

  var results = json.ParsedResults;
  var text = (results && results[0] && results[0].ParsedText) || '';
  return { ok: true, text: text };
}

// Run this ONCE, manually, from the Apps Script editor (pick it from the function dropdown, click
// Run) to immediately wipe the Treasury sheet back to empty — use this to clear stray balances left
// behind after clearing vouchers, since clearLog only empties the voucher sheets, not Treasury.
// The app's 'clearTreasury' doPost action (added above) does the same thing going forward.
function resetTreasuryNow() {
  writeTreasury({});
  Logger.log('Treasury reset to empty.');
}

function authorizeScript() {
  try { UrlFetchApp.fetch('https://www.google.com', { muteHttpExceptions: true }); } catch (e) { }
  try { DriveApp.getRootFolder(); } catch (e) { }
  try { ss_(); } catch (e) { }
  try { PropertiesService.getScriptProperties().getProperty('OCR_SPACE_API_KEY'); } catch (e) { }
  Logger.log('Authorization check complete. If no prompt appeared, all permissions are already granted.');
}

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

/* ============ Annual archive (runs once a year, cuts off at 31/12 of the prior year, backs up to Drive) ============

   SETUP: run installAnnualArchiveTrigger() ONCE, manually, from this Apps Script editor (pick it from
   the function dropdown at the top, then click Run) to install the schedule. A deployed web app can't
   install its own time-driven trigger — it has to come from a real, authorized run by someone with edit
   access to this script. Safe to run more than once; it clears any existing trigger for this job first.

   HOW "ONCE A YEAR" WORKS: Apps Script doesn't have a native "yearly" trigger type, only time-based
   triggers up to monthly. So the installed trigger actually fires on the 1st of every month — but
   runAnnualArchive_() immediately checks the calendar month and does nothing at all unless it's
   ARCHIVE_MONTH (default January). That gives you a reliable once-a-year run without relying on a
   trigger that could silently drift or fail to fire on a specific date.

   WHAT IT DOES: once a year, for every log listed in ARCHIVE_TARGETS below, every row/record dated
   before 1 January of the year the job is running in (i.e. through 31 December of the previous year,
   inclusive) is moved out of the live sheet into a brand-new file — one tab per log, only created if
   that log actually had something old enough — which is then converted to a real .xlsx and saved into
   a Drive folder named BACKUP_FOLDER_NAME. Install Google Drive for Desktop and sync just that one
   folder, and every year's backup will appear automatically in a local folder on your PC with zero
   manual action needed.

   TREASURY / OPENING BALANCES: Treasury is now included. For every site + box type, movements dated
   before the cutoff are archived out, and the last known balance among those archived movements is
   written back as a single "opening balance" entry at the very start of the box's movement list for
   the new year — so cash-box running totals continue correctly instead of resetting to zero.

   *** IMPORTANT — VERIFY BEFORE RELYING ON THIS ***
   This file never showed me the real shape of your Treasury blob, so TREASURY_DATE_FIELD and
   TREASURY_BALANCE_FIELD below are a best guess (assumes Treasury = { siteName: { boxType: [ {date,
   balance, ...}, ... ] } }). If your actual field names differ, or Treasury movements don't carry a
   running "balance" field at all, archiveTreasury_() below will detect that a site/box doesn't look
   like an array of dated objects and will SKIP archiving that box's movements (logging why) rather
   than guess and risk corrupting a live cash-box figure. Run runAnnualArchive_() once from the editor
   after setting this up, then check the Logger output (View > Logs) and confirm the numbers in
   Treasury match what you expect before trusting it unattended.

   SAFETY: a row whose date can't be parsed is always kept, never archived — the failure mode here is
   "this row gets archived a bit later than ideal," never "lost data because a date didn't parse."

   SCOPE NOTE — COPY-ONLY TARGETS: Passports, Residence, the Desert Pass Manual roster, and Custom
   Lists are current-state rosters, not transaction logs — "over a year since this row was entered"
   does not mean "safe to delete," since the document/record itself might still be valid, and Custom
   Lists have no single reliable date field to filter on safely across every user-defined list anyway.
   So these are handled differently from everything in ARCHIVE_TARGETS above: every row currently in
   each of them is COPIED into the yearly archive workbook as a full snapshot, but NOTHING is removed
   from the live sheet — see ARCHIVE_COPY_TARGETS and the copy loop in runAnnualArchive_ below.
   Vouchers ARE moved (archived + removed from the live sheet) below since that's what was asked for —
   but they are core accounting/financial records and many places have legal minimum retention
   requirements beyond one year. If you'd rather keep vouchers on the live sheet indefinitely, delete
   that one line from ARCHIVE_TARGETS below. */

var ARCHIVE_MONTH = 1; // calendar month (1 = January) the annual job is allowed to actually run in
var BACKUP_FOLDER_NAME = 'AOS ERP Annual Archives';

// Best-guess field names inside each Treasury movement object — see the big comment block above.
// Edit these two lines if your real Treasury JSON uses different field names.
var TREASURY_DATE_FIELD = 'date';
var TREASURY_BALANCE_FIELD = 'balance';

var ARCHIVE_TARGETS = [
  { kind: 'columns', label: 'Vouchers',               sheetNames: function () { return allSiteSheetNames_(); },       dateColIndex: 1 },
  { kind: 'columns', label: 'Login History',          sheetNames: function () { return [LOGIN_HISTORY_SHEET_NAME]; }, dateColIndex: 4 },
  { kind: 'columns', label: 'Food Stock Moves',       sheetNames: function () { return ['FoodStockMoves']; },         dateColIndex: 2 },
  { kind: 'columns', label: 'Stock Site Moves',       sheetNames: function () { return ['StockSiteMoves']; },         dateColIndex: 3 },
  { kind: 'json',    label: 'Food Cost Log',          sheetNames: function () { return ['FoodCostLog']; },           dateField: 'date' },
  { kind: 'json',    label: 'Desert Pass (auto log)', sheetNames: function () { return ['DesertPass']; },            dateField: 'issuedDate' },
  { kind: 'json',    label: 'Desert Pass Manual Moves', sheetNames: function () { return ['DpManualMoves']; },       dateField: 'date' },
  { kind: 'json',    label: 'Site Daily Movement Log', sheetNames: function () { return ['SiteMoveLog']; },          dateField: 'date' },
  { kind: 'json',    label: 'Overtime Entries',        sheetNames: function () { return ['OvertimeEntries']; },      dateField: 'date' },
  { kind: 'json',    label: 'HR Leave',                sheetNames: function () { return ['HRLeave']; },              dateField: 'from' },
  { kind: 'json',    label: 'Outlook Drafts',          sheetNames: function () { return ['OutlookDrafts']; },        dateField: 'savedAt' }
];

// Copy-only targets (see the SCOPE NOTE above): full snapshot copied into the yearly archive
// workbook every run, live sheet left completely untouched — no filtering, no deletion.
var ARCHIVE_COPY_TARGETS = [
  { label: 'Passports',                  sheetNames: function () { return ['Passports']; } },
  { label: 'Residence',                  sheetNames: function () { return ['Residence']; } },
  { label: 'Desert Pass Manual (roster)', sheetNames: function () { return ['DpManual']; } },
  { label: 'Custom List',                sheetNames: function () { return allCustomListSheetNames_(); } }
];

// Every custom-list data sheet is named 'CL_<slug>' by customListSheetName_() — this just finds
// all of them currently in the spreadsheet so ARCHIVE_COPY_TARGETS doesn't need a fixed list.
function allCustomListSheetNames_() {
  return ss_().getSheets()
    .map(function (s) { return s.getName(); })
    .filter(function (name) { return name.indexOf('CL_') === 0; });
}

function parseCellDate_(v) {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (v === null || v === undefined || v === '') return null;
  var d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
}

// Returns 1 January, 00:00, of the given year (Africa/Tripoli) — everything strictly before this
// counts as "last year or earlier" and is eligible for archiving.
function yearStartCutoff_(year) {
  return new Date(year, 0, 1, 0, 0, 0);
}

// Archives one fixed-column sheet: splits rows by cutoff, rewrites the live sheet with only the
// kept rows, and returns { headers, archivedRows } for the backup file (archivedRows is empty if
// nothing on this sheet was old enough).
function archiveColumnsSheet_(sheetName, dateColIndex, cutoff) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return { headers: [], archivedRows: [] };
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return { headers: data[0] || [], archivedRows: [] };
  var headers = data[0];
  var keep = [headers];
  var archived = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (!row[0]) continue; // skip blank rows
    var d = parseCellDate_(row[dateColIndex]);
    if (d && d < cutoff) archived.push(row);
    else keep.push(row);
  }
  if (archived.length) {
    sh.clearContents();
    sh.getRange(1, 1, keep.length, headers.length).setValues(keep);
    sh.setFrozenRows(1);
  }
  return { headers: headers, archivedRows: archived };
}

// Archives one JSON-blob sheet (the readJsonRows_/writeJsonRows_ pattern most logs use): parses
// each row's JSON, checks dateField, rewrites the live sheet with only the kept rows, and returns
// the archived objects (parsed, not raw JSON strings) for the backup file.
function archiveJsonSheet_(sheetName, dateField, cutoff) {
  var sh = ss_().getSheetByName(sheetName);
  if (!sh) return { archivedRows: [] };
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return { archivedRows: [] };
  var keepObjs = [];
  var archivedObjs = [];
  for (var r = 1; r < data.length; r++) {
    if (!data[r][0]) continue;
    var obj;
    try { obj = JSON.parse(data[r][0]); } catch (e) { continue; } // unparseable row — same as readJsonRows_ already drops these
    var d = parseCellDate_(obj[dateField]);
    if (d && d < cutoff) archivedObjs.push(obj);
    else keepObjs.push(obj);
  }
  if (archivedObjs.length) writeJsonRows_(sheetName, keepObjs);
  return { archivedRows: archivedObjs };
}

// Archives the Treasury blob. Expected shape: { siteName: { boxType: [ {date, balance, ...}, ... ] } }
// (see TREASURY_DATE_FIELD / TREASURY_BALANCE_FIELD and the big comment block above). For every
// site + box type that DOES look like an array of dated objects, movements before the cutoff are
// removed and replaced with a single synthetic opening-balance entry carrying the last known balance
// forward. Anything that doesn't match the expected shape is left completely untouched and logged,
// so an unexpected schema can never silently corrupt a live balance.
function archiveTreasury_(cutoff) {
  var treasury = readTreasury();
  var archivedByPath = {}; // 'Site / boxType' -> archived movement objects, for the backup workbook
  var skipped = [];
  var changed = false;
  var newTreasury = {};

  Object.keys(treasury || {}).forEach(function (siteKey) {
    var siteVal = treasury[siteKey];
    if (!siteVal || typeof siteVal !== 'object' || Array.isArray(siteVal)) {
      newTreasury[siteKey] = siteVal;
      skipped.push(siteKey + ' (not a {boxType: [...]} object — left untouched)');
      return;
    }
    newTreasury[siteKey] = {};
    Object.keys(siteVal).forEach(function (boxKey) {
      var moves = siteVal[boxKey];
      if (!Array.isArray(moves)) {
        newTreasury[siteKey][boxKey] = moves;
        skipped.push(siteKey + ' / ' + boxKey + ' (not an array of movements — left untouched)');
        return;
      }

      var withIdx = moves.map(function (m, i) { return { m: m, i: i }; });
      withIdx.sort(function (a, b) {
        var da = parseCellDate_(a.m && a.m[TREASURY_DATE_FIELD]);
        var db = parseCellDate_(b.m && b.m[TREASURY_DATE_FIELD]);
        if (!da && !db) return a.i - b.i;
        if (!da) return -1;
        if (!db) return 1;
        return da - db;
      });

      var kept = [];
      var archived = [];
      var lastOldBalance = null;
      withIdx.forEach(function (entry) {
        var d = parseCellDate_(entry.m && entry.m[TREASURY_DATE_FIELD]);
        if (d && d < cutoff) {
          archived.push(entry.m);
          if (entry.m && entry.m[TREASURY_BALANCE_FIELD] !== undefined && entry.m[TREASURY_BALANCE_FIELD] !== null) {
            lastOldBalance = entry.m[TREASURY_BALANCE_FIELD];
          }
        } else {
          kept.push(entry.m);
        }
      });

      if (archived.length) {
        changed = true;
        archivedByPath[siteKey + ' / ' + boxKey] = archived;
        if (lastOldBalance !== null) {
          var opening = {};
          opening[TREASURY_DATE_FIELD] = Utilities.formatDate(cutoff, 'Africa/Tripoli', 'yyyy-MM-dd');
          opening[TREASURY_BALANCE_FIELD] = lastOldBalance;
          opening.isOpeningBalance = true;
          opening.notes = 'Opening balance carried forward from ' + (cutoff.getFullYear() - 1) + ' year-end archive';
          kept.unshift(opening);
        } else {
          skipped.push(siteKey + ' / ' + boxKey + ' (archived ' + archived.length + ' old movement(s) but none had a "' + TREASURY_BALANCE_FIELD + '" field to carry forward — opening balance NOT set, please check manually)');
        }
      }
      newTreasury[siteKey][boxKey] = kept;
    });
  });

  if (changed) writeTreasury(newTreasury);
  if (skipped.length) Logger.log('Treasury archive notes:\n' + skipped.join('\n'));
  return { archivedByPath: archivedByPath, changed: changed };
}

function getOrCreateBackupFolder_() {
  var folders = DriveApp.getFoldersByName(BACKUP_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(BACKUP_FOLDER_NAME);
}

// Converts a Google Sheet (by id) to a real .xlsx Blob via the standard export-URL + OAuth-token
// technique (the same one Google itself documents for Apps Script — no external library needed).
function exportSpreadsheetAsXlsxBlob_(spreadsheetId, filename) {
  var url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=xlsx';
  var token = ScriptApp.getOAuthToken();
  var resp = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + token } });
  return resp.getBlob().setName(filename);
}

// Reads every row currently in a JSON-rows sheet (Passports/Residence/DpManual/CL_*) and returns
// it as-is. Read-only — never touches the live sheet. Used for the copy-only targets, where we want
// a full snapshot backed up every year but nothing ever removed from the live roster.
function copySheetSnapshot_(sheetName) {
  return readJsonRows_(sheetName);
}

// The annual job itself. Only actually archives anything when run during ARCHIVE_MONTH (default
// January) — see the big comment block above for why. Safe to run any time from the editor to test;
// outside ARCHIVE_MONTH it just logs and exits without touching any data.
function runAnnualArchive_() {
  var now = new Date();
  if (now.getMonth() + 1 !== ARCHIVE_MONTH) {
    Logger.log('Annual archive: skipped — this job only runs in month ' + ARCHIVE_MONTH + ' (current month is ' + (now.getMonth() + 1) + ').');
    return;
  }

  var cutoff = yearStartCutoff_(now.getFullYear()); // 1 Jan of the current year = everything through 31 Dec last year
  var archiveSs = SpreadsheetApp.create('AOS Archive ' + (now.getFullYear() - 1) + ' (through 31-12-' + (now.getFullYear() - 1) + ')');
  var anyArchived = false;

  ARCHIVE_TARGETS.forEach(function (target) {
    target.sheetNames().forEach(function (sheetName) {
      if (target.kind === 'columns') {
        var result = archiveColumnsSheet_(sheetName, target.dateColIndex, cutoff);
        if (result.archivedRows.length) {
          anyArchived = true;
          var tab = archiveSs.insertSheet((target.label + ' - ' + sheetName).slice(0, 90));
          var rows = [result.headers].concat(result.archivedRows);
          tab.getRange(1, 1, rows.length, result.headers.length).setValues(rows);
          tab.setFrozenRows(1);
        }
      } else {
        var jsonResult = archiveJsonSheet_(sheetName, target.dateField, cutoff);
        if (jsonResult.archivedRows.length) {
          anyArchived = true;
          var tab2 = archiveSs.insertSheet(target.label.slice(0, 90));
          tab2.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
          var out = jsonResult.archivedRows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
          if (out.length) tab2.getRange(2, 1, out.length, 2).setValues(out);
          tab2.setFrozenRows(1);
        }
      }
    });
  });

  // Treasury (special-cased — see archiveTreasury_ above)
  var treasuryResult = archiveTreasury_(cutoff);
  Object.keys(treasuryResult.archivedByPath).forEach(function (path) {
    anyArchived = true;
    var rows = treasuryResult.archivedByPath[path];
    var tab3 = archiveSs.insertSheet(('Treasury - ' + path).slice(0, 90));
    tab3.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
    var out3 = rows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
    if (out3.length) tab3.getRange(2, 1, out3.length, 2).setValues(out3);
    tab3.setFrozenRows(1);
  });

  // Copy-only targets: Passports, Residence, Desert Pass Manual roster, Custom Lists — full
  // snapshot into the archive workbook every run, live sheet left completely untouched.
  ARCHIVE_COPY_TARGETS.forEach(function (target) {
    target.sheetNames().forEach(function (sheetName) {
      var rows = copySheetSnapshot_(sheetName);
      if (rows.length) {
        anyArchived = true;
        var tabName = (target.label === 'Custom List') ? ('Copy - ' + sheetName) : ('Copy - ' + target.label);
        var tab4 = archiveSs.insertSheet(tabName.slice(0, 90));
        tab4.getRange(1, 1, 1, 2).setValues([['Record (JSON)', 'Preview']]);
        var out4 = rows.map(function (o) { return [JSON.stringify(o), previewOf_(o)]; });
        tab4.getRange(2, 1, out4.length, 2).setValues(out4);
        tab4.setFrozenRows(1);
      }
    });
  });

  if (!anyArchived) {
    DriveApp.getFileById(archiveSs.getId()).setTrashed(true);
    Logger.log('Annual archive: nothing dated before 1 Jan ' + now.getFullYear() + ' was found — nothing to archive this run.');
    return;
  }
  var defaultSheet = archiveSs.getSheetByName('Sheet1');
  if (defaultSheet && archiveSs.getSheets().length > 1) archiveSs.deleteSheet(defaultSheet);

  var folder = getOrCreateBackupFolder_();
  var filename = 'AOS_Archive_' + (now.getFullYear() - 1) + '.xlsx';
  var blob = exportSpreadsheetAsXlsxBlob_(archiveSs.getId(), filename);
  folder.createFile(blob);
  DriveApp.getFileById(archiveSs.getId()).setTrashed(true); // only the .xlsx copy is kept in Drive, not the intermediate Google Sheet

  Logger.log('Annual archive complete: ' + filename + ' saved to Drive folder "' + BACKUP_FOLDER_NAME + '".');
}

// Run this ONCE, manually, from the Apps Script editor to install the annual schedule (see the big
// comment block above for full instructions). Safe to re-run any time — it always clears out any
// existing trigger for this job first.
function installAnnualArchiveTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runAnnualArchive_') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runAnnualArchive_')
    .timeBased()
    .onMonthDay(1)
    .atHour(2)
    .create();
  Logger.log('Annual archive trigger installed — checks on the 1st of every month around 2am Africa/Tripoli time, and actually archives only in month ' + ARCHIVE_MONTH + ' (so effectively once a year).');
}
